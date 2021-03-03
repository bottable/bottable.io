/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueueFactory } from '@bottable.io/queue';

import { Job } from 'bullmq';

export abstract class Task {
  static factory: QueueFactory = new QueueFactory();

  static registered: { [key: string]: any };

  static register(payload) {
    this.registered = payload;
  }

  static has(type: string): boolean {
    return type in this.registered;
  }

  static get(type: string): Task {
    return new this.registered[type]();
  }

  // TODO: SOMEHOW ASSIGN THIS FUNCTION TO TPYE PROCESSOR
  abstract process(job: Job): Promise<any>;
}
