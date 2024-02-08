"use server"
import { revalidatePath } from 'next/cache'
import { db } from '@chameleon/db'
import { PhotoShootType, PhotographySkill, User } from '@prisma/client'

export const handleUpdateDisplayName = async (newName: string, userId: string) => {
  await db.user.update({
    where: { id: userId },
    data: {
      name: newName,
    },
  })
  revalidatePath('/profile/edit')
}

interface HandlePhotoShootTypeProps {
  isDisconected: boolean
  photoShootName: Pick<PhotoShootType, 'name'>
  userId: Pick<User, 'id'>
}

export const handleConnectPhotoShootType = async ({
  isDisconected,
  photoShootName,
  userId
}: HandlePhotoShootTypeProps) => {
  if (isDisconected === true) {
    await db.photoShootType.update({
      where: {
        name: photoShootName.name,
      },
      data: {
        UserProfile: {
          disconnect: {
            userId: userId.id,
          },
        },
      },
    })
  }
  if (isDisconected === false) {
    await db.photoShootType.update({
      where: {
        name: photoShootName.name,
      },
      data: {
        UserProfile: {
          connect: {
            userId: userId.id,
          },
        },
      },
    })
  }
  revalidatePath('/profile/edit')
}

interface HandlePhotographySkillProps {
  isDisconected: boolean
  photographySkill: Pick<PhotographySkill, 'name' | "skillType">
  userId: Pick<User, 'id'>
}

export const handleConnectPhotographySkill = async ({
  isDisconected,
  photographySkill,
  userId,
}: HandlePhotographySkillProps) => {
  const selectedSkill = await db.photographySkill.findFirst({
    where: {
      skillType: photographySkill.skillType,
      name: photographySkill.name,
    },
  })
  if (isDisconected === true && selectedSkill !== null) {
    await db.photographySkill.update({
      where: {
        id: selectedSkill.id,
      },
      data: {
        UserProfile: {
          disconnect: {
            userId: userId.id,
          },
        },
      },
    })
  }
  if (isDisconected === false && selectedSkill !== null) {
    await db.photographySkill.update({
      where: {
        id: selectedSkill.id,
      },
      data: {
        UserProfile: {
          connect: {
            userId: userId.id,
          },
        },
      },
    })
  }
  revalidatePath('/profile/edit')
}
