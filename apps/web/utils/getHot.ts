import { Tracker } from '../types';

export const getHot = (trackers: Tracker[]) => {
  const hot: {
    trackerName: string;
    categoryName: string;
    prevValue: string;
    newValue: string;
  }[] = [];

  trackers.forEach(({ name, selectors }) => {
    selectors.forEach(({ values }) => {
      if (values.length < 2) return;

      const lastValue = values[values.length - 1];
      const lastValueDate = new Date(lastValue.timestamp);
      const diffDays =
        (Date.now() - lastValueDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) {
        const lastLastValue = values[values.length - 2];
        hot.push({
          trackerName: name,
          categoryName: 'Category Name',
          prevValue: lastLastValue.value,
          newValue: lastValue.value,
        });
      }
    });
  });

  return hot;
};
