export type User = {
  firstName: string;
  lastName: string;
  trackers: Tracker[];
};

export type Tracker = {
  id: string;
  selectors: Selector[];
  notificationMethods: NotificationMethods[];
  tags: Tag[];
  description: string;
  name: string;
  notifyAnyway: boolean;
  pinned: boolean;
  updateFrequency: string;
  url: string;
};

export type Selector = {
  id: string;
  name: string;
  type: 'number' | 'string';
  values: Value[];
  alertTrigger: AlertTrigger;
};

export type Value = { timestamp: string; value: string };

export type AlertTrigger = {
  type:
    | 'CHANGE'
    | 'INCREASE'
    | 'DECREASE'
    | 'GREATER_THAN'
    | 'LESS_THAN'
    | 'CONTAIN';
  payload?: string;
};

export type Tag = {
  name: string;
  color: string;
};

export type NotificationMethods = 'EMAIL' | 'SMS';
