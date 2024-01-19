import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

export const edge = new PrismaClient().$extends(withAccelerate())
