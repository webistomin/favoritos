import { IFavoritosOption } from '../types/options/options';
import { IFavoritosShape } from '../types/options/shapes';
import { IFavoritosPositions } from '../types/options/positions';
import { IFavoritosAnimations } from '../types/options/animations';

export const DEFAULT_OPTIONS: IFavoritosOption = {
  icon: {
    iconSelector: 'link[rel*="icon"]',
    backgroundColor: '#d21f3c',
    shape: IFavoritosShape.CIRCLE,
    lineWidth: 4,
    width: 32,
    height: 32,
  },
  badge: {
    fontSize: 18,
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: '#d21f3c',
    color: '#ffffff',
    position: IFavoritosPositions.BOTTOM_RIGHT,
    animation: IFavoritosAnimations.NONE,
    shape: IFavoritosShape.CIRCLE,
    minWidth: 22,
    minHeight: 22,
  },
};
