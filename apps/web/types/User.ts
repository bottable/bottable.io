export type User = {
  firstName: string;
  lastName: string;
  trackers: Tracker[];
};

type Tracker = {
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

type Selector = {
  values: Value[];
};

type Value = { timestamp: string; value: string };

type Tag = {
  name: string;
  color: string;
};

type NotificationMethods = 'EMAIL' | 'SMS';
