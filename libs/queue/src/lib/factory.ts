import { Queue } from './queue';

import {
  COMPLETED,
  STALLED,
  FAILED,
  QueueEventsType,
  BottableQueueType,
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
  ScraperJobRequestData,
  ScraperJobResponseValue,
} from '@bottable.io/data-access/util-prisma';
const { QUEUE } = process.env;

export type ScraperJobResponseData = {
  opts: JobsOptions;
  scraperRequest: ScraperJobRequestData;
  scraperValues: ScraperJobResponseValue[];
};

export type QueueListnerEvent = {
  jobId: string;
  data: ScraperJobResponseData | string;
  failedReason?: string;
  returnvalue?: string;
  prev?: string;
};

export type QueueSubscriberEventHandler = (
  id: string,
  type: QueueEventsType,
  data?: QueueListnerEvent
) => void;

export type QueueEventSubscriber = (
  handler: QueueSubscriberEventHandler
) => void;

type Queues = {
  [key in BottableQueueType]: QueueWrapper;
};

interface QueueFeatures {
  producer: Queue;
  worker: Worker;
  event: QueueEvents;
  scheduler: QueueScheduler;
}
export class QueueWrapper implements QueueFeatures {
  prisma: PrismaClient;

  // queue features
  producer: Queue = null;
  worker: Worker = null;
  event: QueueEvents = null;
  scheduler: QueueScheduler = null;

  // queue name
  name = 'default';

  constructor(type: BottableQueueType, prisma: PrismaClient) {
    this.prisma = prisma;
    this.name = `${type}-${QUEUE}`;
  }

  getProducer = () => {
    if (this.producer == null) this.producer = this.createQueue(this.name);

    if (this.scheduler == null) this.scheduler = new QueueScheduler(this.name);

    return this.producer;
  };

  setWorker = (handler: Processor, opt?: WorkerOptions) => {
    if (this.worker == null) this.worker = new Worker(this.name, handler, opt);

    return this.worker;
  };

  subWorker: (handler: QueueSubscriberEventHandler) => void = (handler) => {
    if (this.event == null) this.event = new QueueEvents(this.name);

    this.registerQueueEvents(this.event, handler);
  };

  shutdown = async () => {
    const { producer, scheduler, event, worker } = this;
    if (producer) await producer.close();
    if (scheduler) await scheduler.close();
    if (event) await event.close();
    if (worker) await worker.close();
  };

  /**
   *
   * @param queueEvent
   * @param handler
   * @returns void
   */
  private registerQueueEvents = (
    queueEvent: QueueEvents,
    handler: QueueSubscriberEventHandler
  ) => {
    queueEvent.on(COMPLETED, (listnerEvent: QueueListnerEvent, id) => {
      if (listnerEvent.returnvalue) {
        try {
          listnerEvent.data = JSON.parse(listnerEvent.returnvalue);
        } catch (e) {
          listnerEvent.data = listnerEvent.returnvalue;
        }
      }
      handler(id, COMPLETED, listnerEvent);
    });

    queueEvent.on(STALLED, (listnerEvent: QueueListnerEvent, id) => {
      handler(id, STALLED, listnerEvent);
    });

    queueEvent.on(FAILED, (listnerEvent: QueueListnerEvent, id) => {
      if (listnerEvent.failedReason) {
        try {
          listnerEvent.data = JSON.parse(listnerEvent.failedReason);
        } catch (e) {
          listnerEvent.data = listnerEvent.failedReason;
        }
      }
      handler(id, FAILED, listnerEvent);
    });
  };

  /**
   *
   * @param name
   * @returns Queue
   */
  private createQueue = (name: string): Queue => {
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
}
export class QueueFactory {
  prisma: PrismaClient;

  queues: Queues = {
    scraper: null,
    processor: null,
    task: null,
  };

  constructor() {
    this.prisma = new PrismaClient();
  }

  getQueue = (type: BottableQueueType) => {
    if (!(type in this.queues)) {
      throw new Error(`type ${type} is not defined in BottableQueueType`);
    }

    if (this.queues[type] == null)
      this.queues[type] = new QueueWrapper(type, this.prisma);

    return this.queues[type];
  };

  shutdown = async () => {
    console.log('Factory shutting down queues and db connection...');

    const { queues, prisma } = this;

    for (const type in queues) {
      await queues[type].shutdown();
    }

    await prisma.$disconnect();

    console.log('Factory shut down complete!');
  };
}
