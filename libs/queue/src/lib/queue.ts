/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueueOptions, Job, Queue as BullQueue, JobsOptions } from 'bullmq';
import { PrismaClient } from '@prisma/client';

import {
  TrackerWithSelector,
  TaskData,
  ScraperJobRequestData,
  getTrackerKey,
} from '@bottable.io/data-access/util-prisma';

type ReapeatableJob = {
  key: string;
  name: string;
  id: string;
  endDate: number;
  tz: string;
  cron: string;
  next: number;
};

type ReapeatableJobOptions = {
  name: string;
  data: ScraperJobRequestData | TaskData;
  opts?: JobsOptions;
};

const isValidJobOption = (jobOption: JobsOptions) => {
  if (!('repeat' in jobOption)) return true;
  try {
    const { repeat } = jobOption;
    return !isNaN(
      Math.floor(Date.now() / repeat.every) * repeat.every + repeat.every
    );
  } catch (e) {
    console.log('isValidReapeatableJobOptions', e.message);
    return false;
  }
};

export class Queue extends BullQueue {
  prisma: PrismaClient;

  constructor(queueName: string, opts?: QueueOptions, prisma?: PrismaClient) {
    super(queueName, opts);
    this.prisma = prisma || new PrismaClient();
  }

  /**
   * @info ensure scheduled jobs and database records integrity
   *
   * Job name & jobID: tracker's [name]-[id]
   *
   * Job data: Selector
   *
   * Job opts: Track's every updateFrequency in millisecond
   *
   * @returns Promise<null = success & string = error>
   */
  async syncRepeatableJobs() {
    console.log('💫 [syncRepeatableJobs] starting');
    try {
      const trackers = await this.prisma.tracker.findMany({
        include: { selectors: true },
      });

      console.log(`Got ${trackers.length} trackers`);
      console.log(trackers);

      const jobs = await this.getRepeatableJobs();

      console.log(`Got ${jobs.length} jobs`);
      console.log(jobs);

      console.log('🍽  Starting to remove extra jobs...');
      // Remove extra scheduled jobs from queue
      const to_remove = jobs.map(async (job) => {
        const tracker = trackers.find(
          (tracker) => job.id === getTrackerKey(tracker)
        );
        return tracker ? null : this.removeRepeatableJob(job);
      });

      await Promise.all(to_remove);
      console.log('🍝 Remove done!');

      console.log('🍽  Starting to schedule missing tracker...');
      // Schedule missing trackers into queue
      const to_scheduled = trackers.map(async (tracker) => {
        const scheduledJob = jobs.find(
          (job) => job.id === getTrackerKey(tracker)
        );
        return scheduledJob &&
          scheduledJob.cron === tracker.updateFrequency.toString()
          ? null
          : // outdated scheduled job will be removed here
            this.scheduleTracker(tracker);
      });

      await Promise.all(to_scheduled);
      console.log('🍝 Schedule done!');
      console.log('🌟 [syncRepeatableJobs] done');
      return null;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /**
   * @info safely schedule a repeatable job for trackers
   * @argument Tracker
   * @returns Promise<Job>
   */
  async scheduleTracker(tracker: TrackerWithSelector): Promise<Job> {
    const repeatableTrackeroptions: ReapeatableJobOptions = {
      name: getTrackerKey(tracker),
      data: {
        tracker: tracker,
        selectors: tracker.selectors,
      },
      opts: {
        jobId: getTrackerKey(tracker),
        repeat: {
          every: parseInt('' + tracker.updateFrequency),
        },
      },
    };
    return this.schedule(repeatableTrackeroptions);
  }

  /**
   * @info ensure uniqness of the scheduled job by job ID
   * @argument ReapeatableJobOptions
   * @returns Promise<Job>
   */
  async schedule(repeatableOpts: ReapeatableJobOptions): Promise<Job> {
    const { name, data, opts } = repeatableOpts;
    const { jobId } = opts;

    if (!isValidJobOption(opts)) {
      console.log(
        `🗿 Invalid job option ${JSON.stringify(
          opts
        )}. Falling back to 2024-02-29 05:00:00`
      );
      // overwrite with 2024-02-29 05:00:00
      opts.repeat.cron = '0 5 29 2 *';
      // repeat opts can only allow either cron or every
      delete opts.repeat.every;
    }

    const existing_repeatable_job = await this.getRepeatableJobByJobId(jobId);
    if (existing_repeatable_job) {
      console.log(
        `🗿 Duplicate ${jobId}! Removing ${existing_repeatable_job.key}`
      );
      await this.removeRepeatableJob(existing_repeatable_job);
    }

    try {
      console.log('🗿 Scheduling jobs with options: ', repeatableOpts);
      return await this.add(name, data, opts);
    } catch (e) {
      throw new Error('Failed to schedule: ' + e.message);
    }
  }

  /**
   * @info get repeatable job based on JobID
   * @argument jobId typically job.opts.jobId, repeatableJob.id, or getTrackerKey()
   * @returns Promise<ReapeatableJob>
   */
  async getRepeatableJobByJobId(jobId: string): Promise<ReapeatableJob> {
    const jobs = await this.getRepeatableJobs();
    return jobs.find((job) => job.id === jobId);
  }

  /**
   * @info remove corresponding deplayed (already scheduled) jobs and repeatable job
   * @usedBy schedule, syncRepeatableJobs
   * @argument job type ReapeatableJob
   * @returns Promise
   */
  async removeRepeatableJob(job: ReapeatableJob) {
    console.log('🗿 removeRepeatableJob', job);
    await this.removeDelayedByJobId(job.id);
    await this.removeRepeatableByKey(job.key);
  }

  /**
   * @info remove repeatable job by job ID
   * @usedBy removeRepeatableJob
   * @argument jobId typically job.opts.jobId, repeatableJob.id, or getTrackerKey()
   * @returns Promise
   */
  async removeRepeatableJobById(jobId: string): Promise<void> {
    const jobs = await this.getRepeatableJobs();
    const job = jobs.filter((job) => job.id === jobId);
    if (job && job[0]) await this.removeRepeatableJob(job[0]);
  }

  /**
   * @info remove deplayed (already scheduled) jobs
   * @usedBy removeRepeatableJob
   * @argument jobId typically job.opts.jobId, repeatableJob.id, or getTrackerKey()
   * @returns Promise
   */
  async removeDelayedByJobId(jobId: string) {
    const delayed = await this.getDelayed();
    const to_remove = delayed.map((delayed_job) => {
      try {
        return delayed_job.opts.repeat.jobId === jobId
          ? delayed_job.remove()
          : null;
      } catch (e) {
        console.log(e.message);
      }
    });
    await Promise.all(to_remove);
  }

  async flush() {
    const repeatableJobs = await this.getRepeatableJobs();
    repeatableJobs.forEach(async (job) => {
      await this.removeRepeatableByKey(job.key);
    });
  }

  async reset() {
    this.drain(false);
    await this.clean(0, 0, 'delayed');
    await this.clean(0, 0, 'wait');
    await this.clean(0, 0, 'active');
    await this.clean(0, 0, 'completed');
    await this.clean(0, 0, 'failed');
    // TODO: remove all repeatable jobs
    // const multi = this.multi();
    // multi.del(this.toKey('repeat'));
    // multi.exec();
  }

  ping() {
    console.log(`PONG @ ${this.name}`);
    return 'pong';
  }
}
