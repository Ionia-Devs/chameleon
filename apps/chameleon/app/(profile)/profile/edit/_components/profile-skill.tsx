'use client'

import { useOptimistic, useState } from 'react'
import { PhotographySkill, User } from '@prisma/client'

import { connectionSchema } from '@/lib/validations/action'
import { Toggle } from '@/components/ui/toggle'

import { handleConnectPhotographySkill } from '../actions'

interface ProfileSkillsProps {
  userId: User['id']
  isSelected: boolean
  photographySkill: Pick<PhotographySkill, 'name' | 'skillType'>
  formattedSkillName: string
}

export default function ProfileSkill({
  userId,
  isSelected,
  photographySkill,
  formattedSkillName,
}: ProfileSkillsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [optimisticIsSelected, addOptimisticIsSelected] = useOptimistic(
    isSelected,
    () => !isSelected
  )
  const toggleSkill = async () => {
    setIsLoading(true)
    addOptimisticIsSelected(isSelected)
    const action = optimisticIsSelected
      ? connectionSchema.Enum.disconnect
      : connectionSchema.Enum.connect
    await handleConnectPhotographySkill({
      action,
      photographySkill,
      userId,
    })
    setIsLoading(false)
  }
  return (
    <Toggle
      disabled={isLoading}
      pressed={optimisticIsSelected}
      onPressedChange={toggleSkill}
      className={`m-1 h-8 bg-accent hover:bg-primary/80 hover:text-secondary data-[state=on]:bg-primary data-[state=on]:text-secondary disabled:opacity-100`}
    >
      {formattedSkillName}
    </Toggle>
  )
}
