import { Context } from '../../context';

const TrackerMutation = {
  async createTracker(_, { input }, { prisma, user }: Context) {
    const {
      name,
      selectors,
      url,
      teamId,
      tags,
      description,
      updateFrequency,
      ...others
    } = input;

    // TODO: not use duplicated alertTriggers
    const mappedSelectors = selectors.map(
      ({ alertTrigger: { type, payload }, ...others }) => {
        return {
          ...others,
          alertTrigger: {
            create: {
              type,
              ...(payload ? { payload } : {}),
            },
          },
        };
      }
    );

    const newTracker = await prisma.tracker.create({
      data: {
        name,
        description,
        updateFrequency,
        url,
        selectors: {
          create: mappedSelectors,
        },
        tags: {
          create: tags,
        },
        ...(teamId
          ? { teamId }
          : {
              userId: user.id,
            }),
        ...others,
      },
    });

    console.log(newTracker);

    return newTracker;
  },
};

export default TrackerMutation;
