import { Context } from '../../context';

const UserQueries = {
  me(_parent: unknown, _args: unknown, ctx: Context) {
    return ctx.user;
  },
  user(_parent: unknown, { id }: unknown, { prisma }: Context) {
    return prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  async users(_parent: unknown, _args: unknown, { prisma }: Context) {
    return prisma.user.findMany();
  },
};

export default UserQueries;
