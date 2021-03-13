import express from 'express';

import { PROCESSOR, QueueFactory, SCRAPER, TASK } from '@bottable.io/queue';

import { setQueues, BullMQAdapter, router } from 'bull-board';

const app = express();

const factory = new QueueFactory();

// FIXME: wait for bullmq types to update
setQueues([
  new BullMQAdapter(factory.getQueue(SCRAPER).getProducer(), {
    readOnlyMode: false,
  }),
  new BullMQAdapter(factory.getQueue(TASK).getProducer(), {
    readOnlyMode: false,
  }),
  new BullMQAdapter(factory.getQueue(PROCESSOR).getProducer(), {
    readOnlyMode: false,
  }),
]);

app.use('/admin/queues', router);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to monitor!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/admin/queues`);
});
server.on('error', console.error);
