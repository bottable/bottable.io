import { getUserId } from '../utils';

import { shield, rule, deny } from 'graphql-shield';

const rules = {
  isAuthenticated: rule({ cache: 'contextual' })((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
};

export const permissions = shield({
  Query: {
    '*': deny,
    tracker: rules.isAuthenticated,
    trackers: rules.isAuthenticated,
    me: rules.isAuthenticated,
  },
  Mutation: {
    '*': deny,
    createTracker: rules.isAuthenticated,
  },
});
