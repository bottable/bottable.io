import { Context } from '../../context';
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
};
