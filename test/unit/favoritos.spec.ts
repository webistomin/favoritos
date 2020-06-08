import Favoritos from '../../src/favoritos';

describe('Favoritos library', () => {
  it("print warning to console if can't find debug element", () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    new Favoritos({
      debug: {
        enabled: true,
      },
    });
    expect(consoleSpy).toHaveBeenCalled();
  });
});
