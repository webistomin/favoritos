import { IFavoritosOption } from './types/options/options';
export default class Favoritos {
    private options;
    private iconElement;
    private userIconHref;
    private userIconCache;
    private iconCanvas;
    private iconCanvasContext;
    private badgeContent;
    private boundScrollProgressListener;
    private scrollProgressOptions;
    private readonly arcDegrees;
    constructor(options: IFavoritosOption);
    private initIconCanvas;
    private getContextBackgroundColor;
    private init;
    destroy(): void;
    setOptions(options: IFavoritosOption): void;
    setIcon(newIcon: string): void;
    reset(): void;
    private getBadgeXPosition;
    private getBadgeYPosition;
    private getBadgeTextXPosition;
    private getBadgeTextYPosition;
    drawBadge(count?: number): void;
    private drawCircleBadge;
    private drawRectBadge;
    initScrollingProgressBar(scrollingOptions?: {
        useFavicon: boolean;
    }): void;
    private setScrollingProgressBar;
    private drawCircleProgress;
    private drawRectProgress;
}
