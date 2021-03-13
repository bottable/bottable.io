import { Task } from './task';

import { Processor } from 'bullmq';

export class Sync extends Task {
  process: Processor = async (job) => {
    console.log('syncing...', job.name);
    const queue = await Task.factory.getScraperProducer();
    try {
      const syncOutput = await queue.syncRepeatableJobs();
      console.log('syncing done', syncOutput);
      return queue.name;
    } catch (err) {
      throw new Error(`SYNC ${err.message}`);
    }
  };
}
