import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import chameleon from '@/public/icons/chameleon-logo-transparent-bg.png'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import CarouselRegister from '@/components/carousel-register'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="relative container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 animate-scroll bg-gradient-to-bl from-[#fe7489] via-[#eb8af9] to-[#08d3f9] bg-[length:250%_250%]">
      <div className="relative hidden h-full bg-muted lg:block">
        <CarouselRegister />
      </div>

      <div className="h-full w-full flex items-center lg:relative">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'absolute left-4 top-4 md:top-8 md:left-8 bg-white text-dimBlack hover:bg-dimWhite'
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="text-dimBlack mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src={chameleon}
              alt="Chameleon Logo"
              height={150}
              width={150}
              className="mb-2"
            />
            <h1 className="font-kanit text-6xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="font-roboto font-bold text-lg">
              Enter your email to sign in to your account
            </p>
          </div>

          <Suspense>
            <UserAuthForm />
          </Suspense>

          <p className="px-8 text-center text-sm text-dimBlack font-semibold">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
