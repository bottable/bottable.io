import { processor } from './app';

import { PROCESSOR, QueueFactory } from '@bottable.io/queue';

const main = async () => {
  const factory = new QueueFactory();
  factory.getQueue(PROCESSOR).setWorker(processor, { concurrency: 50 });
};

main();
