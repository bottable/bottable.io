import { Processor } from 'bullmq';
// import { ScraperJobRequestData } from '@bottable.io/data-access/util-prisma';
// import { Selector } from '@prisma/client';

export const processor: Processor = async (job) => {
  try {
    const { name, data, opts } = job;
    console.log('[🦄 Processor] got Job name: ', name);
    console.log('[🦄 Processor] got Job data: ', data);
    console.log('[🦄 Processor] got Job opts: ', opts);
    return true;
  } catch (error) {
    console.log('[🦄 Processor] error: ', error);
    throw new Error(error.message);
  }
};
