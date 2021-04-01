import { Task } from './registry';

import { Processor } from 'bullmq';

export const background: Processor = async (job) => {
  try {
    console.log('🧘‍[TASK]:', job.data);
    const { type } = job.data;

    if (!Task.has(type)) throw new Error(`Type: ${type} is not registered`);

    const jobOutput = await Task.get(type).process(job);
    job.updateProgress(100);
    return jobOutput;
  } catch (error) {
    console.log('🧘‍[TASK] ERROR: ', error.message);
    const errorPaylod = { message: error.message, job };
    throw new Error(JSON.stringify(errorPaylod));
  }
};
