import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import chameleon from '@/public/icons/chameleon-logo-transparent-bg.png'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import CarouselRegister from '@/components/carousel-register'
import TypeWritterEffect from '@/components/typing'
import { UserAuthForm } from '@/components/user-auth-form'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

export default function RegisterPage() {
  return (
    <div className="relative container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 animate-scroll bg-gradient-to-bl from-[#fe7489] via-[#eb8af9] to-[#08d3f9] bg-[length:250%_250%]">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'default' }),
          'absolute right-4 top-4 md:right-8 md:top-8 bg-white text-neutral-900 hover:bg-neutral-200'
        )}
      >
        Login
      </Link>

      <div className="relative hidden h-full bg-muted lg:block">
        <CarouselRegister />
      </div>

      <div className="">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] text-neutral-900">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src={chameleon}
              alt="Chameleon Logo"
              height={150}
              width={150}
              className="mb-2"
            />

            <h1 className="font-kanit mb-3 text-6xl font-bold">Chameleon</h1>
            <div className="animate-cursorBlink relative flex border-r-[3px] pr-[1px]">
              <h2 className="font-roboto text-xl font-bold flex">
                Find your next <span className="mr-[5px]" />
                <TypeWritterEffect />
              </h2>
            </div>
          </div>

          <Suspense>
            <UserAuthForm />
          </Suspense>

          <p className="px-8 text-center text-sm text-neutral-900">
            By clicking continue, you agree to our
            <br></br>
            <Link
              href="/terms"
              className="ml-1 hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <span className="ml-1">and</span>
            <Link
              href="/privacy"
              className="ml-1 hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
