import Redis from 'ioredis';

const options: Redis.RedisOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10),
  retryStrategy: (times) => Math.max(times * 100, 3000),
};

export const redis = new Redis(options);
export const publisher = new Redis(options);
export const subscriber = new Redis(options);
