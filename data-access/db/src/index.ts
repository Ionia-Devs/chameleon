import { Client } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  const client = new Client({ url: process.env.DATABASE_URL });
  const adapter = new PrismaPlanetScale(client);
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.cachedPrisma) {
    const client = new Client({ url: process.env.DATABASE_URL });
    const adapter = new PrismaPlanetScale(client);
    global.cachedPrisma = new PrismaClient({ adapter });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;

export * from '../prisma/generated/zod/';
