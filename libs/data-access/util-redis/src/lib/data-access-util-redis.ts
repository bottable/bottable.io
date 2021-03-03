import Redis from 'ioredis';

export const options: Redis.RedisOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10),
  retryStrategy: (times) => Math.max(times * 100, 3000),
};

export const getRedis = () => {
  const _client = new Redis(options);

  _client.on('error', (error) => {
    console.log(' ERROR initialising Redis client connection', error.message);
  });

  _client.on('connect', () => {
    console.log('💡 Redis client connected');
  });
  return _client;
};
