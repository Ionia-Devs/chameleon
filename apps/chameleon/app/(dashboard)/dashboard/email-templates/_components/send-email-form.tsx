'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { sendWelcome } from '../actions'

enum DeliveredEmailTypes {
  delivered = 'delivered',
  bounced = 'bounced',
  complained = 'complained',
}

interface EmailFormProps {
  name: string
  message: string
  type: DeliveredEmailTypes
}

function EmailForm() {
  const { handleSubmit, register } = useForm<EmailFormProps>({
    defaultValues: {
      name: '',
      message: '',
      type: 'delivered',
    },
  })

  const onSubmit: SubmitHandler<EmailFormProps> = async (emailForm) => {
    const result = await sendWelcome(
      emailForm.type,
      emailForm.name,
      emailForm.message
    )
    if (result.success === true) toast.success('email was sent successfully')
    if (result.success === false) toast.error('failed to send email')
  }
  return (
    <form
      className="flex justify-between items-center mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <select id="type" {...register('type')}>
        <option value="delivered">Delivered</option>
        <option value="bounced">Bounced</option>
        <option value="complained">Complained</option>
      </select>
      <Input placeholder="name" id="name" {...register('name')} />
      <Input placeholder="message" id="message" {...register('message')} />
      <Button type="submit">Send</Button>
    </form>
  )
}

export default EmailForm
