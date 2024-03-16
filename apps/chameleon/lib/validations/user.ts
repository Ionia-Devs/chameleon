import { UserSchema } from '@chameleon/db'

export const userNameSchema = UserSchema.pick({
  name: true,
})
  .refine((data) => data.name && data.name.length >= 3, {
    message: 'Username must be at least 3 characters.',
    path: ['name'],
  })
  .refine((data) => data.name && data.name.length <= 32, {
    message: 'Username must be at most 32 characters.',
    path: ['name'],
  })
  .refine((data) => data.name && /^[a-zA-Z0-9\s]+$/.test(data.name), {
    message: 'Username can only contain alphanumeric characters and spaces.',
    path: ['name'],
  })
