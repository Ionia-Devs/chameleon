"use server"
import { revalidatePath } from 'next/cache'
import { db } from '@chameleon/db'
import { PhotoShootType, PhotographySkill, User, Portfolio } from '@prisma/client'

export const formatEnumString = (inputString:string) => {
  // Replace underscores with spaces and lowercase | note: /_/g takes EVERY instance of _ in a string not just the first
  const stringWithSpaces = inputString.replace(/_/g, ' ').toLowerCase();

  //                                          | note: /\b\w/g means to select every single word in a string
  // Capitalize the first letter of each word | aka "off site" becomes "off".toUpperCase() + " " + "site".toUpperCase() === "Off Site"
  const formattedString = stringWithSpaces.replace(/\b\w/g, (word) => word.toUpperCase());

  return formattedString;
}

interface HandleRemovePhotoProps {
  image: Pick<Portfolio, "id">
}

export const handleRemovePhoto = async ({image}: HandleRemovePhotoProps) => {
  await db.portfolio.delete({
    where: {
      id: image.id
    }
  })
  revalidatePath('/profile/edit')
}

interface handleUpdateDisplayNameProps {
  newName: string
  user: Pick<User, "id">
}

export const handleUpdateDisplayName = async ({newName, user}: handleUpdateDisplayNameProps) => {
  await db.user.update({
    where: { id: user.id },
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
