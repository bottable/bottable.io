import React, { useState } from 'react';

export type Tracker = {
  name?: string;
  tags?: string[];
  selectors: Selector[];
  notificationMethods?: NotificationMethods[];
  updateFrequency?: string;
  notifyAnyway?: boolean;
};

export type Selector = {
  id: string;
  location: string;
  values: Value[];
  preview: string;
  category: string;
  alertTrigger: AlertTrigger;
};

export type NotificationMethods = 'AUDIO' | 'POPUP' | 'EMAIL';

export type Value = {
  timestamp: Date;
  value: string;
};

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

type TrackerContextProps = {
  name: string;
  tags: string[];
  selectors: Selector[];
  notificationMethods: NotificationMethods[];
  updateFrequency: string;
  notifyAnyway: boolean;
  setName: (name: string) => void;
  setTags: (tags: string[]) => void;
  addSelector: (selector: Selector) => void;
  removeSelector: (id: string) => void;
  editSelector: (
    id: string,
    update: { alertTrigger?: AlertTrigger; category?: string }
  ) => void;
  setNotificationMethods: (notificationMethods: NotificationMethods[]) => void;
  setUpdateFrequency: (freq: number, mode: string) => void;
  setNotifyAnyway: (notifyAnyway: boolean) => void;
};

export const TrackerContext = React.createContext<Partial<TrackerContextProps>>(
  {}
);

const TrackerContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [name, setName] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectors, setSelectors] = useState<Selector[]>([]);
  const [notificationMethods, setNotificationMethods] = useState<
    NotificationMethods[]
  >([]);
  const [updateFrequency, setUpdateFrequencyState] = useState<string>(
    '0 */1 * * *'
  );
  const [notifyAnyway, setNotifyAnyway] = useState<boolean>(false);

  const addSelector = (selector: Selector) =>
    setSelectors((prevSelectors) => [...prevSelectors, selector]);

  const removeSelector = (id: string) =>
    setSelectors((prevSelectors) => prevSelectors.filter((s) => s.id !== id));

  const editSelector = (
    id: string,
    update: { alertTrigger?: AlertTrigger; category?: string }
  ) =>
    setSelectors((prevSelectors) => {
      const newSelectors = [...prevSelectors];
      const idx = newSelectors.findIndex((s) => s.id === id);
      newSelectors[idx] = { ...newSelectors[idx], ...update };

      return newSelectors;
    });

  const setUpdateFrequency = (freq: number, mode: string) => {
    switch (mode) {
      case 'hourly':
        setUpdateFrequencyState(`0 */${freq} * * *`);
        break;
      case 'daily':
        setUpdateFrequencyState(`0 0 */${freq} * *`);
        break;
      case 'weekly':
        setUpdateFrequencyState(`0 0 */${freq * 7} * *`);
        break;
    }
  };

  return (
    <TrackerContext.Provider
      value={{
        name,
        tags,
        selectors,
        notificationMethods,
        updateFrequency,
        notifyAnyway,
        setName,
        setTags,
        addSelector,
        removeSelector,
        editSelector,
        setNotificationMethods,
        setUpdateFrequency,
        setNotifyAnyway,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export { TrackerContextProvider };
