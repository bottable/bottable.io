import { Processor } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { QueueFactory, SLACK, TASK } from '@bottable.io/queue';
import {
  ScraperJobRequestData,
  ScraperJobResponseValue,
} from '@bottable.io/data-access/util-prisma';

const prisma = new PrismaClient();
const factory = new QueueFactory();
// send slack message
const task = factory.getQueue(TASK).getProducer();

export const processor: Processor = async (job) => {
  try {
    const { name, data, opts } = job;
    console.log('[🦄 Processor] got Job name: ', name);
    console.log('[🦄 Processor] got Job data: ', data);
    console.log('[🦄 Processor] got Job opts: ', opts);

    const scraperRequest: ScraperJobRequestData = data.scraperRequest;
    const scraperValues: ScraperJobResponseValue[] = data.scraperValues;

    scraperValues.forEach(async (selectorVal) => {
      const selector = selectorVal.selector;

      const prevValue = await prisma.value.findFirst({
        where: {
          selectorId: selector.id,
        },
        orderBy: {
          timestamp: 'desc',
        },
      });

      const newValue = await prisma.value.create({
        data: {
          selectorId: selector.id,
          timestamp: new Date(),
          value: selectorVal.values.join('\n'),
        },
      });

      await task.add(
        `${SLACK}-${scraperRequest.tracker.name}-${selector.name}-comparision`,
        {
          type: SLACK,
          channel: '#bottable',
          message: `Tracker: ${scraperRequest.tracker.name} \n Selector: ${
            selector.name
          } Same as prev value: ${newValue.value == prevValue.value} @ ${
            newValue.timestamp
          }`,
        }
      );
    });
    return true;
  } catch (error) {
    console.log('[🦄 Processor] error: ', error);
    throw new Error(error.message);
  }
};
