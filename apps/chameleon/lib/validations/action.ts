import { z } from 'zod'

export const connectionSchema = z.enum(['connect', 'disconnect'])

export type Connection = z.infer<typeof connectionSchema>
