'use client'

import { useState } from 'react'

import { Toggle } from '@/components/ui/toggle'

interface ProfileSpecialtySkill {
  id: string
  userId: string
  name: string
}

interface ProfileSpecialtySkillProps {
  // userSpecialtyData: ProfileSpecialtySkill[] | null
  handleSpecialtySkill: (
    isRemoved: boolean,
    specialtySkillName: string
  ) => Promise<void>
  userSkillIsSelected: boolean
  userSkillName: string
}

export default function ProfileSpecialtySkill({
  userSkillIsSelected,
  userSkillName,
  handleSpecialtySkill,
}: // userSpecialtyData,
ProfileSpecialtySkillProps) {
  // const [specialty]
  const [specialtySkillToggle, setSpecialtySkillToggle] =
    useState(userSkillIsSelected)

  const toggleSpecialtySkill = async () => {
    await handleSpecialtySkill(specialtySkillToggle, userSkillName)
    setSpecialtySkillToggle(!specialtySkillToggle)
  }

  return (
    <>
      <Toggle
        pressed={specialtySkillToggle}
        onPressedChange={toggleSpecialtySkill}
        key={userSkillName}
        className={`m-1 h-8 bg-accent hover:bg-primary/80 hover:text-secondary data-[state=on]:bg-primary data-[state=on]:text-secondary`}
      >
        {userSkillName}
      </Toggle>
    </>
  )
}
