import { fireEvent } from '../../../src/helpers/fire-event';

describe('FireEvent helper', () => {
  beforeAll(() => {
    document.dispatchEvent = jest.fn();
  });

  it('Dispatch custom event', () => {
    fireEvent('myEvent', 'Hello');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(document.dispatchEvent).toHaveBeenCalled();
  });
});
