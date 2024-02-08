'use server'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { db } from '@chameleon/db'

import { getCurrentUser } from '@/lib/session'
import { LayoutGrid } from '@/components/ui/aceternity/layout-grid'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// page specific components
import DisplayNameInput from './_components/display-name-input'
import ProfileSkill from './_components/profile-skill'
import ProfileShootType from './_components/shoot-type'

export default async function EditProfile() {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  const allPhotoShootsTypes = await db.photoShootType.findMany()
  const allPhotographySkills = await db.photographySkill.findMany()
  const allFocusSkills = allPhotographySkills.filter(
    (skill) => skill.skillType === 'CURRENT_FOCUS'
  )
  const allSpecialtySkills = allPhotographySkills.filter(
    (skill) => skill.skillType === 'SPECIALTY'
  )

  const userProfileData = await db.userProfile.findUnique({
    where: { userId: user.id },
    include: {
      photoShootTypes: true,
      photographySkills: true,
    },
  })

  return (
    <div className="flex flex-col w-full">
      <section className="flex justify-around w-full">
        <div className="flex flex-col">
          <div className="mb-2">
            <Label className="m-2">Display Name</Label>
            <DisplayNameInput
              user={{
                id: user.id,
                name: user.name ? user.name : 'Change Name Here',
              }}
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
            <div className="grid grid-cols-2 md:w-80">
              {allPhotoShootsTypes.map((photogType) => (
                <ProfileShootType
                  key={photogType.id}
                  isSelected={
                    userProfileData?.photoShootTypes.find(
                      (skillName) => skillName.name === photogType.name
                    )
                      ? true
                      : false
                  }
                  photoShootType={{ name: photogType.name }}
                  user={{ id: user.id }}
                />
              ))}
            </div>{' '}
          </div>
          <div className="flex flex-col">
            <Label className="m-2 w-64 underline text-lg">
              I&apos;m open to:
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:w-80">
              {allFocusSkills.map((skill) => (
                <ProfileSkill
                  key={skill.id}
                  photographySkill={{
                    name: skill.name,
                    skillType: skill.skillType,
                  }}
                  isSelected={
                    // Since the prisma model PhotographySkill has 2 tables per name, one for "SPECIALTY" and one for "CURRENT_FOCUS", 
                    // this is to make sure the correct name for the skilltype is highlighted when selected
                    userProfileData?.photographySkills.find(
                      (profileSkill) =>
                        profileSkill.name === skill.name &&
                        profileSkill.skillType === skill.skillType
                    )
                      ? true
                      : false
                  }
                  user={{ id: user.id }}
                />
              ))}
            </div>
            <div className="flex flex-col">
              <Label className="m-2 w-64 underline text-lg">
                I&apos;m most skilled with:
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:w-80">
                {allSpecialtySkills.map((skill) => (
                  <ProfileSkill
                    key={skill.id}
                    photographySkill={{
                      name: skill.name,
                      skillType: skill.skillType,
                    }}
                    isSelected={
                      // Since the prisma model PhotographySkill has 2 tables per name, one for "SPECIALTY" and one for "CURRENT_FOCUS", 
                      // this is to make sure the correct name for the skilltype is highlighted when selected
                      userProfileData?.photographySkills.find(
                        (profileSkill) =>
                          profileSkill.name === skill.name &&
                          profileSkill.skillType === skill.skillType
                      )
                        ? true
                        : false
                    }
                    user={{ id: user.id }}
                  />
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
            src={
              user?.image
                ? user.image
                : 'https://source.unsplash.com/random/?person'
            }
          />
        </div>
      </section>
      <div className="flex flex-col">
        <Label className="flex self-center text-3xl">Portfolio</Label>
        {/* <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-4">
          {cards.map((card) => (
            <Image key={cards.id} src={card.thumbnail} width={200} height={200}/>
          ))}
        </div> */}
        <LayoutGrid cards={cards} />
      </div>
    </div>
  )
}
const Skeleton = (props: { title: string; content: string }) => {
  // const { title, content } = props
  return (
    <></>
    // <div className="h-2/3">
    //   <p className="font-bold text-4xl text-white">{title}</p>
    //   <p className="font-normal text-base text-white"></p>
    //   <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    //     {content}
    //   </p>
    // </div>
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
