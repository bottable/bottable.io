import { getUserId } from './utils';

import { PrismaClient } from '@prisma/client';
import { QueueFactory } from '@bottable.io/queue';

const prisma = new PrismaClient();

const queueFactory = new QueueFactory();
export interface Context {
  prisma: PrismaClient;
  queueFactory: QueueFactory;
  request: any;
  user: any;
}

export async function createContext(ctx: Context) {
  const userId = getUserId(ctx);

  return {
    ...ctx,
    prisma,
    queueFactory,
    user: userId
      ? await prisma.user.findUnique({
          where: { id: Number(getUserId(ctx)) },
        })
      : null,
  };
}
