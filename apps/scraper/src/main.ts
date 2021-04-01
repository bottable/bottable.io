import { scraper } from './app';

import { QueueFactory, SCRAPER } from '@bottable.io/queue';

const main = async () => {
  const factory = new QueueFactory();
  factory.getQueue(SCRAPER).setWorker(scraper, { concurrency: 50 });
};

main();
