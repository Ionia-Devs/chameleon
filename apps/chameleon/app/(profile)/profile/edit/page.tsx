// import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { db } from '@chameleon/db'
import { getCurrentUser } from '@/lib/session'
import { LayoutGrid } from '@/components/ui/aceternity/layout-grid'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// page specific components
import CurrentShoot from './_components/current-shoot'
import DisplayNameInput from './_components/display-name-input'
import ProfileSkills from './_components/profile-skill'
import ProfileSpecialtySkills from './_components/specialty-skills'

export default async function EditProfile() {
  const user = await getCurrentUser()
  
  if (!user) {
    return notFound()
  }

  const userData = await db.user.findUnique({
    where: { id: user.id },
    include: {
      CurrentShoots: true,
      UserSkills: true,
      SpecialtySkills: true,
    },
  })
  const handleSpecialtySkill = async (
    isRemoved: boolean,
    specialtySkillName: string
  ) => {
    'use server'
    const specialtySkill = userData?.SpecialtySkills.find(
      (skill) => skill.name === specialtySkillName
    )
    console.log('here is the specialty skill: ', specialtySkill)
    if (isRemoved === true && specialtySkill !== undefined) {
      await db.specialtySkill.delete({
        where: {
          id: user.id,
          name: specialtySkill.id,
        },
      })
    } else if (isRemoved === false) {
      console.log("you're in the upsert part")
    }
  }

  const updateDisplayName = async (newName: string) => {
    "use server"
    await db.user.update({
      where: { id: user.id },
      data: {
        name: newName,
      },
    })
  }

  const specialtySkills = [
    { name: 'Paid Shoots', isSelected: false, id: '1' },
    { name: 'Convention Shoots', isSelected: false, id: '2' },
    { name: 'Collabs', isSelected: false, id: '3' },
  ]

  return (
    <div className="flex flex-col w-full">
      <section className="flex justify-around w-full">
        <div className="flex flex-col">
          <div className="mb-2">
            <Label className="m-2">Display Name</Label>
            <DisplayNameInput
              updateDisplayName={updateDisplayName}
              currentUsername={
                user.name !== null && user.name !== undefined
                  ? user.name
                  : 'insert name here'
              }
            />
          </div>
          <div className="mb-2">
            <Label className="m-2">Instagram Username</Label>
            <Input
              className="border-none"
              value={'This is your insta name here'}
              readOnly
            ></Input>
          </div>
          <div className="flex flex-col">
            <Label className="m-2 w-64 underline text-lg">
              I&apos;m currently shooting:
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:w-80">
              <CurrentShoot
                currentShoots={
                  userData?.CurrentShoots !== undefined
                    ? userData?.CurrentShoots
                    : null
                }
              />
            </div>{' '}
          </div>
          <div className="flex flex-col">
            <Label className="m-2 w-64 underline text-lg">
              I&apos;m open to:
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:w-80">
              <ProfileSkills
                userSkills={
                  userData?.UserSkills !== undefined
                    ? userData?.UserSkills
                    : null
                }
              />
            </div>
            <div className="flex flex-col">
              <Label className="m-2 w-64 underline text-lg">
                I&apos;m most skilled with:
              </Label>
              <div className="grid grid-cols-2 md:w-80">
                {/* {specialtySkills.map((skill) => (
                  <ProfileSpecialtySkills
                    key={skill.id}
                    userSkillName={skill.name}
                    userSkillIsSelected={
                      userData?.SpecialtySkills.find(
                        (skillName) => skillName.name === skill.name
                      )
                        ? true
                        : false
                    }
                    handleSpecialtySkill={handleSpecialtySkill}
                  />
                ))} */}
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
            src={
              userData?.image
                ? userData.image
                : 'https://source.unsplash.com/random/?person'
            }
          />
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
