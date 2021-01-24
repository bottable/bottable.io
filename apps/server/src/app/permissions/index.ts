import { getUserId } from '../utils';

import { shield, rule, allow, deny } from 'graphql-shield';

const rules = {
  isAuthenticatedUser: rule({ cache: 'contextual' })(
    (parent, args, context) => {
      const userId = getUserId(context);
      return Boolean(userId);
    }
  ),
};

export const permissions = shield({
  Query: {
    '*': allow,
    me: rules.isAuthenticatedUser,
  },
  Mutation: {
    '*': deny,
    createTracker: rules.isAuthenticatedUser,
  },
});
