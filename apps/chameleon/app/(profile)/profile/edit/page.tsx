import Image from 'next/image'
import DisplayNameInput from './_components/display-name-input'
import ProfileSkill from './_components/profile-skill'
import { LayoutGrid } from '@/components/ui/aceternity/layout-grid'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EditProfile() {
  const profileImage = 'https://source.unsplash.com/random/?person'
  const profileSkills = [
    { name: 'NSFW', isSelected: false },
    { name: 'Boudoir', isSelected: false },
    { name: 'Convention', isSelected: false },
    { name: 'Off-Site', isSelected: false },
    { name: 'Studio', isSelected: false },
    { name: 'Cosplay', isSelected: false },
    { name: 'Portrait', isSelected: false },
    { name: 'Editorial', isSelected: false },
    { name: 'Events', isSelected: false },
    { name: 'Fashion', isSelected: false },
    { name: 'Fantasy', isSelected: false },
    { name: 'Videograph', isSelected: false },
  ]
  const bestProfileSkills = [
    {name: 'Paid Shoots', isSelected: false},
    {name: 'Convention Shoots', isSelected: false},
    {name: 'Collabs', isSelected: false},
  ]
  return (
    <div className="flex flex-col w-full">
      <section className="flex justify-around w-full">
        <div className="flex flex-col">
          <div className="mb-2">
            <Label className="m-2">Display Name</Label>
            <DisplayNameInput />
          </div>
          <div className="mb-2">
            <Label className="m-2">Instagram Username</Label>
            <Input className='border-none' value={'This is your name here'} readOnly></Input>
          </div>
          <div className="flex flex-col">
            <Label className="m-2">I&apos;m currently shooting:</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:w-80">
              {profileSkills.map((skill) => (
                <ProfileSkill key={skill.name} name={skill.name} />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="m-2">I&apos;m open to:</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:w-80">
              {profileSkills.map((skill) => (
                <ProfileSkill key={skill.name} name={skill.name} />
              ))}
            </div>
            <div className="flex flex-col">
              <Label className="m-2">I&apos;m most skilled with:</Label>
              <div className="grid grid-cols-2 md:w-80">
              {bestProfileSkills.map((skill) => (
                <ProfileSkill key={skill.name} name={skill.name} />
              ))}
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
