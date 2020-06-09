import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand();

function unquote(str: string): string {
  return str.replace(/(^")|("$)/g, '');
}

Cypress.Commands.add(
  'before',
  {
    prevSubject: 'element',
  },
  (el, property) => {
    const win = el[0].ownerDocument.defaultView;
    const before = win.getComputedStyle(el[0], 'before');
    return unquote(before.getPropertyValue(property));
  }
);
