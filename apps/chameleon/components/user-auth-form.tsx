'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast.error('Something went wrong.', {
        description: 'Your sign in request failed. Please try again.',
      })
    }

    return toast('Check your email', {
      description: 'We sent you a login link. Be sure to check your spam too.',
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <div className="bg-black rounded-lg">
              <Input
                className="text-neutral-200"
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register('email')}
              />
            </div>

            {errors?.email && (
              <p className="px-1 text-xs text-neutral-900 font-bold">
                {errors.email.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"></div>
        <div className="relative flex justify-center text-xs font-bold uppercase items-center">
          <span className="w-1/3 border-t"></span>
          <span className="px-2 text-neutral-900">Or continue with</span>
          <span className="w-1/3 border-t"></span>
        </div>
      </div>

      <button
        type="button"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'bg-white hover:bg-neutral-200 hover:text-neutral-900 border-none'
        )}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn('github')
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        Github
      </button>
    </div>
  )
}
