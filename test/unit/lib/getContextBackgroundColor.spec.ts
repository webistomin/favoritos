import Favoritos from '../../../src/favoritos';

describe('Favoritos: getContextBackgroundColor method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
    jest.clearAllMocks();
  });

  it('return color string if background option is string', () => {
    const lib = new Favoritos();
    const backgroundColor = '#000000';
    const result = lib['getContextBackgroundColor'](backgroundColor, 32, 32);
    expect(result).toEqual(backgroundColor);
  });

  it('return gradient if background option is array', () => {
    const lib = new Favoritos();
    const backgroundColor = ['#000000', '#ffffff'];
    const result = lib['getContextBackgroundColor'](backgroundColor, 32, 32);
    expect(result).toBeInstanceOf(CanvasGradient);
  });
});
