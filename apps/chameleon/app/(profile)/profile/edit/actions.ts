'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@chameleon/db'
import type {
  PhotoShootType,
  PhotographySkill,
  Portfolio,
  User,
} from '@prisma/client'
import { z } from 'zod'

import { type Connection } from '@/lib/validations/action'
import { userNameSchema } from '@/lib/validations/user'

export const formatEnumString = (enumString: string) => {
  const everyUnderscore = /_/g
  const everyWord = /\b\w/g
  const stringWithSpaces = enumString
    .replace(everyUnderscore, ' ')
    .toLowerCase()
  const capitalizedString = stringWithSpaces.replace(everyWord, (word) =>
    word.toUpperCase()
  )

  return capitalizedString
}

interface RemovePhotoProps {
  photoId: Portfolio['id']
}

export const removePhoto = async ({ photoId }: RemovePhotoProps) => {
  try {
    await db.portfolio.delete({
      where: {
        id: photoId,
      },
    })
    revalidatePath('/profile/edit')
  } catch (e) {
    console.error(e)
  }
}

interface UpdateDisplayNameProps {
  newName: z.infer<typeof userNameSchema>
  userId: User['id']
}

export const updateDisplayName = async ({
  newName,
  userId,
}: UpdateDisplayNameProps) => {
  const { name } = newName
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        name,
      },
    })

    revalidatePath('/profile/edit')
    return 'success'
  } catch (e) {
    console.error(e)
  }
}

interface HandlePhotoShootTypeProps {
  action: Connection
  photoShootTypeName: PhotoShootType['name']
  userId: User['id']
}

export const handleConnectPhotoShootType = async ({
  action,
  photoShootTypeName,
  userId,
}: HandlePhotoShootTypeProps) => {
  try {
    await db.photoShootType.update({
      where: {
        name: photoShootTypeName,
      },
      data: {
        UserProfile: {
          [action]: {
            userId,
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
  action: Connection
  photographySkill: Pick<PhotographySkill, 'name' | 'skillType'>
  userId: User['id']
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
              userId,
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
