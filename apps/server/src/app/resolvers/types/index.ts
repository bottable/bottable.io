import { Context } from '../../context';

const fieldResolver = (root: string, child: string) => {
  return (parent, _, { prisma }: Context) => {
    return prisma[root].findUnique({ where: { id: parent.id } })[child]();
  };
};

const generateFieldResolvers = (root: string, children: string[]) => {
  const resolvers = {};

  children.forEach((child) => {
    resolvers[child] = fieldResolver(root, child);
  });

  return resolvers;
};

export default {
  AuthPayload: {
    user(parent, args, { prisma }: Context) {
      const { user } = parent || {};

      return user
        ? prisma.user.findUnique({
            where: {
              id: user.id,
            },
          })
        : null;
    },
  },
  Tracker: generateFieldResolvers('tracker', [
    'selectors',
    'user',
    'team',
    'tags',
  ]),
  Selector: generateFieldResolvers('selector', [
    'values',
    'tracker',
    'alertTrigger',
  ]),
  Value: generateFieldResolvers('value', ['selector']),
  AlertTrigger: generateFieldResolvers('alertTrigger', ['selectors']),
  Tag: generateFieldResolvers('tag', ['tracker']),
  User: generateFieldResolvers('user', ['trackers', 'memberships']),
  Membership: generateFieldResolvers('membership', ['user', 'team']),
  Team: generateFieldResolvers('team', ['trackers', 'memberships']),
};
