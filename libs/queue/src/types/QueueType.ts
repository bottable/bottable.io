export const TASK = 'task';
export const SCRAPER = 'scraper';
export const PROCESSOR = 'processor';
export const WORKER = 'worker';

export const COMPLETED = 'completed';
export const STALLED = 'stalled';
export const FAILED = 'failed';

// Deprecated
export const CONSUMER = 'consumer';
export const SUBSCRIBER = 'subscriber';
export const BCLIENT = 'bclient';

export const CLIENT = 'client';
export const PRODUCER = 'producer';

export type QueueEventsType = typeof COMPLETED | typeof STALLED | typeof FAILED;
