'use server'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { db } from '@chameleon/db'

import { getCurrentUser } from '@/lib/session'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// page specific components
import DisplayNameInput from './_components/display-name-input'
import Portfolio from './_components/portfolio-image'
import ProfileSkill from './_components/profile-skill'
import ProfileShootType from './_components/shoot-type'
import { formatEnumString } from './actions'

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
      Portfolio: true,
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
            <Label className="m-2 w-64 text-lg">
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
                  formatedShootTypeName={formatEnumString(photogType.name)}
                  photoShootType={{ name: photogType.name }}
                  user={{ id: user.id }}
                />
              ))}
            </div>{' '}
          </div>
          <div className="flex flex-col">
            <Label className="m-2 w-64 text-lg">I&apos;m open to:</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:w-80">
              {allFocusSkills.map((skill) => (
                <ProfileSkill
                  key={skill.id}
                  photographySkill={{
                    name: skill.name,
                    skillType: skill.skillType,
                  }}
                  formatedSkillName={formatEnumString(skill.name)}
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
              <Label className="m-2 w-64 text-lg">
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
                    formatedSkillName={formatEnumString(skill.name)}
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
      <div className="flex flex-col mt-5 md:mt-0">
        <Label className="flex self-center text-3xl">Portfolio</Label>
        <div className="h-screen place-items-center py-20 mt-3 w-full p-10 overflow-y-auto border-2 border-accent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  max-w-7xl mx-auto gap-4 ">
          {userProfileData?.Portfolio.length !== undefined &&
          userProfileData?.Portfolio.length > 0 ? (
            userProfileData?.Portfolio.map((card, index) => (
              <Portfolio key={index} picture={card} />
            ))
          ) : (
            <>
              <div className="flex justify-center items-center h-80 w-72 border-2 border-accen text-2xl visible">
                Empty
              </div>
              <div className="flex justify-center items-center h-80 w-72 border-2 border-accen text-2xl invisible md:visible">
                Empty
              </div>
              <div className="flex justify-center items-center h-80 w-72 border-2 border-accen text-2xl invisible lg:visible">
                Empty
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
