import { scraper } from './app';

import { QueueFactory } from '@bottable.io/queue';

const main = async () => {
  const factory = new QueueFactory();

  factory.setScraperWorker(scraper, { concurrency: 50 });

  // TODO on failure add a notify job to background worker
  factory.subScraperWorker((jobId, type, data) => {
    console.log(`🦑  [SCRAPER UPDATE] - ${type}`);
    console.log(jobId);
    console.log(type);
    console.log(data);
  });
};

main();
