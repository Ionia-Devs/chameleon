'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ProfileSkillProps {
  name: string
  isSelected: boolean
}

export default function ProfileSkill({ name, isSelected }: ProfileSkillProps) {
  const [buttonSelected, setButtonSelected] = useState(isSelected)
  return (
    <Button
      onClick={() => setButtonSelected(!buttonSelected)}
      className={`m-1 h-8 bg-secondary text-secondary-foreground hover:text-secondary ${
        buttonSelected === true && 'bg-primary text-secondary'
      }`}
    >
      {name}
    </Button>
  )
}
