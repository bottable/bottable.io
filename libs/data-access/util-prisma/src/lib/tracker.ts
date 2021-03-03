import { Selector, Tracker as _Tracker } from '@prisma/client';

export type Tracker = _Tracker & {
  selectors: Selector[];
};

/**
 * @info translate tracker to queue job ID
 */
export const getTrackerKey = (tracker: Tracker): string =>
  `${tracker.name}-${tracker.id}`;
