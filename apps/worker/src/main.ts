import { background } from './app/task/background';

import { QueueFactory } from '@bottable.io/queue';

const main = async () => {
  const factory = new QueueFactory();

  factory.setTaskWorker(background, { concurrency: 50 });

  const task = factory.getTaskProduer();

  // factory.subTaskWorker((jobId, type, data) => {
  //   console.log(`🧘‍ [TASK WORKER UPDATE] - ${type}`);
  //   console.log(jobId);
  //   console.log(type);
  //   console.log(data);
  // });

  await task.schedule({
    name: 'pingTask',
    data: { type: 'Ping' },
    opts: {
      jobId: 'pingTask',
      repeat: { every: 100000 },
    },
  });

  await task.schedule({
    name: 'syncTask',
    data: { type: 'Sync' },
    opts: {
      jobId: 'syncTask',
      repeat: {
        every: 20000,
      },
    },
  });
};

main();
