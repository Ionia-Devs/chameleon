import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.photographySkill.createMany({
    data: [
      {
        id: 1,
        name: 'NSFW',
        skillType: 'SPECIALTY',
      },
      {
        id: 2,
        name: 'NSFW',
        skillType: 'CURRENT_FOCUS',
      },
      {
        id: 3,
        name: 'STUDIO',
        skillType: 'SPECIALTY',
      },
      {
        id: 4,
        name: 'STUDIO',
        skillType: 'CURRENT_FOCUS',
      },
      {
        id: 5,
        name: 'OFF_SITE',
        skillType: 'SPECIALTY',
      },
      {
        id: 6,
        name: 'OFF_SITE',
        skillType: 'CURRENT_FOCUS',
      },
      {
        id: 7,
        name: 'EDITORIAL',
        skillType: 'SPECIALTY',
      },
      {
        id: 8,
        name: 'EDITORIAL',
        skillType: 'CURRENT_FOCUS',
      },
      {
        id: 9,
        name: 'COSPLAY',
        skillType: 'SPECIALTY',
      },
      {
        id: 10,
        name: 'COSPLAY',
        skillType: 'CURRENT_FOCUS',
      },
      {
        id: 11,
        name: 'FASHION',
        skillType: 'SPECIALTY',
      },
      {
        id: 12,
        name: 'FASHION',
        skillType: 'CURRENT_FOCUS',
      },
      {
        id: 13,
        name: 'PORTRAIT',
        skillType: 'SPECIALTY',
      },
      {
        id: 14,
        name: 'PORTRAIT',
        skillType: 'CURRENT_FOCUS',
      },
      {
        id: 15,
        name: 'EVENTS',
        skillType: 'SPECIALTY',
      },
      {
        id: 16,
        name: 'EVENTS',
        skillType: 'CURRENT_FOCUS',
      },
    ],
    skipDuplicates: true,
  });
  await prisma.photoShootType.createMany({
    data: [
      {
        name: 'PAID',
      },
      {
        name: 'COLLAB',
      },
      {
        name: 'CONVENTION',
      },
    ],
    skipDuplicates: true,
  });
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
