'use server'
import { revalidatePath } from 'next/cache'
import { db } from '@chameleon/db'
import type {
  PhotoShootType,
  PhotographySkill,
  Portfolio,
  User,
} from '@prisma/client'

import { type Action } from '@/lib/validations/action'

export const formatEnumString = (inputString: string) => {
  const stringWithSpaces = inputString.replace(/_/g, ' ').toLowerCase()
  const capitalizedString = stringWithSpaces.replace(/\b\w/g, (word) =>
    word.toUpperCase()
  )

  return capitalizedString
}

interface HandleRemovePhotoProps {
  image: Pick<Portfolio, 'id'>
}

export const handleRemovePhoto = async ({ image }: HandleRemovePhotoProps) => {
  try {
    await db.portfolio.delete({
      where: {
        id: image.id,
      },
    })
    revalidatePath('/profile/edit')
  } catch (e) {
    console.error(e)
  }
}

interface handleUpdateDisplayNameProps {
  newName: string
  user: Pick<User, 'id'>
}

export const handleUpdateDisplayName = async ({
  newName,
  user,
}: handleUpdateDisplayNameProps) => {
  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        name: newName,
      },
    })
    
    revalidatePath('/profile/edit')
    return "success"
  } catch (e) {
    console.error(e)
  }
}

interface HandlePhotoShootTypeProps {
  action: Action
  photoShootName: Pick<PhotoShootType, 'name'>
  userId: Pick<User, 'id'>
}

export const handleConnectPhotoShootType = async ({
  action,
  photoShootName,
  userId,
}: HandlePhotoShootTypeProps) => {
  try {
    await db.photoShootType.update({
      where: {
        name: photoShootName.name,
      },
      data: {
        UserProfile: {
          [action]: {
            userId: userId.id,
          },
        },
      },
    })
    revalidatePath('/profile/edit')
  } catch (e) {
    console.error(e)
  }
}

interface HandlePhotographySkillProps {
  action: Action
  photographySkill: Pick<PhotographySkill, 'name' | 'skillType'>
  userId: Pick<User, 'id'>
}

export const handleConnectPhotographySkill = async ({
  action,
  photographySkill,
  userId,
}: HandlePhotographySkillProps) => {
  try {
    const selectedSkill = await db.photographySkill.findFirst({
      where: {
        skillType: photographySkill.skillType,
        name: photographySkill.name,
      },
    })
    if (selectedSkill !== null) {
      await db.photographySkill.update({
        where: {
          id: selectedSkill.id,
        },
        data: {
          UserProfile: {
            [action]: {
              userId: userId.id,
            },
          },
        },
      })
    }
    revalidatePath('/profile/edit')
  } catch (e) {
    console.error(e)
  }
}
