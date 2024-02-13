'use client'

import { useState } from 'react'
import type { PhotoShootType, User } from '@prisma/client'

import { actionSchema } from '@/lib/validations/action'
import { Toggle } from '@/components/ui/toggle'

import { handleConnectPhotoShootType } from '../actions'

interface PhotoShootTypeProps {
  isSelected: boolean
  photoShootType: PhotoShootType['name']
  formattedShootTypeName: string
  userId: User['id']
}

export default function ProfileShootType({
  isSelected,
  photoShootType,
  formattedShootTypeName,
  userId,
}: PhotoShootTypeProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState(isSelected)

  const toggleShootType = async () => {
    setIsLoading(true)
    setSelected(!selected)
    const action = selected
      ? actionSchema.Enum.disconnect
      : actionSchema.Enum.connect
    await handleConnectPhotoShootType({
      action,
      photoShootName: photoShootType,
      userId,
    })
    setIsLoading(false)
  }
  return (
    <Toggle
      disabled={isLoading}
      pressed={selected}
      onPressedChange={toggleShootType}
      className={
        'm-1 h-8 bg-accent hover:bg-primary/80 hover:text-secondary data-[state=on]:bg-primary data-[state=on]:text-secondary disabled:bg-primary disabled:opacity-80 disabled:text-secondary'
      }
    >
      {formattedShootTypeName}
    </Toggle>
  )
}
