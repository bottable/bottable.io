import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  request: any;
}

export function createContext(ctx: Context) {
  return { ...ctx, prisma };
}
