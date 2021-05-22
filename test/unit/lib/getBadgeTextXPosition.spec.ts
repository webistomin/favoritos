import Favoritos from '../../../src/favoritos';
import { FAVORITOS_POSITIONS } from '../../../src/types/options/positions';

describe('Favoritos: getBadgeTextXPosition method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('Return correct X coord for number and "top-left" position', () => {
    const lib = new Favoritos({
      badge: {
        position: FAVORITOS_POSITIONS.TOP_LEFT,
      },
    });
    lib['badgeContent'] = 1;
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for string and "top-left" position', () => {
    const lib = new Favoritos({
      badge: {
        position: FAVORITOS_POSITIONS.TOP_LEFT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for number and "top-right" position', () => {
    const lib = new Favoritos({
      badge: {
        position: FAVORITOS_POSITIONS.TOP_RIGHT,
      },
    });
    lib['badgeContent'] = 1;
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for string and "top-right" position', () => {
    const lib = new Favoritos({
      badge: {
        position: FAVORITOS_POSITIONS.TOP_RIGHT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for number and "bottom-right" position', () => {
    const lib = new Favoritos({
      badge: {
        position: FAVORITOS_POSITIONS.BOTTOM_RIGHT,
      },
    });
    lib['badgeContent'] = 1;
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for string and "bottom-right" position', () => {
    const lib = new Favoritos({
      badge: {
        position: FAVORITOS_POSITIONS.BOTTOM_RIGHT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for number and "bottom-left" position', () => {
    const lib = new Favoritos({
      badge: {
        position: FAVORITOS_POSITIONS.BOTTOM_LEFT,
      },
    });
    lib['badgeContent'] = 1;
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord for string and "bottom-left" position', () => {
    const lib = new Favoritos({
      badge: {
        position: FAVORITOS_POSITIONS.BOTTOM_LEFT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](10)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord if text width more than badge min width', () => {
    const lib = new Favoritos({
      badge: {
        minWidth: 22,
        position: FAVORITOS_POSITIONS.BOTTOM_RIGHT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeTextXPosition'](30)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](30)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Return correct X coord if text width more than badge max width', () => {
    const lib = new Favoritos({
      icon: {
        width: 20,
      },
      badge: {
        minWidth: 22,
        position: FAVORITOS_POSITIONS.BOTTOM_RIGHT,
      },
    });
    lib['badgeContent'] = 'abc';
    expect(() => lib['getBadgeTextXPosition'](30)).not.toThrow(TypeError);
    expect(() => lib['getBadgeTextXPosition'](30)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
