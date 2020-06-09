import Favoritos from '../../../src/favoritos';

describe('Favoritos: getContextBackgroundColor method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
    jest.clearAllMocks();
  });

  it('Return color string if "backgroundColor" param is string', () => {
    const lib = new Favoritos();
    const backgroundColor = '#000000';
    const result = lib['getContextBackgroundColor'](backgroundColor, 32, 32);
    expect(result).toEqual(backgroundColor);
  });

  it('Return gradient if "backgroundColor" param is array', () => {
    const lib = new Favoritos();
    const backgroundColor = ['#000000', '#ffffff'];
    const result = lib['getContextBackgroundColor'](backgroundColor, 32, 32);
    expect(result).toBeInstanceOf(CanvasGradient);
  });
});
