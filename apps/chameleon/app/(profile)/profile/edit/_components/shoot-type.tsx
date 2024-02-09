'use client'

import { useState } from 'react'
import { PhotoShootType, User } from '@prisma/client'

import { Toggle } from '@/components/ui/toggle'

import { handleConnectPhotoShootType } from '../actions'

interface PhotoShootTypeProps {
  isSelected: boolean
  photoShootType: Pick<PhotoShootType, 'name'>
  user: Pick<User, 'id'>
}

export default function ProfileShootType({
  isSelected,
  photoShootType,
  user,
}: PhotoShootTypeProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSelectedState, setIsSelectedState] = useState(isSelected)

  const toggleSpecialtySkill = async () => {
    setIsLoading(true)
    setIsSelectedState(!isSelectedState)
    await handleConnectPhotoShootType({
      isDisconected: isSelected,
      photoShootName: photoShootType,
      userId: user,
    })
    setIsLoading(false)
  }
  return (
    <Toggle
      disabled={isLoading}
      pressed={isSelectedState}
      onPressedChange={toggleSpecialtySkill}
      className={`m-1 h-8 bg-accent hover:bg-primary/80 hover:text-secondary data-[state=on]:bg-primary data-[state=on]:text-secondary disabled:bg-primary disabled:opacity-80 disabled:text-secondary`}
    >
      {photoShootType.name}
    </Toggle>
  )
}
