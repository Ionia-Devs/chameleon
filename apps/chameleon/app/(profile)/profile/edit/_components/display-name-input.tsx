'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DisplayNameProps {
  currentUsername: string
  updateDisplayName: (newName: string) => Promise<void>
}

export default function DisplayNameInput({currentUsername, updateDisplayName}: DisplayNameProps) {
  const [displayName, setDisplayName] = useState(currentUsername)
  const [buttonInvisible, setButtonInvisible] = useState(true)
  const displayNameOnChange = (e: string) => {
    setDisplayName(e)
    setButtonInvisible(false)
  }

  const handleSaveChanges = async () => {
    await updateDisplayName(displayName)
    setButtonInvisible(true)
  }
  return (
    <div className="flex justify-between items-center">
      <Input
        onChange={(e) => displayNameOnChange(e.target.value)}
        value={displayName}
      />
      <Button
        onClick={handleSaveChanges}
        className={`ml-5 w-16 h-8 ${buttonInvisible === true && 'invisible'}`}
      >
        Save
      </Button>
    </div>
  )
}
