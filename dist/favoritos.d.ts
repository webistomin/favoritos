import { IFavoritosOption } from './types/options/options';
export default class Favoritos {
    private options;
    private iconElement;
    private userIconHref;
    private userIconCache;
    private iconCanvas;
    private iconCanvasContext;
    private badgeContent;
    private debugElement;
    private readonly arcDegrees;
    constructor(options: IFavoritosOption);
    private initIconCanvas;
    private getContextBackgroundColor;
    private init;
    setOptions(options: IFavoritosOption): void;
    setIcon(newIcon: string): void;
    reset(): void;
    drawBadge(count?: number | string): void;
    drawProgressBar(progress: number, shouldUseFavicon?: boolean): void;
    private getBadgeXPosition;
    private getBadgeYPosition;
    private getBadgeTextXPosition;
    private getBadgeTextYPosition;
    private drawCircleBadge;
    private drawRectBadge;
    private drawCircleProgressBar;
    private drawRectProgressBar;
}
