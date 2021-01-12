import { getUserId } from './utils';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  request: any;
  user: any;
}

export async function createContext(ctx: Context) {
  return {
    ...ctx,
    prisma,
    user: await prisma.user.findUnique({
      where: { id: Number(getUserId(ctx)) },
    }),
  };
}
