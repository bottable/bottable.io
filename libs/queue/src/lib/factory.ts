import { Queue } from './queue';

import { SCRAPER, TASK, RESULT, COMPLETED, STALLED, FAILED } from '../types';

import { PrismaClient } from '@prisma/client';

import {
  Processor,
  Worker,
  WorkerOptions,
  QueueEvents,
  QueueScheduler,
} from 'bullmq';
import { options } from '@bottable.io/data-access/util-redis';
const { QUEUE } = process.env;

export type QueueListnerEvent = {
  jobId: string;
  data: string;
  failedReason?: string;
  returnvalue?: string;
  prev?: string;
};

export class QueueFactory {
  prisma: PrismaClient;

  scraper: Queue = null;
  scraperWorker: Worker = null;
  scraperQueueEvents: QueueEvents = null;
  scraperQueueScheduler: QueueScheduler;

  task: Queue = null;
  taskWorker: Worker = null;
  taskQueueEvents: QueueEvents = null;
  taskQueueScheduler: QueueScheduler = null;

  result: Queue = null;
  resultWorker: Worker = null;
  resultQueueEvents: QueueEvents = null;
  resultQueueScheduler: QueueScheduler = null;

  test: Queue = null;
  customQueues: { [key: string]: Queue } = {};

  constructor() {
    this.prisma = new PrismaClient();
  }

  private createQueue = (name: string) => {
    return new Queue(
      name,
      {
        connection: options,
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 100,
          attempts: 2,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
        },
      },
      this.prisma
    );
  };

  getScraperProduer = () => {
    if (this.scraper == null)
      this.scraper = this.createQueue(`${SCRAPER}-${QUEUE}`);

    if (this.scraperQueueScheduler == null)
      this.scraperQueueScheduler = new QueueScheduler(`${SCRAPER}-${QUEUE}`);

    return this.scraper;
  };

  setScraperWorker = (handler: Processor, opt?: WorkerOptions) => {
    if (this.scraperWorker == null)
      this.scraperWorker = new Worker(`${SCRAPER}-${QUEUE}`, handler, opt);
    return this.scraperWorker;
  };

  subScraperWorker = (
    callback: (id: string, type: string, data?: QueueListnerEvent) => void
  ) => {
    if (this.scraperQueueEvents == null) {
      this.scraperQueueEvents = new QueueEvents(`${SCRAPER}-${QUEUE}`);
    }

    this.registerQueueEvents(this.scraperQueueEvents, callback);
  };

  getTaskProduer = () => {
    if (this.task == null) this.task = this.createQueue(`${TASK}-${QUEUE}`);

    if (this.taskQueueScheduler == null)
      this.taskQueueScheduler = new QueueScheduler(`${TASK}-${QUEUE}`);

    return this.task;
  };

  setTaskWorker = (handler: Processor, opt?: WorkerOptions) => {
    if (this.taskWorker == null)
      this.taskWorker = new Worker(`${TASK}-${QUEUE}`, handler, opt);
    return this.taskWorker;
  };

  registerQueueEvents = (
    queueEvent: QueueEvents,
    callback: (id: string, type: string, data?: QueueListnerEvent) => void
  ) => {
    queueEvent.on(COMPLETED, (listnerEvent: QueueListnerEvent, id) => {
      if (listnerEvent.returnvalue) {
        try {
          listnerEvent.data = JSON.parse(listnerEvent.returnvalue);
        } catch (e) {
          listnerEvent.data = listnerEvent.returnvalue;
        }
      }
      callback(id, COMPLETED, listnerEvent);
    });

    queueEvent.on(STALLED, (listnerEvent: QueueListnerEvent, id) => {
      callback(id, STALLED, listnerEvent);
    });

    queueEvent.on(FAILED, (listnerEvent: QueueListnerEvent, id) => {
      if (listnerEvent.failedReason) {
        try {
          listnerEvent.data = JSON.parse(listnerEvent.failedReason);
        } catch (e) {
          listnerEvent.data = listnerEvent.failedReason;
        }
      }
      callback(id, FAILED, listnerEvent);
    });
  };

  subTaskWorker = (
    callback: (id: string, type: string, data?: QueueListnerEvent) => void
  ) => {
    if (this.taskQueueEvents == null) {
      this.taskQueueEvents = new QueueEvents(`${TASK}-${QUEUE}`);
    }

    this.registerQueueEvents(this.taskQueueEvents, callback);
  };

  getTestQueue = (prefix: string) => {
    return this.createQueue(`${prefix}-${QUEUE}`);
  };

  getQueueByName = (prefix: string) => {
    if (this.customQueues[prefix] == null)
      this.customQueues[prefix] = this.createQueue(`${prefix}-${QUEUE}`);

    return this.customQueues[prefix];
  };

  getResultProduer = () => {
    if (this.result == null) this.result = this.createQueue(`${TASK}-${QUEUE}`);

    if (this.resultQueueScheduler == null)
      this.resultQueueScheduler = new QueueScheduler(`${RESULT}-${QUEUE}`);

    return this.result;
  };

  setResultWorker = (handler: Processor, opt?: WorkerOptions) => {
    if (this.resultWorker == null)
      this.resultWorker = new Worker(`${RESULT}-${QUEUE}`, handler, opt);
    return this.resultWorker;
  };

  subResultWorker = (
    callback: (id: string, type: string, data?: QueueListnerEvent) => void
  ) => {
    if (this.resultQueueEvents == null) {
      this.resultQueueEvents = new QueueEvents(`${RESULT}-${QUEUE}`);
    }

    this.registerQueueEvents(this.resultQueueEvents, callback);
  };

  shutdown = async () => {
    console.log('Factory shutting down queues and db connection...');

    const {
      scraper,
      scraperWorker,
      scraperQueueScheduler,
      task,
      taskWorker,
      taskQueueScheduler,
      test,
      customQueues,
    } = this;

    if (scraper) await scraper.close();
    if (scraperWorker) await scraperWorker.close();
    if (scraperQueueScheduler) await scraperQueueScheduler.close();

    if (task) await task.close();
    if (taskWorker) await taskWorker.close();
    if (taskQueueScheduler) await taskQueueScheduler.close();

    if (test) await test.close();

    Object.values(customQueues).forEach((cq) => {
      if (cq) cq.close();
    });

    this.prisma.$disconnect();

    console.log('Factory shut down complete!');
  };
}
