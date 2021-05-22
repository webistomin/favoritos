import { IFavoritosOption } from './types/options/options';
import { FAVORITOS_POSITIONS } from './types/options/positions';
import { FAVORITOS_SHAPES } from './types/options/shapes';

import { SSR_MESSAGE } from './helpers/ssr-message';
import { ICON_NOT_FOUND } from './helpers/icon-not-found-message';
import { DEBUG_NOT_FOUND } from './helpers/debug-not-found-message';
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

  private debugElement: HTMLElement | null = null;

  private readonly arcDegrees = {
    '0': 0,
    '90': 0.5 * Math.PI,
    '180': Math.PI,
    '270': 1.5 * Math.PI,
    '360': 2 * Math.PI,
  };

  constructor(options: IFavoritosOption = {}) {
    /**
     * Check SSR
     */
    if (typeof window === 'undefined') {
      console.warn(SSR_MESSAGE);
    } else {
      /**
       * Overwrite default options to user options
       */
      this.options = mergeDeep(DEFAULT_OPTIONS, options) as IFavoritosOption;
      this.init();
    }
  }

  private init(): void {
    const options = this.options;
    const { icon: iconOptions, debug: debugOptions } = options;
    const { enabled: isDebugEnabled, debugSelector } = debugOptions;

    this.iconElement = document.querySelector(iconOptions.iconSelector);

    if (!this.iconElement) {
      console.warn(ICON_NOT_FOUND);
    } else {
      this.userIconHref = this.iconElement.href;
      loadImage(this.userIconHref, (img: HTMLImageElement) => {
        this.userIconCache = img;
      });
    }

    if (isDebugEnabled) {
      this.debugElement = document.querySelector(debugSelector);

      if (!this.debugElement) {
        console.warn(DEBUG_NOT_FOUND);
      }
    }

    this.initIconCanvas();
  }

  private initIconCanvas(): void {
    /**
     * Set default canvas params
     */
    const options = this.options;
    const { icon: iconOptions, badge: badgeOptions } = options;
    const { width: iconWidth, height: iconHeight } = iconOptions;

    /**
     * Fix retina blur with DPR calculation
     */
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
    let resultBackground;
    const context = this.iconCanvasContext;

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

  public setOptions(options: IFavoritosOption): void {
    this.options = mergeDeep(this.options, options) as IFavoritosOption;
  }

  public setIcon(newIcon: string): void {
    this.iconElement.href = newIcon;
    this.userIconCache = null;
  }

  public reset(): void {
    const context = this.iconCanvasContext;
    const iconOptions = this.options.icon;
    const { width: iconWidth, height: iconHeight } = iconOptions;
    this.options = DEFAULT_OPTIONS;
    this.setIcon(this.userIconHref);
    context.clearRect(0, 0, iconWidth, iconHeight);
    this.setDebugger();
    delete this.badgeContent;
  }

  public drawImage(content: CanvasImageSource): void {
    /**
     * Draw video, image, etc. to context
     */
    const context = this.iconCanvasContext;
    const iconOptions = this.options.icon;
    const { width: iconWidth, height: iconHeight } = iconOptions;

    if ('crossOrigin' in content) {
      content.crossOrigin = 'anonymous';
    }

    context.drawImage(content, 0, 0, iconWidth, iconHeight);

    this.iconElement.href = this.iconCanvas.toDataURL('image/webp', 1.0);

    this.setDebugger();
  }

  public drawBadge(count: number | string = ''): void {
    const setBadge = (img: HTMLImageElement): void => {
      this.badgeContent = count;
      const newValue = count;

      const context = this.iconCanvasContext;
      const iconOptions = this.options.icon;
      const badgeOptions = this.options.badge;

      const {
        fontSize: badgeFontSize,
        backgroundColor: badgeBackgroundColor,
        shape: badgeShape,
        color: badgeColor,
      } = badgeOptions;
      const { width: iconWidth, height: iconHeight } = iconOptions;

      const textParams = this.iconCanvasContext.measureText(String(newValue));
      const textWidth = textParams.width;
      const textHeight = badgeFontSize;

      context.clearRect(0, 0, iconWidth, iconHeight);
      context.drawImage(img, 0, 0, iconWidth, iconHeight);
      context.fillStyle = this.getContextBackgroundColor(badgeBackgroundColor, iconWidth, iconHeight);

      context.beginPath();
      if (badgeShape === FAVORITOS_SHAPES.CIRCLE) {
        this.drawCircleBadge(textWidth, textHeight, newValue);
      } else {
        this.drawRectBadge(textWidth, textHeight);
      }
      context.fill();
      context.fillStyle = badgeColor;

      context.fillText(
        String(newValue),
        this.getBadgeTextXPosition(textWidth),
        this.getBadgeTextYPosition(textHeight),
        iconWidth
      );
      context.closePath();

      this.iconElement.href = this.iconCanvas.toDataURL('image/webp', 1.0);

      this.setDebugger();
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

  public drawProgressBar(progress: number, shouldUseFavicon = false): void {
    const userIconCache = this.userIconCache;

    const setProgress = (img?: HTMLImageElement): void => {
      const context = this.iconCanvasContext;
      const iconOptions = this.options.icon;
      const {
        width: iconWidth,
        height: iconHeight,
        backgroundColor: iconBackgroundColor,
        lineWidth: iconLineWidth,
      } = iconOptions;

      context.clearRect(0, 0, iconWidth, iconHeight);

      if (img) {
        context.drawImage(img, 0, 0, iconWidth, iconHeight);
      }

      context.beginPath();
      context.lineWidth = iconLineWidth;

      if (iconOptions.shape === FAVORITOS_SHAPES.CIRCLE) {
        this.drawCircleProgressBar(progress);
      } else {
        this.drawRectProgressBar(progress);
      }

      context.strokeStyle = this.getContextBackgroundColor(iconBackgroundColor, iconWidth, iconHeight);
      context.stroke();
      this.iconElement.href = this.iconCanvas.toDataURL('image/webp', 1.0);

      this.setDebugger();
    };

    if (shouldUseFavicon) {
      if (!userIconCache) {
        loadImage(this.userIconHref, (img: HTMLImageElement) => {
          this.userIconCache = img;
        });
      } else {
        setProgress(userIconCache);
      }
    } else {
      setProgress();
    }
  }

  private getBadgeXPosition(textWidth: number): number {
    const options = this.options;
    const { minWidth: badgeMinWidth, position: badgePosition } = options.badge;
    const { width: iconWidth } = options.icon;
    const { shape: badgeShape } = options.badge;
    const badgeMaxWidth = iconWidth;
    const badgeValue = this.badgeContent;
    const shouldUseShape = typeof badgeValue === 'number' ? badgeValue >= 10 : badgeValue.length >= 1;

    const finalBadgeWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;

    switch (badgePosition) {
      case FAVORITOS_POSITIONS.TOP_LEFT:
      case FAVORITOS_POSITIONS.BOTTOM_LEFT:
        switch (badgeShape) {
          case FAVORITOS_SHAPES.CIRCLE:
            if (shouldUseShape) {
              return 0;
            }
            return finalBadgeWidth / 2;
          case FAVORITOS_SHAPES.RECT:
            return 0;
        }
        break;
      case FAVORITOS_POSITIONS.TOP_RIGHT:
      case FAVORITOS_POSITIONS.BOTTOM_RIGHT:
        switch (badgeShape) {
          case FAVORITOS_SHAPES.CIRCLE:
            if (shouldUseShape) {
              return iconWidth - finalBadgeWidth;
            }
            return iconWidth - finalBadgeWidth / 2;
          case FAVORITOS_SHAPES.RECT:
            return iconWidth - finalBadgeWidth;
        }
        break;
    }
  }

  private getBadgeYPosition(textHeight: number): number {
    const options = this.options;
    const badgeValue = this.badgeContent;
    const { position: badgePosition, minHeight: badgeMinHeight, shape: badgeShape } = options.badge;
    const { height: iconHeight } = options.icon;
    const shouldUseShape = typeof badgeValue === 'number' ? badgeValue >= 10 : badgeValue.length >= 1;

    const finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    switch (badgePosition) {
      case FAVORITOS_POSITIONS.TOP_LEFT:
      case FAVORITOS_POSITIONS.TOP_RIGHT:
        switch (badgeShape) {
          case FAVORITOS_SHAPES.CIRCLE:
            if (shouldUseShape) {
              return 0;
            }
            return finalBadgeHeight / 2;
          case FAVORITOS_SHAPES.RECT:
            return 0;
        }
        break;
      case FAVORITOS_POSITIONS.BOTTOM_LEFT:
      case FAVORITOS_POSITIONS.BOTTOM_RIGHT:
        switch (badgeShape) {
          case FAVORITOS_SHAPES.CIRCLE:
            if (shouldUseShape) {
              return iconHeight - finalBadgeHeight;
            }
            return iconHeight - finalBadgeHeight / 2;
          case FAVORITOS_SHAPES.RECT:
            return iconHeight - finalBadgeHeight;
        }
    }
  }

  private getBadgeTextXPosition(textWidth: number): number {
    const options = this.options;
    const { position: badgePosition, minWidth: badgeMinWidth } = options.badge;
    const { width: iconWidth } = options.icon;
    const badgeMaxWidth = iconWidth;

    const finalBadgeTextWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;

    switch (badgePosition) {
      case FAVORITOS_POSITIONS.TOP_RIGHT:
      case FAVORITOS_POSITIONS.BOTTOM_RIGHT:
        return Math.abs(iconWidth - finalBadgeTextWidth / 2);
      case FAVORITOS_POSITIONS.TOP_LEFT:
      case FAVORITOS_POSITIONS.BOTTOM_LEFT:
        return Math.abs(finalBadgeTextWidth / 2);
    }
  }

  private getBadgeTextYPosition(textHeight: number): number {
    const options = this.options;
    const { position: badgePosition, minHeight: badgeMinHeight } = options.badge;
    const { height: iconHeight } = options.icon;
    const badgeValue = this.badgeContent;

    const isBadgeValueNumber = typeof badgeValue === 'number';
    const additionalHeight = isBadgeValueNumber ? textHeight * 0.085 : 0;

    const finalHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    switch (badgePosition) {
      case FAVORITOS_POSITIONS.TOP_RIGHT:
      case FAVORITOS_POSITIONS.TOP_LEFT:
        return Math.abs(finalHeight / 2 + additionalHeight);
      case FAVORITOS_POSITIONS.BOTTOM_RIGHT:
      case FAVORITOS_POSITIONS.BOTTOM_LEFT:
        return Math.abs(iconHeight - finalHeight / 2 + additionalHeight);
    }
  }

  private drawCircleBadge(textWidth: number, textHeight: number, newValue: number | string): void {
    const options = this.options;
    const { width: iconWidth, height: iconHeight } = options.icon;
    const { minWidth: badgeMinWidth, minHeight: badgeMinHeight, backgroundColor: badgeBackgroundColor } = options.badge;
    const badgeMaxWidth = iconWidth;
    const context = this.iconCanvasContext;

    const finalBadgeWidth =
      badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;
    const finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    if (typeof newValue === 'number' ? newValue >= 10 : newValue.length >= 1) {
      context.strokeStyle = this.getContextBackgroundColor(badgeBackgroundColor, iconWidth, iconHeight);
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
    const { width: iconWidth } = options.icon;
    const { minWidth: badgeMinWidth, minHeight: badgeMinHeight } = options.badge;
    const badgeMaxWidth = iconWidth;

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

  private drawCircleProgressBar(progress: number): void {
    const options = this.options;
    const context = this.iconCanvasContext;
    const { width: iconWidth, height: iconHeight, lineWidth: iconLineWidth } = options.icon;

    context.arc(
      iconWidth / 2,
      iconHeight / 2,
      iconWidth / 2 - iconLineWidth / 2,
      this.arcDegrees['270'],
      (progress * this.arcDegrees['360']) / 100 + this.arcDegrees['270']
    );
  }

  private drawRectProgressBar(progress: number): void {
    const options = this.options;
    const context = this.iconCanvasContext;
    const { width: iconWidth, height: iconHeight } = options.icon;

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

  private setDebugger(): void {
    const debugOptions = this.options.debug;
    if (debugOptions.enabled && this.debugElement) {
      this.debugElement.appendChild(this.iconCanvas);
    }
  }
}
