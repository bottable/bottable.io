import { QueueSubscriberEventHandler } from '@bottable.io/queue';

export const handler: QueueSubscriberEventHandler = async () => {
  console.log('not registered');
};
