'use client'

import { useState } from 'react'
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
  const [selected, setSelected] = useState(isSelected)
  const toggleSkill = async () => {
    setIsLoading(true)
    setSelected(!selected)
    const action = selected
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
      pressed={selected}
      onPressedChange={toggleSkill}
      className={`m-1 h-8 bg-accent hover:bg-primary/80 hover:text-secondary data-[state=on]:bg-primary data-[state=on]:text-secondary disabled:bg-primary/80 disabled:text-secondary`}
    >
      {formattedSkillName}
    </Toggle>
  )
}
