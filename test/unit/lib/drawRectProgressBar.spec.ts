import Favoritos from '../../../src/favoritos';

describe('Favoritos: drawRectProgressBar method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('draw progress <= 25 if param is correct', () => {
    const lib = new Favoritos();
    expect(() => lib['drawRectProgressBar'](20)).not.toThrow(TypeError);
    expect(() => lib['drawRectProgressBar'](20)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('draw progress > 25 and <= 50 if param is correct', () => {
    const lib = new Favoritos();
    expect(() => lib['drawRectProgressBar'](30)).not.toThrow(TypeError);
    expect(() => lib['drawRectProgressBar'](30)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('draw progress > 50 and <= 75 if param is correct', () => {
    const lib = new Favoritos();
    expect(() => lib['drawRectProgressBar'](55)).not.toThrow(TypeError);
    expect(() => lib['drawRectProgressBar'](55)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('draw progress > 75 and <= 100 if param is correct', () => {
    const lib = new Favoritos();
    expect(() => lib['drawRectProgressBar'](90)).not.toThrow(TypeError);
    expect(() => lib['drawRectProgressBar'](90)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('does not draw progress > 100', () => {
    const lib = new Favoritos();
    expect(() => lib['drawRectProgressBar'](200)).not.toThrow(TypeError);
    expect(() => lib['drawRectProgressBar'](200)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
