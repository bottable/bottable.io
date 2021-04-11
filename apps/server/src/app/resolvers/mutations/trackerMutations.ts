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

    return newTracker;
  },
  async editTracker(_, { input }, { prisma, user }: Context) {
    const {
      id,
      name,
      selectors,
      url,
      tags,
      description,
      updateFrequency,
      ...others
    } = input;

    // TODO: not use duplicated alertTriggers
    const mappedSelectors = selectors
      ? selectors.map(({ alertTrigger: { type, payload }, ...others }) => {
          return {
            ...others,
            alertTrigger: {
              create: {
                type,
                ...(payload ? { payload } : {}),
              },
            },
          };
        })
      : undefined;

    const editData = {
      name,
      description,
      updateFrequency,
      url,
      selectors: mappedSelectors
        ? {
            update: mappedSelectors,
          }
        : undefined,
      tags: tags
        ? {
            update: tags,
          }
        : undefined,
      ...others,
    };

    Object.keys(editData).forEach((key) => {
      if (editData[key] === undefined) delete editData[key];
    });

    const newTracker = await prisma.tracker.update({
      where: { id: parseInt(id, 10) },
      data: editData,
    });

    return newTracker;
  },
};

export default TrackerMutation;
