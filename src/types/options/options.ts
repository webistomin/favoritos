import { IFavoritosPositions } from './positions';
import { IFavoritosAnimations } from './animations';
import { IFavoritosShape } from './shapes';

export interface IFavoritosOption {
  icon: {
    iconSelector?: string;
    backgroundColor?: string | string[];
    shape?: IFavoritosShape;
    lineWidth?: number;
    width?: number;
    height?: number;
  };
  badge: {
    fontSize?: number;
    fontFamily?: string;
    backgroundColor?: string | string[];
    color?: string;
    position?: IFavoritosPositions;
    animation?: IFavoritosAnimations;
    shape?: IFavoritosShape;
    minWidth?: number;
    minHeight?: number;
  };
}
