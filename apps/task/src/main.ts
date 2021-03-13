import { background } from './app/background';

import { QueueFactory, TASK } from '@bottable.io/queue';

const main = async () => {
  const factory = new QueueFactory();

  factory.getQueue(TASK).setWorker(background, { concurrency: 50 });

  const task = factory.getQueue(TASK).getProducer();

  await task.schedule({
    name: 'pingTask',
    data: { type: 'Ping' },
    opts: {
      jobId: 'pingTask',
      repeat: { every: 1000000 },
    },
  });

  await task.schedule({
    name: 'syncTask',
    data: { type: 'Sync' },
    opts: {
      jobId: 'syncTask',
      repeat: {
        every: 1000000,
      },
    },
  });
};

main();
