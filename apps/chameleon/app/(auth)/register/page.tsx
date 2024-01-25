import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import CarouselRegister from '@/components/signuppage/carouselregister'
import TypeWritterEffect from '@/components/signuppage/typing'
import { UserAuthForm } from '@/components/user-auth-form'

import chameleon from '../../../public/icons/chameleon-logo-transparent-bg.png'

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
          buttonVariants({ variant: 'aware' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </Link>

      <div className="relative hidden h-full bg-muted lg:block">
        <CarouselRegister />
        {/* <Carousel plugins={[plugin.current]} className="bg-white w-full h-full">
          <CarouselContent className="w-full h-full">
            <CarouselItem className="basis-full">
              <Card>
                <CardContent className="h-full w-full relative">
                  <Image
                    alt="Photo of Cosplayer"
                    className="p-8"
                    layout="fill"
                    src={cosplayer1}
                  />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full relative">
              <Card>
                <CardContent>
                  <Image
                    alt="Photo of Cosplayer"
                    className="p-8"
                    layout="fill"
                    src={photographer1}
                  />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full relative">
              <Card>
                <CardContent>
                  <Image
                    alt="Photo of Cosplayer"
                    className="p-8"
                    layout="fill"
                    src={cosplayer2}
                  />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full relative">
              <Card>
                <CardContent>
                  <Image
                    alt="Photo of Cosplayer"
                    className="p-8"
                    layout="fill"
                    src={photographer2}
                  />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full relative">
              <Card>
                <CardContent>
                  <Image
                    alt="Photo of Cosplayer"
                    className="p-8"
                    layout="fill"
                    src={cosplayer3}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel> */}
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] text-[#191919]">
          <div className="flex flex-col items-center space-y-2 text-center">
            {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
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
                Find your next <span className="mr-[5px]" />{' '}
                <TypeWritterEffect />
              </h2>
            </div>

            {/* <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p> */}
          </div>

          <Suspense>
            <UserAuthForm styleVariant={{ styleVariant: 'Signup' }} />
          </Suspense>

          <p className="px-8 text-center text-sm text-[#191919]">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
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
