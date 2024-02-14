import { z } from 'zod'

export const connectionSchema = z.enum(['connect', 'disconnect'])

export type ConnectionAction = z.infer<typeof connectionSchema>
