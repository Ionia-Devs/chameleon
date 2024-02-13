'use client'

import Image from 'next/image'
import type { Portfolio } from '@prisma/client'
import { XIcon } from 'lucide-react'

import { removePhoto } from '../actions'

interface PortfolioProps {
  photo: Pick<Portfolio, 'id' | 'image'>
}

export default function Portfolio({ photo }: PortfolioProps) {
  const handleRemovePhoto = async () => {
    await removePhoto({ photoId: photo.id })
  }
  return (
    <div className="group relative h-80 w-full">
      <Image
        alt="portfolio photo"
        src={photo.image}
        height="500"
        width="500"
        className="object-cover object-top absolute inset-0 h-80 w-full border-2 border-accent"
      />
      <button
        onClick={handleRemovePhoto}
        className="absolute top-0 right-0 m-1 mr-2 z-10 group-hover:visible invisible"
      >
        <XIcon className="bg-secondary" />
      </button>
    </div>
  )
}
