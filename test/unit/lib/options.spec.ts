import Favoritos from '../../../src/favoritos';
import { FAVORITOS_POSITIONS } from '../../../src/types/options/positions';
import { FAVORITOS_SHAPES } from '../../../src/types/options/shapes';

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
        shape: FAVORITOS_SHAPES.CIRCLE,
        lineWidth: 8,
        width: 20,
        height: 20,
      },
      badge: {
        fontSize: 12,
        fontFamily: 'Helvetica, Arial, sans-serif',
        backgroundColor: '#d21f3c',
        color: '#ffffff',
        position: FAVORITOS_POSITIONS.BOTTOM_RIGHT,
        shape: FAVORITOS_SHAPES.CIRCLE,
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
        shape: FAVORITOS_SHAPES.CIRCLE,
        lineWidth: 8,
        width: 20,
        height: 20,
      },
      badge: {
        fontSize: 12,
        fontFamily: 'Helvetica, Arial, sans-serif',
        backgroundColor: 'blue',
        color: 'black',
        position: FAVORITOS_POSITIONS.BOTTOM_RIGHT,
        shape: FAVORITOS_SHAPES.CIRCLE,
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
