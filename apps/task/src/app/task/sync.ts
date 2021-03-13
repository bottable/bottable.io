import { Task } from '../task';

import { Processor } from 'bullmq';
import { SCRAPER, Queue } from '@bottable.io/queue';

export class Sync extends Task {
  scraperQueue: Queue = null;

  constructor() {
    super();
    // sync schduled jobs in the scraper queue
    this.scraperQueue = Task.factory.getQueue(SCRAPER).getProducer();
  }

  process: Processor = async (job) => {
    console.log('syncing...', job.name);
    try {
      const syncOutput = await this.scraperQueue.syncRepeatableJobs();
      console.log('syncing done', syncOutput);
      return this.scraperQueue.name;
    } catch (err) {
      throw new Error(`SYNC ${err.message}`);
    }
  };
}
