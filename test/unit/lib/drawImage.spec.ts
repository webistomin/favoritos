import Favoritos from '../../../src/favoritos';

describe('Favoritos: drawImage method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('Draw image to canvas if content is correct', () => {
    const lib = new Favoritos();
    const correctContent = new Image();
    expect(() => lib['drawImage'](correctContent)).not.toThrow(TypeError);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });

  it('Ignore setting "crossorigin" anonymous attribute on canvas', () => {
    new Favoritos();
    const correctContent = document.createElement('canvas');
    // @ts-ignore
    expect(correctContent.crossOrigin).toEqual(undefined);
  });

  it('Throw error if content is not "CanvasImageSource" type', () => {
    const lib = new Favoritos();
    const correctContent = 'something wrong';
    expect(() => lib['drawImage']((correctContent as unknown) as CanvasImageSource)).toThrow(TypeError);
    // @ts-ignore
    expect(lib['iconCanvasContext'].__getEvents()).toMatchSnapshot();
  });
});
