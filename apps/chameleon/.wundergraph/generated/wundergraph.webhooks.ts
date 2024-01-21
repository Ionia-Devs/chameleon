import {
  createWebhookFactory,
  type WebhookConfiguration,
} from '@wundergraph/sdk/server'

import type { ORM as TypedORM } from './orm'
import type { ContextType } from './wundergraph.factory'
import type { InternalOperationsClient } from './wundergraph.internal.operations.client'

export type WebhooksConfig = {}

export const createWebhook = createWebhookFactory<
  InternalOperationsClient,
  ContextType,
  TypedORM
>()
