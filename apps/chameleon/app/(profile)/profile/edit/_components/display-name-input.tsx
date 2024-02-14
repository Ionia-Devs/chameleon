'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { userNameSchema } from '@/lib/validations/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { updateDisplayName } from '../actions'

interface DisplayNameProps {
  user: Pick<User, 'id' | 'name'>
}
type FormData = z.infer<typeof userNameSchema>

export default function DisplayNameInput({ user }: DisplayNameProps) {
  const { handleSubmit, register, watch } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || '',
    },
  })

  const name = watch('name')
  const nameHasChanged = user.name !== name

  const onSubmit = async (data: FormData) => {
    const { name } = data
    const res = await updateDisplayName({
      newName: { name },
      userId: user.id,
    })
    if (res === 'success') {
      toast.success('Name successfully changed')
    } else {
      toast.error('Something went wrong.', {
        description:
          'Your name failed to update. Please refresh the page and try again.',
      })
    }
  }

  return (
    <form
      className="flex justify-between items-center mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input id="name" {...register('name')} />
      <Button
        type="submit"
        className={cn(
          'ml-5 w-16 h-8',
          nameHasChanged ? 'visible' : 'invisible'
        )}
      >
        Save
      </Button>
    </form>
  )
}
