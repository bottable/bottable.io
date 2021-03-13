import { Task } from '../task';

import { Processor } from 'bullmq';

export class Ping extends Task {
  process: Processor = async (job) => {
    console.log(job.data);
    console.log('PONG!');
    return 'PONG';
  };
}
