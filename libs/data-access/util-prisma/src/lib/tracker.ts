import { Selector, Tracker } from '@prisma/client';

export type TrackerWithSelector = Tracker & {
  selectors: Selector[];
};

export type ScraperJobRequestData = {
  tracker: Tracker;
  selectors: Selector[];
};

export type ScraperJobResponseValue = { selector: Selector; values: string[] };

export type TaskData = {
  type: 'Sync' | 'Ping';
};

/**
 * @info translate tracker to queue job ID
 */
export const getTrackerKey = (tracker: TrackerWithSelector | Tracker): string =>
  `${tracker.name}-${tracker.id}`;
