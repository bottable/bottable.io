import { Queue } from './queue';

import {
  SCRAPER,
  TASK,
  PROCESSOR,
  COMPLETED,
  STALLED,
  FAILED,
  QueueEventsType,
} from '../types';

import { PrismaClient } from '@prisma/client';

import {
  Processor,
  Worker,
  WorkerOptions,
  QueueEvents,
  QueueScheduler,
  JobsOptions,
} from 'bullmq';
import { options } from '@bottable.io/data-access/util-redis';
import {
  ScraperData,
  ScraperSelectorValues,
} from '@bottable.io/data-access/util-prisma';
const { QUEUE } = process.env;

export type QueueListnerEventData = {
  opts: JobsOptions;
  scraperData: ScraperData;
  values: ScraperSelectorValues[];
};

export type QueueListnerEvent = {
  jobId: string;
  data: QueueListnerEventData | string;
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

  processor: Queue = null;
  processorWorker: Worker = null;
  processorQueueEvents: QueueEvents = null;
  processorQueueScheduler: QueueScheduler = null;

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

  getScraperProducer = () => {
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
    callback: (
      id: string,
      type: QueueEventsType,
      data?: QueueListnerEvent
    ) => void
  ) => {
    if (this.scraperQueueEvents == null) {
      this.scraperQueueEvents = new QueueEvents(`${SCRAPER}-${QUEUE}`);
    }

    this.registerQueueEvents(this.scraperQueueEvents, callback);
  };

  getTaskProducer = () => {
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
    callback: (
      id: string,
      type: QueueEventsType,
      data?: QueueListnerEvent
    ) => void
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
    callback: (
      id: string,
      type: QueueEventsType,
      data?: QueueListnerEvent
    ) => void
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

  getProcessorProducer = () => {
    if (this.processor == null)
      this.processor = this.createQueue(`${PROCESSOR}-${QUEUE}`);

    if (this.processorQueueScheduler == null)
      this.processorQueueScheduler = new QueueScheduler(
        `${PROCESSOR}-${QUEUE}`
      );

    return this.processor;
  };

  setProcessorWorker = (handler: Processor, opt?: WorkerOptions) => {
    if (this.processorWorker == null)
      this.processorWorker = new Worker(`${PROCESSOR}-${QUEUE}`, handler, opt);
    return this.processorWorker;
  };

  subProcessorWorker = (
    callback: (
      id: string,
      type: QueueEventsType,
      data?: QueueListnerEvent
    ) => void
  ) => {
    if (this.processorQueueEvents == null) {
      this.processorQueueEvents = new QueueEvents(`${PROCESSOR}-${QUEUE}`);
    }

    this.registerQueueEvents(this.processorQueueEvents, callback);
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
