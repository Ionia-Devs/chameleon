'use client'

import { PhotographySkill } from '@prisma/client'

import { Button } from '@/components/ui/button'

interface ProfileSkillsProps {
  userSkills: PhotographySkill
}

export default function ProfileSkillCompnent({
  userSkills,
}: ProfileSkillsProps) {
  return (
    <Button key={userSkills.id} className={`m-1 h-8 bg-primary text-secondary`}>
      {userSkills.name}
    </Button>
  )
}
