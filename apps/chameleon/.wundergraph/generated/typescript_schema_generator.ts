import type { ExtractResponse } from '@wundergraph/sdk/operations'

import type function_OpenaiExtract_website_metadata from '../operations/openai/extract-website-metadata'
import type function_OpenaiLoad_url from '../operations/openai/load-url'
import type function_OpenaiSummarize_url_content from '../operations/openai/summarize-url-content'
import type function_OpenaiSummary from '../operations/openai/summary'
import type function_OpenaiWeather from '../operations/openai/weather'
import type function_UsersGet from '../operations/users/get'
import type function_UsersSubscribe from '../operations/users/subscribe'
import type function_UsersUpdate from '../operations/users/update'

export type function_OpenaiExtract_website_metadata_Response = ExtractResponse<
  typeof function_OpenaiExtract_website_metadata
>

export type function_OpenaiLoad_url_Response = ExtractResponse<
  typeof function_OpenaiLoad_url
>

export type function_OpenaiSummarize_url_content_Response = ExtractResponse<
  typeof function_OpenaiSummarize_url_content
>

export type function_OpenaiSummary_Response = ExtractResponse<
  typeof function_OpenaiSummary
>

export type function_OpenaiWeather_Response = ExtractResponse<
  typeof function_OpenaiWeather
>

export type function_UsersGet_Response = ExtractResponse<
  typeof function_UsersGet
>

export type function_UsersSubscribe_Response = ExtractResponse<
  typeof function_UsersSubscribe
>

export type function_UsersUpdate_Response = ExtractResponse<
  typeof function_UsersUpdate
>
