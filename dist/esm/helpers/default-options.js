/**
*
* favoritos
*
* @version 1.0.1
* @author Alexey Istomin
* @email: webistomin@gmail.com
* @license: MIT
*
**/

import { FAVORITOS_SHAPES } from '../types/options/shapes.js';
import { FAVORITOS_POSITIONS } from '../types/options/positions.js';

var DEFAULT_OPTIONS = {
  icon: {
    iconSelector: 'link[rel*="icon"]',
    backgroundColor: '#d21f3c',
    shape: FAVORITOS_SHAPES.CIRCLE,
    lineWidth: 4,
    width: 32,
    height: 32
  },
  badge: {
    fontSize: 18,
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: '#d21f3c',
    color: '#ffffff',
    position: FAVORITOS_POSITIONS.BOTTOM_RIGHT,
    shape: FAVORITOS_SHAPES.CIRCLE,
    minWidth: 22,
    minHeight: 22
  },
  debug: {
    enabled: false,
    debugSelector: '#favoritos-debug'
  }
};

export { DEFAULT_OPTIONS };
