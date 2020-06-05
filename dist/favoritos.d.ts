import { IFavoritosOption } from './types/options/options';
export default class Favoritos {
    private options;
    private iconElement;
    private userIconHref;
    private userIconCache;
    private iconCanvasWidth;
    private iconCanvasHeight;
    private iconCanvas;
    private iconCanvasContext;
    private badgeCounter;
    private badgeCanvasWidth;
    private badgeCanvasHeight;
    constructor(options: IFavoritosOption);
    private static detectVisibilityChange;
    private static detectThemeChange;
    private static initListeners;
    private initIconCanvas;
    private getContextBackgroundColor;
    private init;
    destroy(): void;
    setOptions(options: IFavoritosOption): void;
    setIcon(newIcon: string): void;
    isPrefersColorSchemeDark(): boolean;
    reset(): void;
    drawBadge(count?: number): void;
    setScrollingProgressBar(): void;
    drawLoader(): void;
}
