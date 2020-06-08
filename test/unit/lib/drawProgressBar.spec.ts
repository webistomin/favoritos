import Favoritos from '../../../src/favoritos';
import { IFavoritosShape } from '../../../src/types/options/shapes';

describe('Favoritos: drawProgressBar method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('draw progress bar if params are correct', () => {
    const lib = new Favoritos();
    expect(() => lib['drawProgressBar'](50)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('correctly draw progress bar with favicon', () => {
    const lib = new Favoritos();
    expect(() => lib['drawProgressBar'](50, true)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50, true)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('correctly draw progress bar with favicon from cache', () => {
    const lib = new Favoritos();
    const image = new Image();
    lib['userIconCache'] = image;
    expect(() => lib['drawProgressBar'](50, true)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50, true)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('correctly draw progress bar with circle shape', () => {
    const lib = new Favoritos({
      icon: {
        shape: IFavoritosShape.CIRCLE,
      },
    });
    expect(() => lib['drawProgressBar'](50)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('correctly draw progress bar with rect shape', () => {
    const lib = new Favoritos({
      icon: {
        shape: IFavoritosShape.RECT,
      },
    });
    expect(() => lib['drawProgressBar'](50)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
