import Favoritos from 'src/favoritos';
import { IFavoritosShape } from 'src/types/options/shapes';

describe('Favoritos: drawBadge method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('Draw badge without count param', () => {
    const lib = new Favoritos();
    expect(() => lib['drawBadge']()).not.toThrow(TypeError);
    expect(() => lib['drawBadge']()).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw badge if "count" param is correct', () => {
    const lib = new Favoritos();
    expect(() => lib['drawBadge'](50)).not.toThrow(TypeError);
    expect(() => lib['drawBadge'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw badge with favicon from cache correctly', () => {
    const lib = new Favoritos();
    const image = new Image();
    lib['userIconCache'] = image;
    expect(() => lib['drawBadge'](50)).not.toThrow(TypeError);
    expect(() => lib['drawBadge'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw badge with circle shape', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
      },
    });
    expect(() => lib['drawBadge'](50)).not.toThrow(TypeError);
    expect(() => lib['drawBadge'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw badge with rect shape', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.RECT,
      },
    });
    expect(() => lib['drawBadge'](25)).not.toThrow(TypeError);
    expect(() => lib['drawBadge'](25)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
