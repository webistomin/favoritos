import Favoritos from 'src/favoritos';
import { IFavoritosPositions } from 'src/types/options/positions';
import { IFavoritosShape } from 'src/types/options/shapes';

describe('Favoritos: getBadgeXPosition method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('Return correct X coord for number and "top-left" position', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        position: IFavoritosPositions.TOP_LEFT,
      },
    });
    lib['badgeContent'] = 1;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for string and "top-left" position', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        position: IFavoritosPositions.TOP_LEFT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for number and "top-right" position', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        position: IFavoritosPositions.TOP_RIGHT,
      },
    });
    lib['badgeContent'] = 1;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for string and "top-right" position', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        position: IFavoritosPositions.TOP_RIGHT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for number and "bottom-right" position', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        position: IFavoritosPositions.BOTTOM_RIGHT,
      },
    });
    lib['badgeContent'] = 1;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for string and "bottom-right" position', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        position: IFavoritosPositions.BOTTOM_RIGHT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for number and "bottom-left" position', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        position: IFavoritosPositions.BOTTOM_LEFT,
      },
    });
    lib['badgeContent'] = 1;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for string and "bottom-left" position', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        position: IFavoritosPositions.BOTTOM_LEFT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord if text width more than badge min width', () => {
    const lib = new Favoritos({
      badge: {
        shape: IFavoritosShape.CIRCLE,
        minWidth: 22,
        position: IFavoritosPositions.BOTTOM_RIGHT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeXPosition'](30)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](30)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord if text width more than badge max width', () => {
    const lib = new Favoritos({
      icon: {
        width: 20,
      },
      badge: {
        shape: IFavoritosShape.CIRCLE,
        minWidth: 22,
        position: IFavoritosPositions.BOTTOM_RIGHT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeXPosition'](30)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](30)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();

    lib['options']['badge']['shape'] = IFavoritosShape.RECT;
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
