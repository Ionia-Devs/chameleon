'use client'
import { Portfolio } from '@prisma/client'
import Image from 'next/image'
import { XIcon } from 'lucide-react'
import { handleRemovePhoto } from '../actions'

interface PortfolioProps {
  picture: Pick<Portfolio, "id" | "image">
}

export default function Portfolio({ picture }: PortfolioProps) {
  const removePhoto = async () => {
    await handleRemovePhoto({image: {id: picture.id}})
  }
  return (
    <div className='group relative h-80 w-full'>
      <Image
        alt="portfolio picture"
        src={picture.image}
        height="500"
        width="500"
        className="object-cover object-top absolute inset-0 h-80 w-full border-2 border-accent"
      />
      <button onClick={removePhoto} className='absolute top-0 right-0 m-1 mr-2 z-10 group-hover:visible invisible'><XIcon className='bg-secondary' /></button>
    </div>
  )
}
