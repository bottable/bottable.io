import { sharedConfig } from './shared-config';

describe('sharedConfig', () => {
  it('should work', () => {
    expect(sharedConfig()).toEqual('shared-config');
  });
});
