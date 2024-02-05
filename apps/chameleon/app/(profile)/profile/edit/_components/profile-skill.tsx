'use client'

// import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ProfileSkillProps {
  name: string
}

export default function ProfileSkill({ name }: ProfileSkillProps) {
  return (
    <Button
      className={`m-1 h-8 bg-primary text-secondary`}
    >
      {name}
    </Button>
  )
}
