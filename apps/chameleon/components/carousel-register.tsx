'use client'

import React from 'react'
import Image from 'next/image'
import cosplayer1 from '@/public/stock/cosplayer1.jpg'
import cosplayer2 from '@/public/stock/cosplayer2.jpg'
import cosplayer3 from '@/public/stock/cosplayer3.jpg'
import photographer1 from '@/public/stock/photographer1.jpg'
import photographer2 from '@/public/stock/photographer2.jpg'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'

import { Carousel, CarouselContent } from './ui/carousel'

export default function CarouselRegister() {
  const imageArray = [
    cosplayer1,
    photographer1,
    cosplayer2,
    photographer2,
    cosplayer3,
  ]

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )

  return (
    <Carousel plugins={[plugin.current]} className="bg-black">
      <CarouselContent className="h-screen ml-0">
        {imageArray.map((imgSrc, index) => (
          <CarouselItem key={index} className="basis-full pl-0 relative">
            <Card className="rounded-none h-full">
              <CardContent className="flex p-6 h-full w-full aspect-square items-center justify-center">
                <Image
                  alt="Photo of Cosplayer"
                  className="p-8"
                  layout="responsive"
                  src={imgSrc}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
