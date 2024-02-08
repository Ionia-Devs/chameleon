'use client'

import { useState } from 'react'
import { PhotographySkill, User } from '@prisma/client'

import { Toggle } from '@/components/ui/toggle'

import { handleConnectSpecialtySkill } from '../page'

interface ProfileSpecialtySkillProps {
  user: Pick<User, 'id'>
  userSkillIsSelected: boolean
  userSkillName: Pick<PhotographySkill, 'name'>
}

export default function ProfileSpecialtySkillComponent({
  user,
  userSkillIsSelected,
  userSkillName,
}: ProfileSpecialtySkillProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [specialtySkillToggle, setSpecialtySkillToggle] =
    useState(userSkillIsSelected)

  const toggleSpecialtySkill = async () => {
    setIsLoading(true)
    await handleConnectSpecialtySkill({
      isDisconected: specialtySkillToggle,
      specialtySkillName: userSkillName,
      userId: user,
    })
    setSpecialtySkillToggle(!specialtySkillToggle)
    setIsLoading(false)
  }

  return (
    <>
      <Toggle
        disabled={isLoading}
        pressed={specialtySkillToggle}
        onPressedChange={toggleSpecialtySkill}
        className={`m-1 h-8 bg-accent hover:bg-primary/80 hover:text-secondary data-[state=on]:bg-primary data-[state=on]:text-secondary`}
      >
        {userSkillName.name}
      </Toggle>
    </>
  )
}
