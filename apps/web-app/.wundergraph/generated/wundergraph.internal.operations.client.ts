// Code generated by wunderctl. DO NOT EDIT.

import type { OperationsClient, InternalOperationsDefinition } from "@wundergraph/sdk/server";
import type { ClientOperationErrors } from "@wundergraph/sdk/client";
import type { OperationErrors } from "./ts-operation-errors";
import {
	CountriesCountryByCodeResponse,
	CountriesCountryByCodeInput,
	CountriesCountryByCodeInputInternal,
	CountriesCountryByCodeInputInjected,
	CountriesCountryByCodeResponseData,
	TodosAddTodoResponse,
	TodosAddTodoInput,
	TodosAddTodoInputInternal,
	TodosAddTodoInputInjected,
	TodosAddTodoResponseData,
	TodosGetAllTodosForCurrentUserResponse,
	TodosGetAllTodosForCurrentUserInput,
	TodosGetAllTodosForCurrentUserInputInternal,
	TodosGetAllTodosForCurrentUserInputInjected,
	TodosGetAllTodosForCurrentUserResponseData,
	TodosUpdateTodoResponse,
	TodosUpdateTodoInput,
	TodosUpdateTodoInputInternal,
	TodosUpdateTodoInputInjected,
	TodosUpdateTodoResponseData,
	OpenaiExtract_website_metadataResponse,
	OpenaiExtract_website_metadataInput,
	OpenaiExtract_website_metadataInputInternal,
	OpenaiExtract_website_metadataResponseData,
	OpenaiLoad_urlResponse,
	OpenaiLoad_urlInput,
	OpenaiLoad_urlInputInternal,
	OpenaiLoad_urlResponseData,
	OpenaiSummarize_url_contentResponse,
	OpenaiSummarize_url_contentInput,
	OpenaiSummarize_url_contentInputInternal,
	OpenaiSummarize_url_contentResponseData,
	OpenaiSummaryResponse,
	OpenaiSummaryInput,
	OpenaiSummaryInputInternal,
	OpenaiSummaryResponseData,
	OpenaiWeatherResponse,
	OpenaiWeatherInput,
	OpenaiWeatherInputInternal,
	OpenaiWeatherResponseData,
	UsersGetResponse,
	UsersGetInput,
	UsersGetInputInternal,
	UsersGetResponseData,
	UsersSubscribeResponse,
	UsersSubscribeInput,
	UsersSubscribeInputInternal,
	UsersSubscribeResponseData,
	UsersUpdateResponse,
	UsersUpdateInput,
	UsersUpdateInputInternal,
	UsersUpdateResponseData,
} from "./models";

export type Queries = {
	"countries/CountryByCode": {
		input: CountriesCountryByCodeInputInternal;
		response: { data?: CountriesCountryByCodeResponse["data"]; error?: ClientOperationErrors };
	};
	"todos/getAllTodosForCurrentUser": {
		input: TodosGetAllTodosForCurrentUserInputInternal;
		response: { data?: TodosGetAllTodosForCurrentUserResponse["data"]; error?: ClientOperationErrors };
	};
	"openai/extract-website-metadata": {
		input: OpenaiExtract_website_metadataInputInternal;
		response: {
			data?: OpenaiExtract_website_metadataResponseData;
			error?: OperationErrors["openai/extract-website-metadata"];
		};
	};
	"openai/load-url": {
		input: OpenaiLoad_urlInputInternal;
		response: { data?: OpenaiLoad_urlResponseData; error?: OperationErrors["openai/load-url"] };
	};
	"openai/summarize-url-content": {
		input: OpenaiSummarize_url_contentInputInternal;
		response: {
			data?: OpenaiSummarize_url_contentResponseData;
			error?: OperationErrors["openai/summarize-url-content"];
		};
	};
	"openai/summary": {
		input: OpenaiSummaryInputInternal;
		response: { data?: OpenaiSummaryResponseData; error?: OperationErrors["openai/summary"] };
	};
	"openai/weather": {
		input: OpenaiWeatherInputInternal;
		response: { data?: OpenaiWeatherResponseData; error?: OperationErrors["openai/weather"] };
	};
	"users/get": {
		input: UsersGetInputInternal;
		response: { data?: UsersGetResponseData; error?: OperationErrors["users/get"] };
	};
};

export type Mutations = {
	"todos/addTodo": {
		input: TodosAddTodoInputInternal;
		response: { data?: TodosAddTodoResponse["data"]; error?: ClientOperationErrors };
	};
	"todos/updateTodo": {
		input: TodosUpdateTodoInputInternal;
		response: { data?: TodosUpdateTodoResponse["data"]; error?: ClientOperationErrors };
	};
	"users/update": {
		input: UsersUpdateInputInternal;
		response: { data?: UsersUpdateResponseData; error?: OperationErrors["users/update"] };
	};
};

export type Subscriptions = {
	"users/subscribe": {
		input: UsersSubscribeInputInternal;
		response: { data?: UsersSubscribeResponseData; error?: OperationErrors["users/subscribe"] };
	};
};

export type InternalOperations = InternalOperationsDefinition<Queries, Mutations, Subscriptions>;

export type InternalOperationsClient = OperationsClient<InternalOperations>;
