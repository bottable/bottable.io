import { scraper } from './app/scraper';

import { QueueFactory } from '@bottable.io/queue';

const main = async () => {
  const factory = new QueueFactory();

  factory.setScraperWorker(scraper, { concurrency: 50 });

  factory.subScraperWorker((jobId, type, data) => {
    console.log(`🦑  [SCRAPER UPDATE] - ${type}`);
    console.log(jobId);
    console.log(type);
    console.log(data);
  });
};

main();
