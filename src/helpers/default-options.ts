import { IFavoritosOption } from '../types/options/options';
import { FAVORITOS_SHAPES } from '../types/options/shapes';
import { FAVORITOS_POSITIONS } from '../types/options/positions';

export const DEFAULT_OPTIONS: IFavoritosOption = {
  icon: {
    iconSelector: 'link[rel*="icon"]',
    backgroundColor: '#d21f3c',
    shape: FAVORITOS_SHAPES.CIRCLE,
    lineWidth: 4,
    width: 32,
    height: 32,
  },
  badge: {
    fontSize: 18,
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: '#d21f3c',
    color: '#ffffff',
    position: FAVORITOS_POSITIONS.BOTTOM_RIGHT,
    shape: FAVORITOS_SHAPES.CIRCLE,
    minWidth: 22,
    minHeight: 22,
  },
  debug: {
    enabled: false,
    debugSelector: '#favoritos-debug',
  },
};
