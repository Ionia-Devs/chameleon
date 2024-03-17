import {
  SSRCache,
  WithWunderGraphOptions,
  createWunderGraphNext as createWunderGraphNextInternal,
} from '@wundergraph/nextjs'
import { User } from '@wundergraph/sdk/client'

import { Operations, UserRole, createClient } from './client'

export interface WunderGraphPageProps {
  ssrCache?: SSRCache
  user?: User<UserRole>
}

export interface CreateWunderGraphNextOptions
  extends Omit<WithWunderGraphOptions, 'client'> {
  baseURL?: string
}

export const createWunderGraphNext = (
  options: CreateWunderGraphNextOptions
) => {
  const { baseURL, ...rest } = options
  const client = createClient(
    baseURL
      ? {
          baseURL,
        }
      : undefined
  )

  return createWunderGraphNextInternal<Operations, typeof client>({
    client,
    ...rest,
  })
}

const {
  client,
  withWunderGraph,
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  useFileUpload,
} = createWunderGraphNext({
  ssr: true,
})

export {
  client,
  useAuth,
  useFileUpload,
  useMutation,
  useQuery,
  useSubscription,
  useUser,
  withWunderGraph,
}
