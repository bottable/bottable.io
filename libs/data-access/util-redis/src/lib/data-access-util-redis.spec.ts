import { dataAccessUtilRedis } from './data-access-util-redis';

describe('dataAccessUtilRedis', () => {
  it('should work', () => {
    expect(dataAccessUtilRedis()).toEqual('data-access-util-redis');
  });
});
