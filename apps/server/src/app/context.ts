import { getUserId } from './utils';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  request: any;
  user: any;
}

export async function createContext(ctx: Context) {
  const userId = getUserId(ctx);

  return {
    ...ctx,
    prisma,
    user: userId
      ? await prisma.user.findUnique({
          where: { id: Number(getUserId(ctx)) },
        })
      : null,
  };
}
