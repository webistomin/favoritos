import Favoritos from 'src/favoritos';
import { DEFAULT_OPTIONS } from 'src/helpers/default-options';

describe('Favoritos: reset method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
  });

  it('Reset state to default', () => {
    const lib = new Favoritos({
      badge: {
        fontSize: 100,
      },
    });

    lib['iconElement']['href'] = '/new-icon';
    lib['badgeContent'] = '100';

    lib.reset();

    expect(lib['iconElement']['href']).toEqual('http://localhost/#');
    expect(lib['options']).toEqual(DEFAULT_OPTIONS);
    expect(lib['badgeContent']).toEqual(undefined);
  });
});
