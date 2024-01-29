'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import chameleon from '@/public/icons/chameleon-logo-transparent-bg.png'

export default function Signup() {
  const [displayParty, setDisplayParty] = useState('')
  const [displayPartyArrangement, setDisplayPartyArrangement] = useState([
    'Cosplayer',
    'Photographer',
    'Group Cosplay',
    'Videographer',
    'Friend',
  ])

  const [showPhoneNumberSignupModul, setShowPhoneNumberSignupModul] =
    useState(false)
  const [
    changePhoneNumberFormAfterAnimation,
    setChangePhoneNumberFormAfterAnimation,
  ] = useState(false)
  const [showPhoneNumberForm, setPhoneNumberForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    password: '',
  })

  useEffect(() => {
    typeWritterEffect()
  }, [displayPartyArrangement])

  async function typeWritterEffect() {
    const selectedParty = displayPartyArrangement[0]

    for (let i = 0; i < selectedParty.length; i++) {
      const portion = selectedParty.substring(0, i + 1)
      await new Promise((resolve) => {
        setTimeout(() => {
          setDisplayParty(portion)
          resolve()
        }, 125)
      })
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })

    for (let i = selectedParty.length; i >= 0; i--) {
      const portion = selectedParty.substring(0, i)
      await new Promise((resolve) => {
        setTimeout(() => {
          setDisplayParty(portion)
          resolve()
        }, 125)
      })
    }

    setDisplayPartyArrangement((prevArrangement) => {
      return [...prevArrangement.slice(1), prevArrangement[0]]
    })
  }

  async function handlePhoneNumberSignUp() {
    setShowPhoneNumberSignupModul(true)

    setTimeout(() => {
      setChangePhoneNumberFormAfterAnimation(true)
    }, 350) // half the time as animation duration

    await new Promise((resolve) => {
      setTimeout(() => {
        setPhoneNumberForm(true)
        resolve()
      }, 700) // same time as animation duration
    })
  }

  return (
    <div>
      <div className="animate-scroll flex h-screen text-neutral-900 flex-col justify-between bg-gradient-to-bl from-[#fe7489] via-[#eb8af9] to-[#08d3f9] bg-[length:250%_250%]">
        <div className="flex h-[65%] flex-col items-center justify-center">
          <Image
            src={chameleon}
            alt="Chameleon Logo"
            height={150}
            width={150}
            className="mb-2"
          />

          <h1 className="font-kanit mb-3 text-6xl font-bold">Chameleon</h1>
          <div className="animate-cursorBlink relative flex border-r-[3px] pr-[1px]">
            <h2 className="font-roboto text-xl font-bold">
              Find your next {displayParty}
            </h2>
          </div>
        </div>

        <div className="font-roboto flex h-[22.5%] flex-col items-center justify-center text-lg font-bold">
          <div className="mb-3 flex w-[80%] justify-center">
            <button className="flex h-full w-full justify-center rounded-2xl bg-neutral-200 p-2 uppercase transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105 active:scale-100">
              <Image
                src={appleLogo}
                alt="Apple Logo"
                height={25}
                width={25}
                className="mr-2"
              />
              Sign up with Apple
            </button>
          </div>
          <div
            className={`${
              showPhoneNumberSignupModul ? 'static' : 'relative'
            } flex w-[80%] justify-center`}
          >
            <button
              onClick={() => {
                handlePhoneNumberSignUp()
              }}
              className="flex h-11 w-full justify-center rounded-2xl bg-neutral-200 p-2 uppercase transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105 active:scale-100"
            >
              Sign up with phone number
            </button>

            <div
              className={`${
                showPhoneNumberSignupModul
                  ? 'visible h-[90%]'
                  : 'invisible h-11'
              } ${
                changePhoneNumberFormAfterAnimation ? 'p-5' : ''
              } transition-height absolute bottom-[5%] flex w-[80%] flex-col items-center rounded-2xl bg-neutral-200 p-2 duration-700 ease-in-out`}
            >
              <div className="mb-8">
                <h2
                  className={`${
                    changePhoneNumberFormAfterAnimation
                      ? 'scale-125'
                      : 'scale-100'
                  } font-roboto text-lg font-bold uppercase transition-all duration-500`}
                >
                  Sign up with phone number
                </h2>
              </div>

              <div
                className={`${
                  showPhoneNumberForm ? 'block opacity-100' : 'hidden opacity-0'
                } w-full`}
              >
                <form className="flex flex-col items-center">
                  <div className="group relative h-10 w-[90%] mb-8">
                    <label
                      className={`${
                        formData.firstName !== ''
                          ? 'translate-y-[-160%]'
                          : 'group-focus-within:translate-y-[-160%]'
                      } absolute top-[50%] transition translate-y-[-50%] left-[2.5%]`}
                    >
                      First Name
                    </label>
                    <input
                      onChange={(e) => {
                        const userInput: string = e.target.value
                        setformData((prevData) => {
                          return { ...prevData, firstName: userInput }
                        })
                      }}
                      className="p-[2.5%] group h-full w-full border-2 bg-neutral-200 border-black"
                    ></input>
                  </div>

                  <div className="group relative h-10 w-[90%] mb-8">
                    <label
                      className={`${
                        formData.lastName !== ''
                          ? 'translate-y-[-160%]'
                          : 'group-focus-within:translate-y-[-160%]'
                      } absolute top-[50%] transition translate-y-[-50%] left-[2.5%]`}
                    >
                      Last Name (Optional)
                    </label>
                    <input
                      onChange={(e) => {
                        const userInput: string = e.target.value
                        setformData((prevData) => {
                          return { ...prevData, lastName: userInput }
                        })
                      }}
                      className="p-[2.5%] group h-full w-full border-2 bg-neutral-200 border-black"
                    ></input>
                  </div>

                  <div className="group relative h-10 w-[90%] mb-8">
                    <label
                      className={`${
                        formData.lastName !== ''
                          ? 'translate-y-[-160%]'
                          : 'group-focus-within:translate-y-[-160%]'
                      } absolute top-[50%] transition translate-y-[-50%] left-[2.5%]`}
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => {
                        const userInput: string = e.target.value
                        setformData((prevData) => {
                          return { ...prevData, password: userInput }
                        })
                      }}
                      className="p-[2.5%] group h-full w-full border-2 bg-neutral-200 border-black"
                    ></input>
                  </div>

                  <div className="group relative h-10 w-[90%]">
                    <label
                      className={`${
                        formData.lastName !== ''
                          ? 'translate-y-[-160%]'
                          : 'group-focus-within:translate-y-[-160%]'
                      } absolute top-[50%] transition translate-y-[-50%] left-[2.5%]`}
                    >
                      Phone Number
                    </label>
                    <input
                      onChange={(e) => {
                        const userInput: string = e.target.value
                        setformData((prevData) => {
                          return { ...prevData, phoneNumber: userInput }
                        })
                      }}
                      className="p-[2.5%] group h-full w-full border-2 bg-neutral-200 border-black"
                    ></input>
                  </div>

                  <div>
                    <label>Gender</label>
                    <select className="border-2 border-black">
                      <option value={'Male'}>Male</option>
                      <option value={'Female'}>Female</option>
                      <option value={'Other'}>Other</option>
                      <option value={'Custom'}>Custom</option>
                    </select>
                  </div>

                  <div className="group relative h-10 w-[90%]">
                    <label
                      className={`${
                        formData.email !== ''
                          ? 'translate-y-[-160%]'
                          : 'group-focus-within:translate-y-[-160%]'
                      } absolute top-[50%] transition translate-y-[-50%] left-[2.5%]`}
                    >
                      Email
                    </label>
                    <input
                      onChange={(e) => {
                        const userInput: string = e.target.value
                        setformData((prevData) => {
                          return { ...prevData, email: userInput }
                        })
                      }}
                      className="p-[2.5%] group h-full w-full border-2 bg-neutral-200 border-black"
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
