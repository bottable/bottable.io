import { Processor } from 'bullmq';

export const scraper: Processor = async (job) => {
  console.log('🦑 scraper');
  console.log(job.data);
  return 'scrape';
};
