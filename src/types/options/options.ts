import { IFavoritosPositions } from './positions';
import { IFavoritosShapes } from './shapes';

export interface IFavoritosOption {
  icon?: {
    iconSelector?: string;
    backgroundColor?: string | string[];
    shape?: IFavoritosShapes;
    lineWidth?: number;
    width?: number;
    height?: number;
  };
  badge?: {
    fontSize?: number;
    fontFamily?: string;
    backgroundColor?: string | string[];
    color?: string;
    position?: IFavoritosPositions;
    shape?: IFavoritosShapes;
    minWidth?: number;
    minHeight?: number;
  };
  debug?: {
    enabled?: boolean;
    debugSelector?: string;
  };
}
