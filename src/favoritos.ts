import { IFavoritosOption } from './types/options/options';
import { IFavoritosPositions } from './types/options/positions';
import { IFavoritosShape } from './types/options/shapes';

import { SSR_MESSAGE } from './helpers/ssr-message';
import { DEFAULT_OPTIONS } from './helpers/default-options';
import { getContextGradientEntries } from './helpers/get-context-gradient-entries';
import { mergeDeep } from './helpers/merge-deep';
import { loadImage } from './helpers/load-image';
import { roundedRect } from './helpers/rounded-rect';

export default class Favoritos {
  private options: IFavoritosOption;
  private iconElement: HTMLLinkElement;
  private userIconHref: string;
  private userIconCache: HTMLImageElement | null = null;

  private iconCanvas: HTMLCanvasElement;
  private iconCanvasContext: CanvasRenderingContext2D;

  private badgeContent: string | number;

  private boundScrollProgressListener = this.setScrollingProgressBar.bind(this);
  private scrollProgressOptions = {
    useFavicon: false,
  };

  private debugElement: HTMLElement | null = null;

  private readonly arcDegrees = {
    '0': 0,
    '90': 0.5 * Math.PI,
    '180': Math.PI,
    '270': 1.5 * Math.PI,
    '360': 2 * Math.PI,
  };

  constructor(options: IFavoritosOption) {
    /*
      Check SSR
     */
    if (typeof window === 'undefined') {
      console.warn(SSR_MESSAGE);
    } else {
      /*
        Overwrite default options to user options
       */
      this.options = mergeDeep(DEFAULT_OPTIONS, options) as IFavoritosOption;
      this.init();
    }
  }

  private initIconCanvas(): void {
    /*
      Set default canvas params
     */
    const options = this.options;
    const iconOptions = options.icon;
    const badgeOptions = options.badge;

    const iconWidth = iconOptions.width;
    const iconHeight = iconOptions.height;

    const DPR = window.devicePixelRatio || 1;

    this.iconCanvas = document.createElement('canvas');

    this.iconCanvas.width = iconWidth * DPR;
    this.iconCanvas.height = iconHeight * DPR;

    this.iconCanvasContext = this.iconCanvas.getContext('2d');

    this.iconCanvasContext.font = `${badgeOptions.fontSize}px ${badgeOptions.fontFamily}`;
    this.iconCanvasContext.textAlign = 'center';
    this.iconCanvasContext.textBaseline = 'middle';
    this.iconCanvasContext.scale(DPR, DPR);
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
    const debugOptions = options.debug;

    this.iconElement = document.querySelector(iconOptions.iconSelector);
    this.userIconHref = this.iconElement.href;

    this.debugElement = document.querySelector(debugOptions.debugSelector);

    loadImage(this.userIconHref, (img: HTMLImageElement) => {
      this.userIconCache = img;
    });

    this.initIconCanvas();
  }

  public destroy(): void {
    document.removeEventListener('scroll', this.boundScrollProgressListener);
  }

  public setOptions(options: IFavoritosOption): void {
    this.options = mergeDeep(this.options, options) as IFavoritosOption;
  }

  public setIcon(newIcon: string): void {
    this.iconElement.href = newIcon;
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
    const shouldUseShape = typeof badgeValue === 'number' ? badgeValue >= 10 : badgeValue.length >= 1;

    const finalBadgeWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;

    switch (badgePosition) {
      case IFavoritosPositions.TOP_LEFT:
      case IFavoritosPositions.BOTTOM_LEFT:
        switch (shape) {
          case IFavoritosShape.CIRCLE:
            if (shouldUseShape) {
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
            if (shouldUseShape) {
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
    const shouldUseShape = typeof badgeValue === 'number' ? badgeValue >= 10 : badgeValue.length >= 1;

    const finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    switch (badgePosition) {
      case IFavoritosPositions.TOP_LEFT:
      case IFavoritosPositions.TOP_RIGHT:
        switch (shape) {
          case IFavoritosShape.CIRCLE:
            if (shouldUseShape) {
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
            if (shouldUseShape) {
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

  public drawBadge(count: number | string = ''): void {
    const setBadge = (img: HTMLImageElement): void => {
      const context = this.iconCanvasContext;
      this.badgeContent = count;
      const newValue = count;
      const iconOptions = this.options.icon;
      const badgeOptions = this.options.badge;
      const debugOptions = this.options.debug;

      const textParams = this.iconCanvasContext.measureText(String(newValue));
      const textWidth = textParams.width;
      const textHeight = badgeOptions.fontSize;

      context.clearRect(0, 0, iconOptions.width, iconOptions.height);
      context.drawImage(img, 0, 0, iconOptions.width, iconOptions.height);
      context.fillStyle = this.getContextBackgroundColor(
        badgeOptions.backgroundColor,
        iconOptions.width,
        iconOptions.height
      );

      context.beginPath();
      if (badgeOptions.shape === IFavoritosShape.CIRCLE) {
        this.drawCircleBadge(textWidth, textHeight, newValue);
      } else {
        this.drawRectBadge(textWidth, textHeight);
      }
      context.fill();
      context.fillStyle = badgeOptions.color;

      context.fillText(
        String(newValue),
        this.getBadgeTextXPosition(textWidth),
        this.getBadgeTextYPosition(textHeight),
        iconOptions.width
      );
      context.closePath();

      this.iconElement.href = this.iconCanvas.toDataURL('image/webp', 1.0);

      if (debugOptions.enabled && this.debugElement) {
        this.debugElement.appendChild(this.iconCanvas);
      }
    };

    if (!this.userIconCache) {
      loadImage(this.userIconHref, (img: HTMLImageElement) => {
        this.userIconCache = img;
        setBadge(img);
      });
    } else {
      setBadge(this.userIconCache);
    }
  }

  private drawCircleBadge(textWidth: number, textHeight: number, newValue: number | string): void {
    const options = this.options;
    const iconWidth = options.icon.width;
    const iconHeight = options.icon.height;
    const badgeMaxWidth = iconWidth;
    const badgeMinWidth = options.badge.minWidth;
    const badgeMinHeight = options.badge.minHeight;
    const context = this.iconCanvasContext;

    const finalBadgeWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;
    const finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    if (typeof newValue === 'number' ? newValue >= 10 : newValue.length >= 1) {
      console.log(textWidth, textHeight, 'text parms');
      console.log(finalBadgeWidth, finalBadgeHeight, 'final');
      console.log(this.getBadgeXPosition(textWidth), this.getBadgeYPosition(textHeight), 'positions')
      context.strokeStyle = this.getContextBackgroundColor(options.badge.backgroundColor, iconWidth, iconHeight);
      roundedRect(
        context,
        this.getBadgeXPosition(textWidth),
        this.getBadgeYPosition(textHeight),
        finalBadgeWidth,
        finalBadgeHeight,
        10
      );
    } else {
      context.arc(
        this.getBadgeXPosition(textWidth),
        this.getBadgeYPosition(textHeight),
        finalBadgeWidth / 2,
        this.arcDegrees['0'],
        this.arcDegrees['360']
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

  public initScrollingProgressBar(scrollingOptions: { useFavicon: boolean } = { useFavicon: false }): void {
    this.scrollProgressOptions.useFavicon = scrollingOptions.useFavicon;
    document.addEventListener('scroll', this.boundScrollProgressListener);
  }

  private setScrollingProgressBar(): void {
    const shouldUseFavicon = this.scrollProgressOptions.useFavicon;
    const userIconCache = this.userIconCache;
    const setProgress = (img?: HTMLImageElement): void => {
      const iconOptions = this.options.icon;
      const debugOptions = this.options.debug;
      const scrollTopInPx = document.documentElement.scrollTop;
      const pageHeightInPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTopInPx / pageHeightInPx) * 100;
      const scrollPercentRounded = Math.round(scrollPercent);
      const context = this.iconCanvasContext;

      context.clearRect(0, 0, iconOptions.width, iconOptions.height);

      if (img) {
        context.drawImage(img, 0, 0, iconOptions.width, iconOptions.height);
      }

      context.beginPath();
      context.lineWidth = iconOptions.lineWidth;

      if (iconOptions.shape === IFavoritosShape.CIRCLE) {
        this.drawCircleProgress(scrollPercent);
      } else {
        this.drawRectProgress(scrollPercent);
      }

      context.strokeStyle = this.getContextBackgroundColor(iconOptions.backgroundColor, 32, 32);
      context.stroke();
      this.iconElement.href = this.iconCanvas.toDataURL('image/webp', 1.0);

      if (debugOptions.enabled && this.debugElement) {
        this.debugElement.appendChild(this.iconCanvas);
      }

      const evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('favoritos:scroll', true, true, {
        pageHeightInPx,
        scrollTopInPx,
        scrollPercent,
        scrollPercentRounded,
      });
      document.dispatchEvent(evt);
    };

    if (shouldUseFavicon) {
      if (!userIconCache) {
        loadImage(this.userIconHref, (img: HTMLImageElement) => {
          this.userIconCache = img;
          setProgress(img);
        });
      } else {
        setProgress(userIconCache);
      }
    } else {
      setProgress();
    }
  }

  private drawCircleProgress(progress: number): void {
    const options = this.options;
    const context = this.iconCanvasContext;
    const iconWidth = options.icon.width;
    const iconHeight = options.icon.height;
    const iconLineWidth = options.icon.lineWidth;

    context.arc(
      iconWidth / 2,
      iconHeight / 2,
      iconWidth / 2 - iconLineWidth / 2,
      this.arcDegrees['270'],
      (progress * this.arcDegrees['360']) / 100 + this.arcDegrees['270']
    );
  }

  private drawRectProgress(progress: number): void {
    const options = this.options;
    const context = this.iconCanvasContext;
    const iconWidth = options.icon.width;
    const iconHeight = options.icon.height;

    const step = (): void => {
      if (progress <= 25) {
        context.moveTo(0, 0);
        context.lineTo((iconWidth / 25) * progress, 0);
      } else if (progress > 25 && progress <= 50) {
        context.moveTo(0, 0);
        context.lineTo(iconWidth, 0);
        context.moveTo(iconWidth, 0);
        context.lineTo(iconWidth, (iconHeight / 25) * (progress - 25));
      } else if (progress > 50 && progress <= 75) {
        context.moveTo(0, 0);
        context.lineTo(iconWidth, 0);
        context.moveTo(iconWidth, 0);
        context.lineTo(iconWidth, iconHeight);
        context.moveTo(iconWidth, iconHeight);
        context.lineTo(-((iconWidth / 25) * (progress - 75)), iconHeight);
      } else if (progress > 75 && progress <= 100) {
        context.moveTo(0, 0);
        context.lineTo(iconWidth, 0);
        context.moveTo(iconWidth, 0);
        context.lineTo(iconWidth, iconHeight);
        context.moveTo(iconWidth, iconHeight);
        context.lineTo(0, iconHeight);
        context.moveTo(0, iconHeight);
        context.lineTo(0, -((iconHeight / 25) * (progress - 100)));
      }
    };
    step();
  }
}
