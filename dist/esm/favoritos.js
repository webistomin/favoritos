/**
*
* favoritos
*
* @version 1.1.0
* @author Alexey Istomin
* @email: webistomin@gmail.com
* @license: MIT
*
**/

import { FAVORITOS_POSITIONS } from './types/options/positions.js';
import { FAVORITOS_SHAPES } from './types/options/shapes.js';
import { SSR_MESSAGE } from './helpers/ssr-message.js';
import { ICON_NOT_FOUND } from './helpers/icon-not-found-message.js';
import { DEBUG_NOT_FOUND } from './helpers/debug-not-found-message.js';
import { DEFAULT_OPTIONS } from './helpers/default-options.js';
import { getContextGradientEntries } from './helpers/get-context-gradient-entries.js';
import { mergeDeep } from './helpers/merge-deep.js';
import { loadImage } from './helpers/load-image.js';
import { roundedRect } from './helpers/rounded-rect.js';

var Favoritos = /*#__PURE__*/function () {
  function Favoritos(options) {
    if (options === void 0) {
      options = {};
    }

    this.userIconCache = null;
    this.debugElement = null;
    this.arcDegrees = {
      '0': 0,
      '90': 0.5 * Math.PI,
      '180': Math.PI,
      '270': 1.5 * Math.PI,
      '360': 2 * Math.PI
    };
    /**
     * Check SSR
     */

    if (typeof window === 'undefined') {
      console.warn(SSR_MESSAGE);
    } else {
      /**
       * Overwrite default options to user options
       */
      this.options = mergeDeep(DEFAULT_OPTIONS, options);
      this.init();
    }
  }

  var _proto = Favoritos.prototype;

  _proto.init = function init() {
    var _this = this;

    var options = this.options;
    var iconOptions = options.icon,
        debugOptions = options.debug;
    var isDebugEnabled = debugOptions.enabled,
        debugSelector = debugOptions.debugSelector;
    this.iconElement = document.querySelector(iconOptions.iconSelector);

    if (!this.iconElement) {
      console.warn(ICON_NOT_FOUND);
    } else {
      this.userIconHref = this.iconElement.href;
      loadImage(this.userIconHref, function (img) {
        _this.userIconCache = img;
      });
    }

    if (isDebugEnabled) {
      this.debugElement = document.querySelector(debugSelector);

      if (!this.debugElement) {
        console.warn(DEBUG_NOT_FOUND);
      }
    }

    this.initIconCanvas();
  };

  _proto.initIconCanvas = function initIconCanvas() {
    /**
     * Set default canvas params
     */
    var options = this.options;
    var iconOptions = options.icon,
        badgeOptions = options.badge;
    var iconWidth = iconOptions.width,
        iconHeight = iconOptions.height;
    /**
     * Fix retina blur with DPR calculation
     */

    var DPR = window.devicePixelRatio || 1;
    this.iconCanvas = document.createElement('canvas');
    this.iconCanvas.width = iconWidth * DPR;
    this.iconCanvas.height = iconHeight * DPR;
    this.iconCanvasContext = this.iconCanvas.getContext('2d');
    this.iconCanvasContext.font = badgeOptions.fontSize + "px " + badgeOptions.fontFamily;
    this.iconCanvasContext.textAlign = 'center';
    this.iconCanvasContext.textBaseline = 'middle';
    this.iconCanvasContext.scale(DPR, DPR);
  };

  _proto.getContextBackgroundColor = function getContextBackgroundColor(backgroundColor, width, height) {
    var resultBackground;
    var context = this.iconCanvasContext;

    if (Array.isArray(backgroundColor)) {
      var gradient = context.createLinearGradient(0, 0, width, height);
      var backgroundEntries = getContextGradientEntries(backgroundColor);
      backgroundEntries.map(function (entry) {
        gradient.addColorStop(entry[0], entry[1]);
      });
      resultBackground = gradient;
    } else {
      resultBackground = backgroundColor;
    }

    return resultBackground;
  };

  _proto.setOptions = function setOptions(options) {
    this.options = mergeDeep(this.options, options);
  };

  _proto.setIcon = function setIcon(newIcon) {
    this.iconElement.href = newIcon;
    this.userIconCache = null;
  };

  _proto.reset = function reset() {
    var context = this.iconCanvasContext;
    var iconOptions = this.options.icon;
    var iconWidth = iconOptions.width,
        iconHeight = iconOptions.height;
    this.options = DEFAULT_OPTIONS;
    this.setIcon(this.userIconHref);
    context.clearRect(0, 0, iconWidth, iconHeight);
    this.setDebugger();
    delete this.badgeContent;
  };

  _proto.drawImage = function drawImage(content) {
    /**
     * Draw video, image, etc. to context
     */
    var context = this.iconCanvasContext;
    var iconOptions = this.options.icon;
    var iconWidth = iconOptions.width,
        iconHeight = iconOptions.height;

    if ('crossOrigin' in content) {
      content.crossOrigin = 'anonymous';
    }

    context.drawImage(content, 0, 0, iconWidth, iconHeight);
    this.iconElement.href = this.iconCanvas.toDataURL('image/webp', 1.0);
    this.setDebugger();
  };

  _proto.drawBadge = function drawBadge(count) {
    var _this2 = this;

    if (count === void 0) {
      count = '';
    }

    var setBadge = function setBadge(img) {
      _this2.badgeContent = count;
      var newValue = count;
      var context = _this2.iconCanvasContext;
      var iconOptions = _this2.options.icon;
      var badgeOptions = _this2.options.badge;
      var badgeFontSize = badgeOptions.fontSize,
          badgeBackgroundColor = badgeOptions.backgroundColor,
          badgeShape = badgeOptions.shape,
          badgeColor = badgeOptions.color;
      var iconWidth = iconOptions.width,
          iconHeight = iconOptions.height;

      var textParams = _this2.iconCanvasContext.measureText(String(newValue));

      var textWidth = textParams.width;
      var textHeight = badgeFontSize;
      context.clearRect(0, 0, iconWidth, iconHeight);
      context.drawImage(img, 0, 0, iconWidth, iconHeight);
      context.fillStyle = _this2.getContextBackgroundColor(badgeBackgroundColor, iconWidth, iconHeight);
      context.beginPath();

      if (badgeShape === FAVORITOS_SHAPES.CIRCLE) {
        _this2.drawCircleBadge(textWidth, textHeight, newValue);
      } else {
        _this2.drawRectBadge(textWidth, textHeight);
      }

      context.fill();
      context.fillStyle = badgeColor;
      context.fillText(String(newValue), _this2.getBadgeTextXPosition(textWidth), _this2.getBadgeTextYPosition(textHeight), iconWidth);
      context.closePath();
      _this2.iconElement.href = _this2.iconCanvas.toDataURL('image/webp', 1.0);

      _this2.setDebugger();
    };

    if (!this.userIconCache) {
      loadImage(this.userIconHref, function (img) {
        _this2.userIconCache = img;
        setBadge(img);
      });
    } else {
      setBadge(this.userIconCache);
    }
  };

  _proto.drawProgressBar = function drawProgressBar(progress, shouldUseFavicon) {
    var _this3 = this;

    if (shouldUseFavicon === void 0) {
      shouldUseFavicon = false;
    }

    var userIconCache = this.userIconCache;

    var setProgress = function setProgress(img) {
      var context = _this3.iconCanvasContext;
      var iconOptions = _this3.options.icon;
      var iconWidth = iconOptions.width,
          iconHeight = iconOptions.height,
          iconBackgroundColor = iconOptions.backgroundColor,
          iconLineWidth = iconOptions.lineWidth;
      context.clearRect(0, 0, iconWidth, iconHeight);

      if (img) {
        context.drawImage(img, 0, 0, iconWidth, iconHeight);
      }

      context.beginPath();
      context.lineWidth = iconLineWidth;

      if (iconOptions.shape === FAVORITOS_SHAPES.CIRCLE) {
        _this3.drawCircleProgressBar(progress);
      } else {
        _this3.drawRectProgressBar(progress);
      }

      context.strokeStyle = _this3.getContextBackgroundColor(iconBackgroundColor, iconWidth, iconHeight);
      context.stroke();
      _this3.iconElement.href = _this3.iconCanvas.toDataURL('image/webp', 1.0);

      _this3.setDebugger();
    };

    if (shouldUseFavicon) {
      if (!userIconCache) {
        loadImage(this.userIconHref, function (img) {
          _this3.userIconCache = img;
        });
      } else {
        setProgress(userIconCache);
      }
    } else {
      setProgress();
    }
  };

  _proto.getBadgeXPosition = function getBadgeXPosition(textWidth) {
    var options = this.options;
    var _options$badge = options.badge,
        badgeMinWidth = _options$badge.minWidth,
        badgePosition = _options$badge.position;
    var iconWidth = options.icon.width;
    var badgeShape = options.badge.shape;
    var badgeMaxWidth = iconWidth;
    var badgeValue = this.badgeContent;
    var shouldUseShape = typeof badgeValue === 'number' ? badgeValue >= 10 : badgeValue.length >= 1;
    var finalBadgeWidth = badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;

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
  };

  _proto.getBadgeYPosition = function getBadgeYPosition(textHeight) {
    var options = this.options;
    var badgeValue = this.badgeContent;
    var _options$badge2 = options.badge,
        badgePosition = _options$badge2.position,
        badgeMinHeight = _options$badge2.minHeight,
        badgeShape = _options$badge2.shape;
    var iconHeight = options.icon.height;
    var shouldUseShape = typeof badgeValue === 'number' ? badgeValue >= 10 : badgeValue.length >= 1;
    var finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

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
  };

  _proto.getBadgeTextXPosition = function getBadgeTextXPosition(textWidth) {
    var options = this.options;
    var _options$badge3 = options.badge,
        badgePosition = _options$badge3.position,
        badgeMinWidth = _options$badge3.minWidth;
    var iconWidth = options.icon.width;
    var badgeMaxWidth = iconWidth;
    var finalBadgeTextWidth = badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;

    switch (badgePosition) {
      case FAVORITOS_POSITIONS.TOP_RIGHT:
      case FAVORITOS_POSITIONS.BOTTOM_RIGHT:
        return Math.abs(iconWidth - finalBadgeTextWidth / 2);

      case FAVORITOS_POSITIONS.TOP_LEFT:
      case FAVORITOS_POSITIONS.BOTTOM_LEFT:
        return Math.abs(finalBadgeTextWidth / 2);
    }
  };

  _proto.getBadgeTextYPosition = function getBadgeTextYPosition(textHeight) {
    var options = this.options;
    var _options$badge4 = options.badge,
        badgePosition = _options$badge4.position,
        badgeMinHeight = _options$badge4.minHeight;
    var iconHeight = options.icon.height;
    var badgeValue = this.badgeContent;
    var isBadgeValueNumber = typeof badgeValue === 'number';
    var additionalHeight = isBadgeValueNumber ? textHeight * 0.085 : 0;
    var finalHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    switch (badgePosition) {
      case FAVORITOS_POSITIONS.TOP_RIGHT:
      case FAVORITOS_POSITIONS.TOP_LEFT:
        return Math.abs(finalHeight / 2 + additionalHeight);

      case FAVORITOS_POSITIONS.BOTTOM_RIGHT:
      case FAVORITOS_POSITIONS.BOTTOM_LEFT:
        return Math.abs(iconHeight - finalHeight / 2 + additionalHeight);
    }
  };

  _proto.drawCircleBadge = function drawCircleBadge(textWidth, textHeight, newValue) {
    var options = this.options;
    var _options$icon = options.icon,
        iconWidth = _options$icon.width,
        iconHeight = _options$icon.height;
    var _options$badge5 = options.badge,
        badgeMinWidth = _options$badge5.minWidth,
        badgeMinHeight = _options$badge5.minHeight,
        badgeBackgroundColor = _options$badge5.backgroundColor;
    var badgeMaxWidth = iconWidth;
    var context = this.iconCanvasContext;
    var finalBadgeWidth = badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;
    var finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;

    if (typeof newValue === 'number' ? newValue >= 10 : newValue.length >= 1) {
      context.strokeStyle = this.getContextBackgroundColor(badgeBackgroundColor, iconWidth, iconHeight);
      roundedRect(context, this.getBadgeXPosition(textWidth), this.getBadgeYPosition(textHeight), finalBadgeWidth, finalBadgeHeight, 10);
    } else {
      context.arc(this.getBadgeXPosition(textWidth), this.getBadgeYPosition(textHeight), finalBadgeWidth / 2, this.arcDegrees['0'], this.arcDegrees['360']);
    }
  };

  _proto.drawRectBadge = function drawRectBadge(textWidth, textHeight) {
    var options = this.options;
    var iconWidth = options.icon.width;
    var _options$badge6 = options.badge,
        badgeMinWidth = _options$badge6.minWidth,
        badgeMinHeight = _options$badge6.minHeight;
    var badgeMaxWidth = iconWidth;
    var finalBadgeWidth = badgeMinWidth >= textWidth ? badgeMinWidth : textWidth >= badgeMaxWidth ? badgeMaxWidth : textWidth;
    var finalBadgeHeight = badgeMinHeight >= textHeight ? badgeMinHeight : textHeight;
    this.iconCanvasContext.rect(this.getBadgeXPosition(textWidth), this.getBadgeYPosition(textHeight), finalBadgeWidth, finalBadgeHeight);
  };

  _proto.drawCircleProgressBar = function drawCircleProgressBar(progress) {
    var options = this.options;
    var context = this.iconCanvasContext;
    var _options$icon2 = options.icon,
        iconWidth = _options$icon2.width,
        iconHeight = _options$icon2.height,
        iconLineWidth = _options$icon2.lineWidth;
    context.arc(iconWidth / 2, iconHeight / 2, iconWidth / 2 - iconLineWidth / 2, this.arcDegrees['270'], progress * this.arcDegrees['360'] / 100 + this.arcDegrees['270']);
  };

  _proto.drawRectProgressBar = function drawRectProgressBar(progress) {
    var options = this.options;
    var context = this.iconCanvasContext;
    var _options$icon3 = options.icon,
        iconWidth = _options$icon3.width,
        iconHeight = _options$icon3.height;

    var step = function step() {
      if (progress <= 25) {
        context.moveTo(0, 0);
        context.lineTo(iconWidth / 25 * progress, 0);
      } else if (progress > 25 && progress <= 50) {
        context.moveTo(0, 0);
        context.lineTo(iconWidth, 0);
        context.moveTo(iconWidth, 0);
        context.lineTo(iconWidth, iconHeight / 25 * (progress - 25));
      } else if (progress > 50 && progress <= 75) {
        context.moveTo(0, 0);
        context.lineTo(iconWidth, 0);
        context.moveTo(iconWidth, 0);
        context.lineTo(iconWidth, iconHeight);
        context.moveTo(iconWidth, iconHeight);
        context.lineTo(-(iconWidth / 25 * (progress - 75)), iconHeight);
      } else if (progress > 75 && progress <= 100) {
        context.moveTo(0, 0);
        context.lineTo(iconWidth, 0);
        context.moveTo(iconWidth, 0);
        context.lineTo(iconWidth, iconHeight);
        context.moveTo(iconWidth, iconHeight);
        context.lineTo(0, iconHeight);
        context.moveTo(0, iconHeight);
        context.lineTo(0, -(iconHeight / 25 * (progress - 100)));
      }
    };

    step();
  };

  _proto.setDebugger = function setDebugger() {
    var debugOptions = this.options.debug;

    if (debugOptions.enabled && this.debugElement) {
      this.debugElement.appendChild(this.iconCanvas);
    }
  };

  return Favoritos;
}();

export default Favoritos;
