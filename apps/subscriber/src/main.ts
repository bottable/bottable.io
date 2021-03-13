import { queueEventHandlers } from './app';

import { QueueFactory, BottableQueueType } from '@bottable.io/queue';

const main = async () => {
  const factory = new QueueFactory();
  for (const type in queueEventHandlers) {
    if (queueEventHandlers[type]) {
      factory
        .getQueue(type as BottableQueueType)
        .subWorker(queueEventHandlers[type]);
    }
  }
};

main();
