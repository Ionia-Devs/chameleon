'use client'

// import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface CurrentShootProps {
  currentShoots: {
    id: string
    userId: string
    name: string
  }[] | null
}

export default function CurrentShoots({ currentShoots }: CurrentShootProps) {
  const shoots = [
    { name: 'NSFW', isSelected: false, id: '1' },
    { name: 'Studio', isSelected: false, id: '2' },
    { name: 'Off Site', isSelected: false, id:'3' },
    { name: 'Editorial', isSelected: false, id: '4' },
    { name: 'Cosplay', isSelected: false, id: '5' },
    { name: 'Fashion', isSelected: false, id: '6' },
    { name: 'Portrait', isSelected: false, id: '7' },
    { name: 'Events', isSelected: false, id: '8' },
  ]
  return (
    <>
      {shoots.map((shoot) => (
        <Button key={shoot.id} className={`m-1 h-8 bg-primary text-secondary`}>
          {shoot.name}
        </Button>
      ))}
    </>
  )
}
