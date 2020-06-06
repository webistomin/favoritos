import 'core-js/fn/object/assign';
import { IFavoritosOption } from './types/options/options';
import { SSR_MESSAGE } from './helpers/ssr-message';
import { DEFAULT_OPTIONS } from './helpers/default-options';
import { fireEvent } from './helpers/fire-event';
import { mediaDarkTheme } from './helpers/media-dark-theme';
import { getContextGradientEntries } from './helpers/get-context-gradient-entries';
import { mergeDeep } from './helpers/merge-deep';
import { loadImage } from './helpers/load-image';
import { roundedRect } from './helpers/rounded-rect';
import { IFavoritosShape } from './types/options/shapes';

export default class Favoritos {
  private options: IFavoritosOption;
  private iconElement: HTMLLinkElement;
  private userIconHref: string;
  private userIconCache: HTMLImageElement | null = null;

  private iconCanvasWidth: number;
  private iconCanvasHeight: number;
  private iconCanvas: HTMLCanvasElement;
  private iconCanvasContext: CanvasRenderingContext2D;

  private badgeCounter = 0;
  private badgeCanvasWidth: number;
  private badgeCanvasHeight: number;

  constructor(options: IFavoritosOption) {
    if (typeof window === 'undefined') {
      console.warn(SSR_MESSAGE);
    } else {
      const isDarkTheme = this.isPrefersColorSchemeDark();
      const tempOptions = DEFAULT_OPTIONS;

      if (isDarkTheme) {
        tempOptions.badge.color = '#121212';
        tempOptions.badge.backgroundColor = '#ffffff';
        tempOptions.icon.backgroundColor = '#ffffff';
      }

      this.options = mergeDeep(tempOptions, options) as IFavoritosOption;
      this.init();
    }
  }

  private static detectVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
      fireEvent('favoritos:visibilitychange', 'visible');
    } else {
      fireEvent('favoritos:visibilitychange', 'hidden');
    }
  }

  private static detectThemeChange(event: MediaQueryListEvent): void {
    console.log(event);
    const newColorScheme = event.matches ? 'dark' : 'light';
    fireEvent('favoritos:themechange', newColorScheme);
  }

  private static initListeners(): void {
    document.addEventListener('visibilitychange', Favoritos.detectVisibilityChange);
    try {
      mediaDarkTheme.addEventListener('change', Favoritos.detectThemeChange);
    } catch (error) {
      mediaDarkTheme.addListener(Favoritos.detectThemeChange);
    }
  }

  private initIconCanvas(): void {
    const options = this.options;
    const iconOptions = options.icon;
    const badgeOptions = options.badge;

    const badgeWidth = badgeOptions.width;
    const badgeHeight = badgeOptions.height;

    const iconWidth = iconOptions.width;
    const iconHeight = iconOptions.height;

    this.badgeCanvasWidth = badgeWidth;
    this.badgeCanvasHeight = badgeHeight;

    this.iconCanvas = document.createElement('canvas');
    this.iconCanvasWidth = iconWidth;
    this.iconCanvasHeight = iconHeight;
    this.iconCanvas.width = iconWidth;
    this.iconCanvas.height = iconHeight;
    this.iconCanvasContext = this.iconCanvas.getContext('2d');
    this.iconCanvasContext.font = `${badgeOptions.fontSize}px ${badgeOptions.fontFamily}`;
    this.iconCanvasContext.textAlign = 'center';
    this.iconCanvasContext.textBaseline = 'middle';
  }

  private getContextBackgroundColor(
    backgroundColor: IFavoritosOption['icon']['backgroundColor'] | IFavoritosOption['badge']['backgroundColor'],
    width: number,
    height: number
  ): string | CanvasGradient {
    const context = this.iconCanvasContext;
    let resultBackground;

    if (Array.isArray(backgroundColor)) {
      const gradient = context.createLinearGradient(0, 0, width, height);
      const backgroundEntries = getContextGradientEntries(backgroundColor);
      backgroundEntries.map((entry) => {
        gradient.addColorStop(entry[0], entry[1]);
      });
      resultBackground = gradient;
    } else {
      resultBackground = backgroundColor;
    }

    return resultBackground;
  }

  private init(): void {
    const options = this.options;
    const iconOptions = options.icon;

    this.iconElement = document.querySelector(iconOptions.iconSelector);
    this.userIconHref = this.iconElement.href;

    loadImage(this.userIconHref).then((img) => {
      this.userIconCache = img;
    });

    this.initIconCanvas();
    Favoritos.initListeners();
  }

  public destroy(): void {
    document.removeEventListener('visibilitychange', Favoritos.detectVisibilityChange.bind(Favoritos));
    mediaDarkTheme.removeEventListener('change', Favoritos.detectThemeChange.bind(Favoritos));
    document.removeEventListener('scroll', this.setScrollingProgressBar.bind(this));
  }

  public setOptions(options: IFavoritosOption): void {
    this.options = mergeDeep(this.options, options) as IFavoritosOption;
  }

  public setIcon(newIcon: string): void {
    this.iconElement.href = newIcon;
  }

  public isPrefersColorSchemeDark(): boolean {
    return mediaDarkTheme.matches;
  }

  public reset(): void {
    this.options = DEFAULT_OPTIONS;
    this.setIcon(this.userIconHref);
  }

  public drawBadge(count?: number): void {
    const setBadge = (img: HTMLImageElement): void => {
      let newValue = this.badgeCounter;
      const iconOptions = this.options.icon;
      const badgeOptions = this.options.badge;

      if (count) {
        newValue = count;
        this.badgeCounter = count;
      }

      const additionalWidth = newValue >= 100 ? 10 : newValue >= 10 ? 7 : 0;
      this.iconCanvasContext.clearRect(0, 0, iconOptions.width, iconOptions.height);
      this.iconCanvasContext.drawImage(img, 0, 0, iconOptions.width, iconOptions.height);
      this.iconCanvasContext.fillStyle = this.getContextBackgroundColor(
        badgeOptions.backgroundColor,
        this.iconCanvasWidth,
        this.iconCanvasHeight
      );
      this.iconCanvasContext.beginPath();

      if (badgeOptions.shape === IFavoritosShape.CIRCLE) {
        this.drawCircleBadge(newValue, iconOptions, badgeOptions, additionalWidth);
      } else {
        this.drawRectBadge(iconOptions, badgeOptions, additionalWidth);
      }

      this.iconCanvasContext.fill();
      this.iconCanvasContext.fillStyle = badgeOptions.color;
      this.iconCanvasContext.fillText(
        String(newValue),
        iconOptions.width - additionalWidth / 2 - badgeOptions.width / 2,
        iconOptions.height - badgeOptions.height / 2 + 1.75,
        iconOptions.width
      );
      this.iconCanvasContext.closePath();

      this.iconElement.href = this.iconCanvas.toDataURL('image/png', 1.0);
      // document.body.append(this.iconCanvas);

      if (!count) {
        this.badgeCounter++;
      }
    };

    if (!this.userIconCache) {
      loadImage(this.userIconHref).then((img) => {
        this.userIconCache = img;
        setBadge(img);
      });
    } else {
      setBadge(this.userIconCache);
    }
  }

  private drawCircleBadge(
    newValue: number,
    iconOptions: IFavoritosOption['icon'],
    badgeOptions: IFavoritosOption['badge'],
    additionalWidth = 0
  ): void {
    if (newValue >= 10) {
      this.iconCanvasContext.strokeStyle = this.getContextBackgroundColor(
        badgeOptions.backgroundColor,
        this.iconCanvasWidth,
        this.iconCanvasHeight
      );
      roundedRect(
        this.iconCanvasContext,
        iconOptions.width - badgeOptions.width - additionalWidth,
        iconOptions.height - badgeOptions.height,
        badgeOptions.width + additionalWidth,
        badgeOptions.height,
        10
      );
    } else {
      this.iconCanvasContext.arc(
        iconOptions.width - badgeOptions.width / 2,
        iconOptions.height - badgeOptions.height / 2,
        badgeOptions.width / 2,
        0,
        2 * Math.PI
      );
    }
  }

  private drawRectBadge(
    iconOptions: IFavoritosOption['icon'],
    badgeOptions: IFavoritosOption['badge'],
    additionalWidth = 0
  ): void {
    this.iconCanvasContext.rect(
      iconOptions.width - badgeOptions.width - additionalWidth,
      iconOptions.height - badgeOptions.height,
      badgeOptions.width + additionalWidth,
      badgeOptions.height
    );
  }

  public initScrollingProgressBar(): void {
    document.addEventListener('scroll', this.setScrollingProgressBar.bind(this));
  }

  private setScrollingProgressBar(): void {
    const iconOptions = this.options.icon;
    const scrollTop = document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / pageHeight) * 100;

    fireEvent('favoritos:scrolled', scrolled);

    this.iconCanvasContext.clearRect(0, 0, iconOptions.width, iconOptions.height);
    this.iconCanvasContext.beginPath();
    this.iconCanvasContext.lineWidth = iconOptions.lineWidth;

    if (iconOptions.shape === IFavoritosShape.CIRCLE) {
      this.drawCircleProgress(scrolled, iconOptions);
    } else {
      this.drawRectProgress(scrolled);
    }

    this.iconCanvasContext.strokeStyle = this.getContextBackgroundColor(iconOptions.backgroundColor, 32, 32);
    this.iconCanvasContext.stroke();
    this.iconElement.href = this.iconCanvas.toDataURL('image/png', 1.0);
    // document.body.append(this.iconCanvas);
  }

  private drawCircleProgress(progress: number, iconOptions: IFavoritosOption['icon']): void {
    this.iconCanvasContext.arc(
      iconOptions.width / 2,
      iconOptions.height / 2,
      iconOptions.width / 2 - iconOptions.lineWidth / 2,
      1.5 * Math.PI,
      (progress * 2 * Math.PI) / 100 + 1.5 * Math.PI
    );
  }

  private drawRectProgress(progress: number): void {
    const context = this.iconCanvasContext;
    const step = (): void => {
      if (progress <= 25) {
        context.moveTo(0, 0);
        context.lineTo((32 / 25) * progress, 0);
      } else if (progress > 25 && progress <= 50) {
        context.moveTo(0, 0);
        context.lineTo(32, 0);
        context.moveTo(32, 0);
        context.lineTo(32, (32 / 25) * (progress - 25));
      } else if (progress > 50 && progress <= 75) {
        context.moveTo(0, 0);
        context.lineTo(32, 0);
        context.moveTo(32, 0);
        context.lineTo(32, 32);
        context.moveTo(32, 32);
        context.lineTo(-((32 / 25) * (progress - 75)), 32);
      } else if (progress > 75 && progress <= 100) {
        context.moveTo(0, 0);
        context.lineTo(32, 0);
        context.moveTo(32, 0);
        context.lineTo(32, 32);
        context.moveTo(32, 32);
        context.lineTo(0, 32);
        context.moveTo(0, 32);
        context.lineTo(0, -((32 / 25) * (progress - 100)));
      }
    };
    step();
  }
}
