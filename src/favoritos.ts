import { IFavoritosOption } from './types/options/options';
import { SSR_MESSAGE } from './helpers/ssr-message';
import { DEFAULT_OPTIONS } from './helpers/default-options';
import { fireEvent } from './helpers/fire-event';
import { mediaDarkTheme } from './helpers/media-dark-theme';
import { getContextGradientEntries } from './helpers/get-context-gradient-entries';
import { mergeDeep } from './helpers/merge-deep';
import { loadImage } from './helpers/load-image';

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
    const newColorScheme = event.matches ? 'dark' : 'light';
    fireEvent('favoritos:themechange', newColorScheme);
  }

  private static initListeners(): void {
    document.addEventListener('visibilitychange', Favoritos.detectVisibilityChange);
    mediaDarkTheme.addEventListener('change', Favoritos.detectThemeChange);
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
    // @ts-ignore
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
      radius = Math.min(Math.max(width - 1, 1), Math.max(height - 1, 1), radius);
      const rectX = x;
      const rectY = y;
      const rectWidth = width;
      const rectHeight = height;
      const cornerRadius = radius;

      this.lineJoin = 'round';
      this.lineWidth = cornerRadius;
      this.strokeRect(
        rectX + cornerRadius / 2,
        rectY + cornerRadius / 2,
        rectWidth - cornerRadius,
        rectHeight - cornerRadius
      );
      this.fillRect(
        rectX + cornerRadius / 2,
        rectY + cornerRadius / 2,
        rectWidth - cornerRadius,
        rectHeight - cornerRadius
      );
      this.stroke();
      this.fill();
    };

    const setBadge = (img: HTMLImageElement): void => {
      let newValue = this.badgeCounter;
      const iconOptions = this.options.icon;
      const badgeOptions = this.options.badge;

      if (count) {
        newValue = count;
        this.badgeCounter = count;
      }

      const additionalWidth = newValue >= 100 ? 6 : 0;
      this.iconCanvasContext.clearRect(0, 0, iconOptions.width, iconOptions.height);
      this.iconCanvasContext.drawImage(img, 0, 0, iconOptions.width, iconOptions.height);
      this.iconCanvasContext.fillStyle = this.getContextBackgroundColor(
        badgeOptions.backgroundColor,
        this.iconCanvasWidth,
        this.iconCanvasHeight
      );
      this.iconCanvasContext.beginPath();

      if (badgeOptions.shape === 'circle') {
        if (newValue >= 10) {
          this.iconCanvasContext.strokeStyle = this.getContextBackgroundColor(
            badgeOptions.backgroundColor,
            this.iconCanvasWidth,
            this.iconCanvasHeight
          );
          // @ts-ignore
          this.iconCanvasContext.roundRect(
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
      } else {
        this.iconCanvasContext.rect(
          iconOptions.width - badgeOptions.width - additionalWidth,
          iconOptions.height - badgeOptions.height,
          badgeOptions.width + additionalWidth,
          badgeOptions.height
        );
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
      document.body.append(this.iconCanvas);
      this.iconElement.href = this.iconCanvas.toDataURL('image/png');

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

  public setScrollingProgressBar(): void {
    const iconOptions = this.options.icon;
    const scrollTop = document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / pageHeight) * 100;
    this.iconCanvasContext.clearRect(0, 0, iconOptions.width, iconOptions.height);
    this.iconCanvasContext.beginPath();
    this.iconCanvasContext.lineWidth = iconOptions.lineWidth;
    this.iconCanvasContext.arc(
      iconOptions.width / 2,
      iconOptions.height / 2,
      iconOptions.width / 2 - iconOptions.lineWidth / 2,
      1.5 * Math.PI,
      (scrolled * 2 * Math.PI) / 100 + 1.5 * Math.PI
    );
    this.iconCanvasContext.strokeStyle = this.getContextBackgroundColor(iconOptions.backgroundColor, 32, 32);
    this.iconCanvasContext.stroke();
    this.iconElement.href = this.iconCanvas.toDataURL('image/png', 1.0);
    document.body.append(this.iconCanvas);
  }

  public drawLoader(): void {
    // this.iconCanvasContext.clearRect(0, 0, 32, 32);
    // this.iconCanvasContext.beginPath();
    // this.iconCanvasContext.arc(16, 16, 12, 1.5 * Math.PI, (this.iconCounter * 2 * Math.PI) / 100 + 1.5 * Math.PI);
    // this.iconCanvasContext.stroke();
    // this.iconCounter++;
    // this.iconElement.href = this.iconCanvas.toDataURL('image/png');
    //
    // if (this.n >= 100) {
    //   // this.worker.terminate();
    //   // this.setIcon('./on-visible.png');
    //   return;
    // }
    // const step = () => {
    //   if (this.n <= 25) {
    //     this.context.moveTo(0, 0);
    //     this.context.lineTo((32 / 25) * this.n, 0);
    //   } else if (this.n > 25 && this.n <= 50) {
    //     this.context.moveTo(0, 0);
    //     this.context.lineTo(32, 0);
    //     this.context.moveTo(32, 0);
    //     this.context.lineTo(32, (32 / 25) * (this.n - 25));
    //   } else if (this.n > 50 && this.n <= 75) {
    //     this.context.moveTo(0, 0);
    //     this.context.lineTo(32, 0);
    //     this.context.moveTo(32, 0);
    //     this.context.lineTo(32, 32);
    //     this.context.moveTo(32, 32);
    //     this.context.lineTo(-((32 / 25) * (this.n - 75)), 32);
    //   } else if (this.n > 75 && this.n <= 100) {
    //     this.context.moveTo(0, 0);
    //     this.context.lineTo(32, 0);
    //     this.context.moveTo(32, 0);
    //     this.context.lineTo(32, 32);
    //     this.context.moveTo(32, 32);
    //     this.context.lineTo(0, 32);
    //     this.context.moveTo(0, 32);
    //     this.context.lineTo(0, -((32 / 25) * (this.n - 100)));
    //   }
    //
    //   this.context.stroke();
    //   this.icon.href = this.canvas.toDataURL('image/png');
    // };
    // step();
  }
}
