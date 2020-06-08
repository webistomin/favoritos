import Favoritos from '../../../src/favoritos';

describe('Favoritos: drawCircleProgressBar method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('draw circle progress if content is correct', () => {
    const lib = new Favoritos();
    expect(() => lib['drawCircleProgressBar'](50)).not.toThrow(TypeError);
    expect(() => lib['drawCircleProgressBar'](50)).not.toThrow(DOMException);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
