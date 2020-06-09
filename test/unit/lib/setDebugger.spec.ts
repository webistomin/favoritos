import Favoritos from 'src/favoritos';

describe('Favoritos: setDebugger method', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link rel="shortcut icon" href="#">`;
    document.body.innerHTML = `<div id="favoritos-debug"></div>`;
    jest.resetModules();
  });

  it("Doesn't append canvas if debug option is not enabled", () => {
    const lib = new Favoritos();
    const debugEl = document.getElementById('favoritos-debug');
    lib['setDebugger']();
    expect(debugEl.children.length).toEqual(0);
  });

  it('Append canvas if debug option is enabled', () => {
    const lib = new Favoritos({
      debug: {
        enabled: true,
      },
    });
    const debugEl = document.getElementById('favoritos-debug');
    lib['setDebugger']();
    expect(debugEl.children.length).toEqual(1);
  });
});
