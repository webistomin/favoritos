import Favoritos from 'src/favoritos';

describe('Favoritos: drawCircleBadge method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('Draw circle badge if params are correct', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 1;
    expect(() => lib['drawCircleBadge'](10, 22, 1)).not.toThrow(TypeError);
    expect(() => lib['drawCircleBadge'](10, 22, 1)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Calculate final badge width with huge text width correctly', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 1;
    lib['options']['icon']['width'] = 32;
    expect(() => lib['drawCircleBadge'](64, 22, 1)).not.toThrow(TypeError);
    expect(() => lib['drawCircleBadge'](64, 22, 1)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Calculate final badge width if text width more than badge min width correctly', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 1;
    lib['options']['badge']['minWidth'] = 22;
    expect(() => lib['drawCircleBadge'](23, 22, 1)).not.toThrow(TypeError);
    expect(() => lib['drawCircleBadge'](23, 22, 1)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Calculate final badge height correctly', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 1;
    lib['options']['badge']['minHeight'] = 22;
    expect(() => lib['drawCircleBadge'](64, 64, 1)).not.toThrow(TypeError);
    expect(() => lib['drawCircleBadge'](64, 64, 1)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw rounded rectangle if value is number and more or equal 10', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 12;
    expect(() => lib['drawCircleBadge'](64, 64, 12)).not.toThrow(TypeError);
    expect(() => lib['drawCircleBadge'](64, 64, 12)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Draw rounded rectangle if value is string and string length more or equal 1', () => {
    const lib = new Favoritos();
    lib['badgeContent'] = 'abc';
    expect(() => lib['drawCircleBadge'](64, 64, 'abc')).not.toThrow(TypeError);
    expect(() => lib['drawCircleBadge'](64, 64, 'abc')).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
