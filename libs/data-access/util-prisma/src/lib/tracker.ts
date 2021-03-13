import { Selector, Tracker } from '@prisma/client';

export type TrackerWithSelector = Tracker & {
  selectors: Selector[];
};

export type ScraperData = {
  tracker: Tracker;
  selectors: Selector[];
};

export type TaskData = {
  type: 'Sync' | 'Ping';
};

/**
 * @info translate tracker to queue job ID
 */
export const getTrackerKey = (tracker: TrackerWithSelector | Tracker): string =>
  `${tracker.name}-${tracker.id}`;
