export const FAVORITOS_SHAPES = {
  CIRCLE: 'circle',
  RECT: 'rectangle',
};

export type IFavoritosShapes = typeof FAVORITOS_SHAPES[keyof typeof FAVORITOS_SHAPES];
