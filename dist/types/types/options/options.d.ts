import { IFavoritosPositions } from './positions';
import { IFavoritosShape } from './shapes';
export interface IFavoritosOption {
    icon?: {
        iconSelector?: string;
        backgroundColor?: string | string[];
        shape?: IFavoritosShape;
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
        shape?: IFavoritosShape;
        minWidth?: number;
        minHeight?: number;
    };
    debug?: {
        enabled?: boolean;
        debugSelector?: string;
    };
}
