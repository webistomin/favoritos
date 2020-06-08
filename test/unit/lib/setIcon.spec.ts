import Favoritos from '../../../src/favoritos';

describe('Favoritos: setIcon method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('set icon href and clear cache', () => {
    const lib = new Favoritos();
    const image = new Image();
    lib['iconElement']['href'] = '#';
    lib['userIconCache'] = image;

    lib['setIcon']('/new-icon');

    expect(lib['iconElement']['href']).toEqual('http://localhost/new-icon');
    expect(lib['userIconCache']).toEqual(null);
  });
});
