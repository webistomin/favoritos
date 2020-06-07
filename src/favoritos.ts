import { IFavoritosOption } from './types/options/options';
import { IFavoritosPositions } from './types/options/positions';
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

  private badgeCanvasMinWidth: number;
  private badgeCanvasMinHeight: number;
  private badgeContent: string | number;

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

    const badgeMinWidth = badgeOptions.minWidth;
    const badgeMinHeight = badgeOptions.minHeight;

    const iconWidth = iconOptions.width;
    const iconHeight = iconOptions.height;

    this.badgeCanvasMinWidth = badgeMinWidth;
    this.badgeCanvasMinHeight = badgeMinHeight;

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

  private getBadgeXPosition(textWidth: number): number {
    const options = this.options;
    const badgeMinWidth = options.badge.minWidth;
    const badgePosition = options.badge.position;
    const iconWidth = options.icon.width;
    const shape = options.badge.shape;
    const badgeMaxWidth = iconWidth;
    const badgeValue = this.badgeContent;
    const isBadgeValueMoreOrEqual10 = badgeValue >= 10;

    const finalBadgeWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;

    switch (badgePosition) {
      case IFavoritosPositions.TOP_LEFT:
      case IFavoritosPositions.BOTTOM_LEFT:
        switch (shape) {
          case IFavoritosShape.CIRCLE:
            if (isBadgeValueMoreOrEqual10) {
              return 0;
            }
            return finalBadgeWidth / 2;
          case IFavoritosShape.RECT:
            return 0;
        }
        break;
      case IFavoritosPositions.TOP_RIGHT:
      case IFavoritosPositions.BOTTOM_RIGHT:
        switch (shape) {
          case IFavoritosShape.CIRCLE:
            if (isBadgeValueMoreOrEqual10) {
              return iconWidth - finalBadgeWidth;
            }
            return iconWidth - finalBadgeWidth / 2;
          case IFavoritosShape.RECT:
            return iconWidth - finalBadgeWidth;
        }
        break;
    }
  }

  private getBadgeYPosition(textHeight: number): number {
    const options = this.options;
    const badgePosition = options.badge.position;
    const iconHeight = options.icon.height;
    const badgeMinHeight = options.badge.minHeight;
    const shape = options.badge.shape;
    const badgeValue = this.badgeContent;
    const isBadgeValueMoreOrEqual10 = badgeValue >= 10;

    const finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    switch (badgePosition) {
      case IFavoritosPositions.TOP_LEFT:
      case IFavoritosPositions.TOP_RIGHT:
        switch (shape) {
          case IFavoritosShape.CIRCLE:
            if (isBadgeValueMoreOrEqual10) {
              return 0;
            }
            return finalBadgeHeight / 2;
          case IFavoritosShape.RECT:
            return 0;
        }
        break;
      case IFavoritosPositions.BOTTOM_LEFT:
      case IFavoritosPositions.BOTTOM_RIGHT:
        switch (shape) {
          case IFavoritosShape.CIRCLE:
            if (isBadgeValueMoreOrEqual10) {
              return iconHeight - finalBadgeHeight;
            }
            return iconHeight - finalBadgeHeight / 2;
          case IFavoritosShape.RECT:
            return iconHeight - finalBadgeHeight;
        }
    }
  }

  private getBadgeTextXPosition(textWidth: number): number {
    const options = this.options;
    const badgePosition = options.badge.position;
    const iconWidth = options.icon.width;
    const badgeMinWidth = options.badge.minWidth;
    const badgeMaxWidth = iconWidth;

    const finalBadgeTextWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;

    switch (badgePosition) {
      case IFavoritosPositions.TOP_RIGHT:
      case IFavoritosPositions.BOTTOM_RIGHT:
        return Math.abs(iconWidth - finalBadgeTextWidth / 2);
      case IFavoritosPositions.TOP_LEFT:
      case IFavoritosPositions.BOTTOM_LEFT:
        return Math.abs(finalBadgeTextWidth / 2);
    }
  }

  private getBadgeTextYPosition(textHeight: number): number {
    const options = this.options;
    const badgePosition = options.badge.position;
    const iconHeight = options.icon.height;
    const badgeMinHeight = options.badge.minHeight;
    const badgeValue = this.badgeContent;

    const isBadgeValueNumber = typeof badgeValue === 'number';
    const additionalHeight = isBadgeValueNumber ? textHeight * 0.085 : 0;

    const finalHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    switch (badgePosition) {
      case IFavoritosPositions.TOP_RIGHT:
      case IFavoritosPositions.TOP_LEFT:
        return Math.abs(finalHeight / 2 + additionalHeight);
      case IFavoritosPositions.BOTTOM_RIGHT:
      case IFavoritosPositions.BOTTOM_LEFT:
        return Math.abs(iconHeight - finalHeight / 2 + additionalHeight);
    }
  }

  public drawBadge(count = 0): void {
    this.badgeContent = count;

    const setBadge = (img: HTMLImageElement): void => {
      const newValue = count;
      const iconOptions = this.options.icon;
      const badgeOptions = this.options.badge;

      const textParams = this.iconCanvasContext.measureText(String(newValue));
      const textWidth = textParams.width;
      const textHeight = badgeOptions.fontSize;

      this.iconCanvasContext.clearRect(0, 0, iconOptions.width, iconOptions.height);
      this.iconCanvasContext.drawImage(img, 0, 0, iconOptions.width, iconOptions.height);
      this.iconCanvasContext.fillStyle = this.getContextBackgroundColor(
        badgeOptions.backgroundColor,
        this.iconCanvasWidth,
        this.iconCanvasHeight
      );

      this.iconCanvasContext.beginPath();
      if (badgeOptions.shape === IFavoritosShape.CIRCLE) {
        this.drawCircleBadge(textWidth, textHeight, newValue);
      } else {
        this.drawRectBadge(textWidth, textHeight);
      }
      this.iconCanvasContext.fill();
      this.iconCanvasContext.fillStyle = badgeOptions.color;

      this.iconCanvasContext.fillText(
        String(newValue),
        this.getBadgeTextXPosition(textWidth),
        this.getBadgeTextYPosition(textHeight),
        iconOptions.width
      );
      this.iconCanvasContext.closePath();

      this.iconElement.href = this.iconCanvas.toDataURL('image/png', 1.0);
      document.body.append(this.iconCanvas);
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

  private drawCircleBadge(textWidth: number, textHeight: number, newValue: number): void {
    const options = this.options;
    const iconWidth = options.icon.width;
    const badgeMaxWidth = iconWidth;
    const badgeMinWidth = options.badge.minWidth;
    const badgeMinHeight = options.badge.minHeight;

    const finalBadgeWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;
    const finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    if (newValue >= 10) {
      this.iconCanvasContext.strokeStyle = this.getContextBackgroundColor(
        options.badge.backgroundColor,
        this.iconCanvasWidth,
        this.iconCanvasHeight
      );
      roundedRect(
        this.iconCanvasContext,
        this.getBadgeXPosition(textWidth),
        this.getBadgeYPosition(textHeight),
        finalBadgeWidth,
        finalBadgeHeight,
        10
      );
    } else {
      this.iconCanvasContext.arc(
        this.getBadgeXPosition(textWidth),
        this.getBadgeYPosition(textHeight),
        finalBadgeWidth / 2,
        0,
        2 * Math.PI
      );
    }
  }

  private drawRectBadge(textWidth: number, textHeight: number): void {
    const options = this.options;
    const iconWidth = options.icon.width;
    const badgeMaxWidth = iconWidth;
    const badgeMinWidth = options.badge.minWidth;
    const badgeMinHeight = options.badge.minHeight;

    const finalBadgeWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;
    const finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    this.iconCanvasContext.rect(
      this.getBadgeXPosition(textWidth),
      this.getBadgeYPosition(textHeight),
      finalBadgeWidth,
      finalBadgeHeight
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
    document.body.append(this.iconCanvas);
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
