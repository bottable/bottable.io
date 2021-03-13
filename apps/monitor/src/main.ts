import express from 'express';

import { QueueFactory } from '@bottable.io/queue';

import { setQueues, BullMQAdapter, router } from 'bull-board';

const app = express();

const factory = new QueueFactory();

// FIXME: wait for bullmq types to update
setQueues([
  new BullMQAdapter(factory.getScraperProducer(), { readOnlyMode: false }),
  new BullMQAdapter(factory.getTaskProducer(), { readOnlyMode: false }),
  new BullMQAdapter(factory.getProcessorProducer(), { readOnlyMode: false }),
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
