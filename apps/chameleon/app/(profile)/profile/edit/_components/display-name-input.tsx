'use client'
import { handleUpdateDisplayName } from '../actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { userNameSchema } from '@/lib/validations/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DisplayNameProps {
  user: Pick<User, 'id' | 'name'>
}
type FormData = z.infer<typeof userNameSchema>

export default function DisplayNameInput({
  user,
}: DisplayNameProps) {

  const {
    handleSubmit,
    register,
    // formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || '',
    },
  })

  const name = watch("name")
  const nameHasChanged = user.name !== name;

  const onSubmit = async (data: FormData) => {
    await handleUpdateDisplayName({newName: data.name, user})
  }

  return (
    <form
      className="flex justify-between items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="name"
        {...register('name')}
      />
      <Button
        type="submit"
        className={cn(`ml-5 w-16 h-8`, nameHasChanged ? "visible" : 'invisible')}
      >
        Save
      </Button>
    </form>
  )
}
