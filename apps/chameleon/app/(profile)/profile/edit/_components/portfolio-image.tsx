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
    <div className='group relative'>
      <Image
        alt="portfolio picture"
        src={picture.image}
        height="500"
        width="500"
        className="h-72 w-72 object-cover object-left-top rounded-lg gap-5 !m-0 !p-0"
      />
      <button onClick={removePhoto} className='absolute top-0 right-0 m-1 mr-2 z-10 group-hover:visible invisible'><XIcon className='bg-secondary' /></button>
    </div>
  )
}
