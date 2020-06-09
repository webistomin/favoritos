describe('Favoritos: drawProgressBar', () => {
  const url = 'http://localhost:3030/scroll-progress/circle/index.html';
  const canvasSelector = '#favoritos-debug';

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it('Correctly init library without error', () => {
    const spy = cy.spy(window.console, 'warn');
    cy.visit(url);
    cy.get(canvasSelector);
    expect(spy).not.to.be.called;
  });

  it('Match snapshot', () => {
    cy.visit(url);
    cy.get(canvasSelector);
    // @ts-ignore
    cy.matchImageSnapshot('drawProgressBar (circle)');
  });
});
