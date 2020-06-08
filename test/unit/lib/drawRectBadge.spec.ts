import Favoritos from '../../../src/favoritos';

describe('Favoritos: drawRectBadge method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('draw rect badge if params are correct', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 1;
    expect(() => lib['drawRectBadge'](10, 22)).not.toThrow(TypeError);
    expect(() => lib['drawRectBadge'](10, 22)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('correctly calculate final badge width with huge text width', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 1;
    lib['options']['icon']['width'] = 32;
    expect(() => lib['drawRectBadge'](64, 22)).not.toThrow(TypeError);
    expect(() => lib['drawRectBadge'](64, 22)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('correctly calculate final badge width if text width more than badge min width', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 1;
    lib['options']['badge']['minWidth'] = 22;
    expect(() => lib['drawRectBadge'](23, 22)).not.toThrow(TypeError);
    expect(() => lib['drawRectBadge'](23, 22)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('correctly calculate final badge height', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 1;
    lib['options']['badge']['minHeight'] = 22;
    expect(() => lib['drawRectBadge'](64, 64)).not.toThrow(TypeError);
    expect(() => lib['drawRectBadge'](64, 64)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
