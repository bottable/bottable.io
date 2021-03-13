import { scraper } from './app';

import {
  QueueListnerEventData,
  QueueFactory,
  COMPLETED,
  FAILED,
  STALLED,
  SLACK,
} from '@bottable.io/queue';

const main = async () => {
  const factory = new QueueFactory();
  const worker = factory.getTaskProducer();

  factory.setScraperWorker(scraper, { concurrency: 50 });

  // TODO on failure add a notify job to background worker
  factory.subScraperWorker((_, type, payload) => {
    console.log(`🦑  [SCRAPER UPDATE] - ${type}`);
    console.log(type);
    console.log(payload.data);
    const data = payload.data as QueueListnerEventData;
    const {
      scraperData: {
        tracker: { name },
      },
    } = data;

    // const { data: {opts:{repeat:{jobId}}} } = payload
    const message = `JobID: ${name} done`;
    switch (type) {
      case COMPLETED:
        // if no values are returned from the selector
        worker.add(`${SLACK}-${name}`, {
          type: SLACK,
          channel: '#bottable',
          message: message,
        });
        break;
      case STALLED:
        break;
      case FAILED:
        break;
      default:
        break;
    }
  });
};

main();
