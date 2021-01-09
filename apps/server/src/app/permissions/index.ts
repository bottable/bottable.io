import { getUserId } from '../utils';

import { shield, rule } from 'graphql-shield';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
});
