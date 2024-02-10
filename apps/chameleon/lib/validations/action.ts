import { z } from 'zod'

export const actionSchema = z.enum(['connect', 'disconnect'])

export type Action = z.infer<typeof actionSchema>