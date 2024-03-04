'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { userNameSchema } from '@/lib/validations/user'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { updateDisplayName } from '../actions'

interface DisplayNameProps {
  user: Pick<User, 'id' | 'name'>
}
type FormData = z.infer<typeof userNameSchema>

export default function DisplayNameInput({ user }: DisplayNameProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || '',
    },
  })
  const { handleSubmit, watch } = form

  const name = watch('name')
  const nameHasChanged = user.name !== name

  const onSubmit = async (newNameForm: FormData) => {
    const { name } = newNameForm
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
      <Form {...form}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                  <Button
                    type="submit"
                    className={cn(
                      'ml-5 w-16 h-8 mt-1',
                      nameHasChanged ? 'visible' : 'invisible'
                      )}
                      >
                      Save
                    </Button>
                </div>
                <FormDescription>
                  This is your public display name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
  )
}
