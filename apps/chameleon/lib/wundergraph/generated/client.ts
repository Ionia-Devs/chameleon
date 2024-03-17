import {
  Client,
  type ClientConfig,
  type ClientOperationErrors,
  type CreateClientConfig,
  type FetchUserRequestOptions,
  type MutationRequestOptions,
  type OperationMetadata,
  type OperationRequestOptions,
  type OperationsDefinition,
  type QueryRequestOptions,
  type SubscriptionEventHandler,
  type SubscriptionRequestOptions,
  type User,
} from '@wundergraph/sdk/client'

import type { PublicCustomClaims } from './claims'
import type {
  CountriesCountryByCodeInput,
  CountriesCountryByCodeResponse,
  OpenaiExtract_website_metadataInput,
  OpenaiExtract_website_metadataResponse,
  OpenaiExtract_website_metadataResponseData,
  OpenaiLoad_urlInput,
  OpenaiLoad_urlResponse,
  OpenaiLoad_urlResponseData,
  OpenaiSummarize_url_contentInput,
  OpenaiSummarize_url_contentResponse,
  OpenaiSummarize_url_contentResponseData,
  OpenaiSummaryInput,
  OpenaiSummaryResponse,
  OpenaiSummaryResponseData,
  OpenaiWeatherInput,
  OpenaiWeatherResponse,
  OpenaiWeatherResponseData,
  TodosAddTodoInput,
  TodosAddTodoResponse,
  TodosGetAllTodosForCurrentUserInput,
  TodosGetAllTodosForCurrentUserResponse,
  TodosUpdateTodoInput,
  TodosUpdateTodoResponse,
  UsersGetInput,
  UsersGetResponse,
  UsersGetResponseData,
  UsersSubscribeInput,
  UsersSubscribeResponseData,
  UsersUpdateInput,
  UsersUpdateResponseData,
} from './models'
import type { OperationErrors } from './ts-operation-errors'

export type UserRole = 'admin' | 'user'

export const WUNDERGRAPH_S3_ENABLED = false
export const WUNDERGRAPH_AUTH_ENABLED = false

export const defaultClientConfig: ClientConfig = {
  applicationHash: '305e8323',
  baseURL: 'http://localhost:9991',
  sdkVersion: '0.184.0',
}

export const operationMetadata: OperationMetadata = {
  'countries/CountryByCode': {
    requiresAuthentication: false,
  },
  'todos/addTodo': {
    requiresAuthentication: false,
  },
  'todos/getAllTodosForCurrentUser': {
    requiresAuthentication: false,
  },
  'todos/updateTodo': {
    requiresAuthentication: false,
  },
  'openai/extract-website-metadata': {
    requiresAuthentication: false,
  },
  'openai/load-url': {
    requiresAuthentication: false,
  },
  'openai/summarize-url-content': {
    requiresAuthentication: false,
  },
  'openai/summary': {
    requiresAuthentication: false,
  },
  'openai/weather': {
    requiresAuthentication: false,
  },
  'users/get': {
    requiresAuthentication: false,
  },
  'users/subscribe': {
    requiresAuthentication: false,
  },
  'users/update': {
    requiresAuthentication: false,
  },
}

export type PublicUser = User<UserRole, PublicCustomClaims>

export class WunderGraphClient extends Client {
  query<
    OperationName extends Extract<keyof Operations['queries'], string>,
    Input extends Operations['queries'][OperationName]['input'] = Operations['queries'][OperationName]['input'],
    Response extends Operations['queries'][OperationName]['response'] = Operations['queries'][OperationName]['response']
  >(
    options: OperationName extends string
      ? QueryRequestOptions<OperationName, Input>
      : OperationRequestOptions
  ) {
    return super.query<
      OperationRequestOptions,
      Response['data'],
      Response['error']
    >(options)
  }

  mutate<
    OperationName extends Extract<keyof Operations['mutations'], string>,
    Input extends Operations['mutations'][OperationName]['input'] = Operations['mutations'][OperationName]['input'],
    Response extends Operations['mutations'][OperationName]['response'] = Operations['mutations'][OperationName]['response']
  >(
    options: OperationName extends string
      ? MutationRequestOptions<OperationName, Input>
      : OperationRequestOptions
  ) {
    return super.mutate<
      OperationRequestOptions,
      Response['data'],
      Response['error']
    >(options)
  }

  subscribe<
    OperationName extends Extract<keyof Operations['subscriptions'], string>,
    Input extends Operations['subscriptions'][OperationName]['input'] = Operations['subscriptions'][OperationName]['input'],
    Response extends Operations['subscriptions'][OperationName]['response'] = Operations['subscriptions'][OperationName]['response']
  >(
    options: OperationName extends string
      ? SubscriptionRequestOptions<OperationName, Input>
      : SubscriptionRequestOptions,
    cb?: SubscriptionEventHandler<Response['data'], Response['error']>
  ) {
    return super.subscribe<
      OperationRequestOptions,
      Response['data'],
      Response['error']
    >(options, cb)
  }
  public login(
    authProviderID: Operations['authProvider'],
    redirectURI?: string
  ) {
    return super.login(authProviderID, redirectURI)
  }
  public async fetchUser<TUser extends PublicUser = PublicUser>(
    options?: FetchUserRequestOptions
  ) {
    return super.fetchUser<TUser>(options)
  }
  public withHeaders = (headers: { [key: string]: string }) => {
    return new WunderGraphClient({
      ...this.options,
      extraHeaders: headers,
    })
  }
}

export const createClient = (config?: CreateClientConfig) => {
  return new WunderGraphClient({
    ...defaultClientConfig,
    ...config,
    operationMetadata,
    csrfEnabled: false,
  })
}

export type Queries = {
  'countries/CountryByCode': {
    input: CountriesCountryByCodeInput
    response: {
      data?: CountriesCountryByCodeResponse['data']
      error?: ClientOperationErrors
    }
    requiresAuthentication: false
    liveQuery: boolean
  }
  'todos/getAllTodosForCurrentUser': {
    input: TodosGetAllTodosForCurrentUserInput
    response: {
      data?: TodosGetAllTodosForCurrentUserResponse['data']
      error?: ClientOperationErrors
    }
    requiresAuthentication: false
    liveQuery: boolean
  }
  'openai/extract-website-metadata': {
    input: OpenaiExtract_website_metadataInput
    response: {
      data?: OpenaiExtract_website_metadataResponseData
      error?: OperationErrors['openai/extract-website-metadata']
    }
    requiresAuthentication: false
    liveQuery: boolean
  }
  'openai/load-url': {
    input: OpenaiLoad_urlInput
    response: {
      data?: OpenaiLoad_urlResponseData
      error?: OperationErrors['openai/load-url']
    }
    requiresAuthentication: false
    liveQuery: boolean
  }
  'openai/summarize-url-content': {
    input: OpenaiSummarize_url_contentInput
    response: {
      data?: OpenaiSummarize_url_contentResponseData
      error?: OperationErrors['openai/summarize-url-content']
    }
    requiresAuthentication: false
    liveQuery: boolean
  }
  'openai/summary': {
    input: OpenaiSummaryInput
    response: {
      data?: OpenaiSummaryResponseData
      error?: OperationErrors['openai/summary']
    }
    requiresAuthentication: false
    liveQuery: boolean
  }
  'openai/weather': {
    input: OpenaiWeatherInput
    response: {
      data?: OpenaiWeatherResponseData
      error?: OperationErrors['openai/weather']
    }
    requiresAuthentication: false
    liveQuery: boolean
  }
  'users/get': {
    input: UsersGetInput
    response: {
      data?: UsersGetResponseData
      error?: OperationErrors['users/get']
    }
    requiresAuthentication: false
    liveQuery: boolean
  }
}

export type Mutations = {
  'todos/addTodo': {
    input: TodosAddTodoInput
    response: {
      data?: TodosAddTodoResponse['data']
      error?: ClientOperationErrors
    }
    requiresAuthentication: false
  }
  'todos/updateTodo': {
    input: TodosUpdateTodoInput
    response: {
      data?: TodosUpdateTodoResponse['data']
      error?: ClientOperationErrors
    }
    requiresAuthentication: false
  }
  'users/update': {
    input: UsersUpdateInput
    response: {
      data?: UsersUpdateResponseData
      error?: OperationErrors['users/update']
    }
    requiresAuthentication: false
  }
}

export type Subscriptions = {
  'users/subscribe': {
    input: UsersSubscribeInput
    response: {
      data?: UsersSubscribeResponseData
      error?: OperationErrors['users/subscribe']
    }
    requiresAuthentication: false
  }
  'countries/CountryByCode': {
    input: CountriesCountryByCodeInput
    response: {
      data?: CountriesCountryByCodeResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'todos/getAllTodosForCurrentUser': {
    input: TodosGetAllTodosForCurrentUserInput
    response: {
      data?: TodosGetAllTodosForCurrentUserResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/extract-website-metadata': {
    input: OpenaiExtract_website_metadataInput
    response: {
      data?: OpenaiExtract_website_metadataResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/load-url': {
    input: OpenaiLoad_urlInput
    response: {
      data?: OpenaiLoad_urlResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/summarize-url-content': {
    input: OpenaiSummarize_url_contentInput
    response: {
      data?: OpenaiSummarize_url_contentResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/summary': {
    input: OpenaiSummaryInput
    response: {
      data?: OpenaiSummaryResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/weather': {
    input: OpenaiWeatherInput
    response: {
      data?: OpenaiWeatherResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'users/get': {
    input: UsersGetInput
    response: { data?: UsersGetResponse['data']; error?: ClientOperationErrors }
    liveQuery: true
    requiresAuthentication: false
  }
}

export type LiveQueries = {
  'countries/CountryByCode': {
    input: CountriesCountryByCodeInput
    response: {
      data?: CountriesCountryByCodeResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'todos/getAllTodosForCurrentUser': {
    input: TodosGetAllTodosForCurrentUserInput
    response: {
      data?: TodosGetAllTodosForCurrentUserResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/extract-website-metadata': {
    input: OpenaiExtract_website_metadataInput
    response: {
      data?: OpenaiExtract_website_metadataResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/load-url': {
    input: OpenaiLoad_urlInput
    response: {
      data?: OpenaiLoad_urlResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/summarize-url-content': {
    input: OpenaiSummarize_url_contentInput
    response: {
      data?: OpenaiSummarize_url_contentResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/summary': {
    input: OpenaiSummaryInput
    response: {
      data?: OpenaiSummaryResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'openai/weather': {
    input: OpenaiWeatherInput
    response: {
      data?: OpenaiWeatherResponse['data']
      error?: ClientOperationErrors
    }
    liveQuery: true
    requiresAuthentication: false
  }
  'users/get': {
    input: UsersGetInput
    response: { data?: UsersGetResponse['data']; error?: ClientOperationErrors }
    liveQuery: true
    requiresAuthentication: false
  }
}

export interface Operations
  extends OperationsDefinition<
    Queries,
    Mutations,
    Subscriptions,
    LiveQueries,
    UserRole,
    {}
  > {}
