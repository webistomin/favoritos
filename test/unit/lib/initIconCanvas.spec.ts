import Favoritos from '../../../src/favoritos';
import { DEFAULT_OPTIONS } from '../../../src/helpers/default-options';

describe('Favoritos: initIconCanvas method', () => {
  let windowSpy: any;

  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
    jest.clearAllMocks();
  });

  it('correctly work with high devicePixelRatio', () => {
    const DPR = 2;
    windowSpy = jest.spyOn(global as any, 'window', 'get');
    windowSpy.mockImplementation((): { devicePixelRatio: number } => {
      return {
        devicePixelRatio: DPR,
      };
    });
    const lib = new Favoritos();
    lib['initIconCanvas']();
    const canvas = lib['iconCanvas'];

    expect(canvas.height).toEqual(DEFAULT_OPTIONS.icon.height * DPR);
    expect(canvas.width).toEqual(DEFAULT_OPTIONS.icon.width * DPR);
  });

  it('correctly set default devicePixelRatio', () => {
    windowSpy = jest.spyOn(global as any, 'window', 'get');
    windowSpy.mockImplementation((): { devicePixelRatio: number } => {
      return {
        devicePixelRatio: 0,
      };
    });
    const lib = new Favoritos();
    lib['initIconCanvas']();
    const canvas = lib['iconCanvas'];

    expect(canvas.height).toEqual(DEFAULT_OPTIONS.icon.height);
    expect(canvas.width).toEqual(DEFAULT_OPTIONS.icon.width);
  });
});
