'use client'

import { useState } from 'react'
import { PhotographySkill, User } from '@prisma/client'

import { Toggle } from '@/components/ui/toggle'

import { handleConnectPhotographySkill } from '../actions'

interface ProfileSkillsProps {
  user: Pick<User, 'id'>
  isSelected: boolean
  photographySkill: Pick<PhotographySkill, 'name' | "skillType">
}

export default function ProfileSkill({
  user,
  isSelected,
  photographySkill,
}: ProfileSkillsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSelectedState, setIsSelectedState] = useState(isSelected)

  const toggleSpecialtySkill = async () => {
    setIsLoading(true)
    setIsSelectedState(!isSelectedState)
    await handleConnectPhotographySkill({
      isDisconected: isSelected,
      photographySkill: photographySkill,
      userId: user,
    })
    setIsLoading(false)
  }
  return (
    <Toggle
      disabled={isLoading}
      pressed={isSelectedState}
      onPressedChange={toggleSpecialtySkill}
      className={`m-1 h-8 bg-accent hover:bg-primary/80 hover:text-secondary data-[state=on]:bg-primary data-[state=on]:text-secondary disabled:bg-primary/80 disabled:text-secondary`}
    >
      {photographySkill.name}
    </Toggle>
  )
}
