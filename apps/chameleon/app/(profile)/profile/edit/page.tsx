import Image from 'next/image'

import { LayoutGrid } from '@/components/ui/aceternity/layout-grid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Skeleton = (props: { title: string; content: string }) => {
  const { title, content } = props
  return (
    <div className="h-2/3">
      <p className="font-bold text-4xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {content}
      </p>
    </div>
  )
}

const cards = [
  {
    id: 1,
    content: <Skeleton title={'Other City'} content={'BIG POG'} />,
    className: 'col-span-1 h-60',
    thumbnail: 'https://source.unsplash.com/random/?city,night',
  },
  {
    id: 2,
    content: <Skeleton title={'Other City'} content={'ALSO POG'} />,
    className: 'col-span-1 h-60',
    thumbnail: 'https://source.unsplash.com/random/?city,day',
  },
  {
    id: 3,
    content: (
      <Skeleton
        title={'I queried for pizza with this on unsplash...'}
        content={'Does this look like pizza to you?'}
      />
    ),
    className: 'col-span-1 h-60',
    thumbnail: 'https://source.unsplash.com/random/?pizza,night',
  },
  {
    id: 4,
    content: (
      <Skeleton
        title={'You would never guess what I queried for with this image'}
        content={'It was a green car'}
      />
    ),
    className: 'col-span-1 h-60',
    thumbnail: 'https://source.unsplash.com/random/?car,green',
  },
  {
    id: 5,
    content: (
      <Skeleton
        title={'something something funny joke'}
        content={'DOPA DOWN'}
      />
    ),
    className: 'col-span-1 h-60',
    thumbnail: 'https://source.unsplash.com/random/?trees,clean',
  },
  {
    id: 6,
    content: <Skeleton title={'angy'} content={'>:('} />,
    className: 'col-span-1 h-60',
    thumbnail: 'https://source.unsplash.com/random/?star,killer',
  },
]

export default function EditProfile() {
  const profileImage = 'https://source.unsplash.com/random/?person'
  return (
    <div className="flex flex-col w-full">
      <section className="flex justify-around w-full">
        <div className="flex flex-col">
          <div className="mb-2">
            <Label className="m-2">Display Name</Label>
            <Input value={'This is your name here'}></Input>
          </div>
          <div className="mb-2">
            <Label className="m-2">Instagram Username</Label>
            <Input value={'This is your name here'}></Input>
          </div>
          <div className="flex flex-col">
            <Label className="m-2">I&apos;m currently shooting: </Label>
            <div className="grid grid-cols-3 md:w-80">
              <Button className="m-1 h-8">nsfw</Button>
              <Button className="m-1 h-8">nsfw</Button>
              <Button className="m-1 h-8">nsfw</Button>
              <Button className="m-1 h-8">nsfw</Button>
              <Button className="m-1 h-8">nsfw</Button>
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="m-2">I&apos;m open to: </Label>
            <div className="grid grid-cols-3 md:w-80">
              <Button className="m-1 h-8">nsfw</Button>
              <Button className="m-1 h-8">nsfw</Button>
              <Button className="m-1 h-8">nsfw</Button>
              <Button className="m-1 h-8">nsfw</Button>
              <Button className="m-1 h-8">nsfw</Button>
            </div>
            <div className="flex flex-col">
              <Label className="m-2">I&apos;m most skilled with: </Label>
              <div className="grid grid-cols-2 md:w-80">
                <Button className="m-1 h-8">nsfw</Button>
                <Button className="m-1 h-8">nsfw</Button>
                <Button className="m-1 h-8">nsfw</Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image
            alt="profile image"
            width="160"
            height="160"
            className="rounded-lg"
            src={profileImage}
          />
          <div className="flex justify-around">
            <button className="m-1">Upload</button>
            <button className="m-1">Delete</button>
          </div>
        </div>
      </section>
      <div className="flex flex-col">
        <Label className="flex self-center text-3xl">Portfolio</Label>
        <LayoutGrid cards={cards} />
      </div>
    </div>
  )
}
