import { IFavoritosShape } from '../types/options/shapes';
import { IFavoritosPositions } from '../types/options/positions';
// import { IFavoritosAnimations } from '../types/options/animations';
export var DEFAULT_OPTIONS = {
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
        // animation: IFavoritosAnimations.NONE,
        shape: IFavoritosShape.CIRCLE,
        minWidth: 22,
        minHeight: 22,
    },
    debug: {
        enabled: false,
        debugSelector: '#favoritos-debug',
    },
};
//# sourceMappingURL=default-options.js.map