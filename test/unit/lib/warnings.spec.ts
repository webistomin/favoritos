import Favoritos from '../../../src/favoritos';

describe('Favoritos: warnings', () => {
  let windowSpy: any;

  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("print warning to console if can't find debug element", () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    new Favoritos({
      debug: {
        enabled: true,
      },
    });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("doesn't print warning to console if can find debug element", () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const debugEl = `<div id="favoritos-debug" />`;
    document.body.innerHTML = debugEl;
    const lib = new Favoritos({
      debug: {
        enabled: true,
      },
    });
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(lib['debugElement'].id).toEqual('favoritos-debug');
  });

  it("print SSR warning to console if can't find window", () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    windowSpy = jest.spyOn(global as any, 'window', 'get');
    windowSpy.mockImplementation((): void => undefined);
    new Favoritos();
    expect(consoleSpy).toHaveBeenCalled();
    windowSpy.mockRestore();
  });

  it("print warning to console if can't find icon element", () => {
    document.head.innerHTML = '';
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    new Favoritos();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
