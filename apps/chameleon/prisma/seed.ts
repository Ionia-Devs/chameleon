import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const businessCardsData = Array.from({
    length: 100,
  }).map(() => ({
    autoId: faker.string.uuid(),
    name: faker.company.name(),
    directPhone: faker.phone.number(),
    email: faker.internet.email(),
    mainPhone: faker.phone.number(),
    mainFax: faker.phone.number(),
  }))

  console.log("Seeding...")

  // Use a transaction if you're inserting multiple records to ensure atomicity
  await prisma.businessCard.createMany({
    data: businessCardsData,
    skipDuplicates: true, // Skip if any duplicates are encountered
  })

  for (const cardData of businessCardsData) {
    await prisma.businessCard.create({
      data: cardData,
    })
  }

  console.log("Seeded business cards successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
