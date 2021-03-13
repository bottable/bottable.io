import { Task } from '../task';

import { Processor } from 'bullmq';

import {
  notifyChannel,
  conversationIdMap,
} from '@bottable.io/api-wrapper/util-slack';

export class Slack extends Task {
  process: Processor = async (job) => {
    try {
      console.log('sending slack', job.name);
      const {
        data: { channel, message },
      } = job;
      if (channel in conversationIdMap) {
        return await notifyChannel(
          conversationIdMap[channel],
          `🧸 Bottable: ${message}`
        );
      }
    } catch (err) {
      throw new Error(`Slack ${err.message}`);
    }
  };
}
