import { Context } from '../../context';
import { getUserId } from '../../utils';

const UserQueries = {
  me(_parent: unknown, _args: unknown, ctx: Context) {
    const userId = getUserId(ctx);

    return ctx.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
  },
  user(_parent: unknown, { id }: unknown, { prisma }: Context) {
    return prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  users(_parent: unknown, _args: unknown, { prisma }: Context) {
    return prisma.user.findMany();
  },
};

export default UserQueries;
