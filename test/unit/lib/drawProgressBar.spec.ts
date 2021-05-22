import Favoritos from '../../../src/favoritos';
import { FAVORITOS_SHAPES } from '../../../src/types/options/shapes';

describe('Favoritos: drawProgressBar method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('Draw progress bar if "progress" param is correct', () => {
    const lib = new Favoritos();
    expect(() => lib['drawProgressBar'](50)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw progress bar with favicon correctly', () => {
    const lib = new Favoritos();
    expect(() => lib['drawProgressBar'](50, true)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50, true)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw progress bar with favicon from cache correctly', () => {
    const lib = new Favoritos();
    const image = new Image();
    lib['userIconCache'] = image;
    expect(() => lib['drawProgressBar'](50, true)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50, true)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw progress bar with circle shape correctly', () => {
    const lib = new Favoritos({
      icon: {
        shape: FAVORITOS_SHAPES.CIRCLE,
      },
    });
    expect(() => lib['drawProgressBar'](50)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw progress bar with rect shape correctly', () => {
    const lib = new Favoritos({
      icon: {
        shape: FAVORITOS_SHAPES.RECT,
      },
    });
    expect(() => lib['drawProgressBar'](50)).not.toThrow(TypeError);
    expect(() => lib['drawProgressBar'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
