import { IFavoritosShape } from 'src/types/options/shapes';
import { IFavoritosPositions } from 'src/types/options/positions';
import Favoritos from 'src/favoritos';

describe('Favoritos: options', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
    jest.resetModules();
  });

  it('Merge user and default options on init correctly', () => {
    const expectedResult = {
      icon: {
        iconSelector: 'link[rel*="icon"]',
        backgroundColor: 'red',
        shape: IFavoritosShape.CIRCLE,
        lineWidth: 8,
        width: 20,
        height: 20,
      },
      badge: {
        fontSize: 12,
        fontFamily: 'Helvetica, Arial, sans-serif',
        backgroundColor: '#d21f3c',
        color: '#ffffff',
        position: IFavoritosPositions.BOTTOM_RIGHT,
        shape: IFavoritosShape.CIRCLE,
        minWidth: 22,
        minHeight: 22,
      },
      debug: {
        enabled: false,
        debugSelector: '#favoritos-debug',
      },
    };
    const lib = new Favoritos({
      icon: {
        lineWidth: 8,
        width: 20,
        height: 20,
        backgroundColor: 'red',
      },
      badge: {
        fontSize: 12,
      },
    });
    expect(lib['options']).toEqual(expectedResult);
  });

  it('Merge user and default options via setOptions method correctly', () => {
    const expectedResult = {
      icon: {
        iconSelector: 'link[rel*="icon"]',
        backgroundColor: 'red',
        shape: IFavoritosShape.CIRCLE,
        lineWidth: 8,
        width: 20,
        height: 20,
      },
      badge: {
        fontSize: 12,
        fontFamily: 'Helvetica, Arial, sans-serif',
        backgroundColor: 'blue',
        color: 'black',
        position: IFavoritosPositions.BOTTOM_RIGHT,
        shape: IFavoritosShape.CIRCLE,
        minWidth: 22,
        minHeight: 22,
      },
      debug: {
        enabled: false,
        debugSelector: '#favoritos-debug',
      },
    };
    const lib = new Favoritos();
    lib['setOptions']({
      badge: {
        backgroundColor: 'blue',
        color: 'black',
      },
    });
    expect(lib['options']).toEqual(expectedResult);
  });
});
