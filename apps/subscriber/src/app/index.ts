import { handler as scraperQueueEventHandler } from './scraper';

import {
  QueueSubscriberEventHandler,
  BottableQueueType,
} from '@bottable.io/queue';

export const queueEventHandlers: {
  [type in BottableQueueType]: QueueSubscriberEventHandler;
} = {
  scraper: scraperQueueEventHandler,
  task: null,
  processor: null,
};
