export const FAVORITOS_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
} as const;

export type IFavoritosPositions = typeof FAVORITOS_POSITIONS[keyof typeof FAVORITOS_POSITIONS];
