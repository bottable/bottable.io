import { Context } from '../../context';

const TrackerQueries = {
  tracker(_parent: unknown, { id }: unknown, { prisma }: Context) {
    return prisma.tracker.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  trackers(_parent: unknown, _args: unknown, { prisma }: Context) {
    return prisma.tracker.findMany();
  },
};

export default TrackerQueries;
