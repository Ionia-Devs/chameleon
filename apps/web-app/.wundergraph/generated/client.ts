import type {
	ClientConfig,
	CreateClientConfig,
	User,
	UploadRequestOptions,
	OperationMetadata,
	OperationsDefinition,
	OperationRequestOptions,
	SubscriptionRequestOptions,
	SubscriptionEventHandler,
	FetchUserRequestOptions,
	UploadValidationOptions,
	QueryRequestOptions,
	MutationRequestOptions,
	ClientOperationErrors,
	ExtractProfileName,
	ExtractMeta,
	GraphQLError,
} from "@wundergraph/sdk/client";
import { Client } from "@wundergraph/sdk/client";
import type { OperationErrors } from "./ts-operation-errors";

import type { PublicCustomClaims } from "./claims";
import type {
	CountriesContinentResponse,
	CountriesContinentInput,
	CountriesContinentResponseData,
	CountriesContinentsResponse,
	CountriesContinentsInput,
	CountriesContinentsResponseData,
	CountriesCountriesResponse,
	CountriesCountriesInput,
	CountriesCountriesResponseData,
	CountriesCountryResponse,
	CountriesCountryInput,
	CountriesCountryResponseData,
	CountriesCountryByCodeResponse,
	CountriesCountryByCodeInput,
	CountriesCountryByCodeResponseData,
	CountriesLanguageResponse,
	CountriesLanguageInput,
	CountriesLanguageResponseData,
	CountriesLanguagesResponse,
	CountriesLanguagesInput,
	CountriesLanguagesResponseData,
	DbAggregateAccountResponse,
	DbAggregateAccountInput,
	DbAggregateAccountResponseData,
	DbAggregateInvitationResponse,
	DbAggregateInvitationInput,
	DbAggregateInvitationResponseData,
	DbAggregateMatchResponse,
	DbAggregateMatchInput,
	DbAggregateMatchResponseData,
	DbAggregateMessageResponse,
	DbAggregateMessageInput,
	DbAggregateMessageResponseData,
	DbAggregateNotificationResponse,
	DbAggregateNotificationInput,
	DbAggregateNotificationResponseData,
	DbAggregatePostResponse,
	DbAggregatePostInput,
	DbAggregatePostResponseData,
	DbAggregateReviewResponse,
	DbAggregateReviewInput,
	DbAggregateReviewResponseData,
	DbAggregateScheduleResponse,
	DbAggregateScheduleInput,
	DbAggregateScheduleResponseData,
	DbAggregateSessionResponse,
	DbAggregateSessionInput,
	DbAggregateSessionResponseData,
	DbAggregateTodoResponse,
	DbAggregateTodoInput,
	DbAggregateTodoResponseData,
	DbAggregateUserResponse,
	DbAggregateUserInput,
	DbAggregateUserResponseData,
	DbAggregateVerificationTokenResponse,
	DbAggregateVerificationTokenInput,
	DbAggregateVerificationTokenResponseData,
	DbCreateManyAccountResponse,
	DbCreateManyAccountInput,
	DbCreateManyAccountResponseData,
	DbCreateManyInvitationResponse,
	DbCreateManyInvitationInput,
	DbCreateManyInvitationResponseData,
	DbCreateManyMatchResponse,
	DbCreateManyMatchInput,
	DbCreateManyMatchResponseData,
	DbCreateManyMessageResponse,
	DbCreateManyMessageInput,
	DbCreateManyMessageResponseData,
	DbCreateManyNotificationResponse,
	DbCreateManyNotificationInput,
	DbCreateManyNotificationResponseData,
	DbCreateManyPostResponse,
	DbCreateManyPostInput,
	DbCreateManyPostResponseData,
	DbCreateManyReviewResponse,
	DbCreateManyReviewInput,
	DbCreateManyReviewResponseData,
	DbCreateManyScheduleResponse,
	DbCreateManyScheduleInput,
	DbCreateManyScheduleResponseData,
	DbCreateManySessionResponse,
	DbCreateManySessionInput,
	DbCreateManySessionResponseData,
	DbCreateManyTodoResponse,
	DbCreateManyTodoInput,
	DbCreateManyTodoResponseData,
	DbCreateManyUserResponse,
	DbCreateManyUserInput,
	DbCreateManyUserResponseData,
	DbCreateManyVerificationTokenResponse,
	DbCreateManyVerificationTokenInput,
	DbCreateManyVerificationTokenResponseData,
	DbCreateOneAccountResponse,
	DbCreateOneAccountInput,
	DbCreateOneAccountResponseData,
	DbCreateOneInvitationResponse,
	DbCreateOneInvitationInput,
	DbCreateOneInvitationResponseData,
	DbCreateOneMatchResponse,
	DbCreateOneMatchInput,
	DbCreateOneMatchResponseData,
	DbCreateOneMessageResponse,
	DbCreateOneMessageInput,
	DbCreateOneMessageResponseData,
	DbCreateOneNotificationResponse,
	DbCreateOneNotificationInput,
	DbCreateOneNotificationResponseData,
	DbCreateOnePostResponse,
	DbCreateOnePostInput,
	DbCreateOnePostResponseData,
	DbCreateOneReviewResponse,
	DbCreateOneReviewInput,
	DbCreateOneReviewResponseData,
	DbCreateOneScheduleResponse,
	DbCreateOneScheduleInput,
	DbCreateOneScheduleResponseData,
	DbCreateOneSessionResponse,
	DbCreateOneSessionInput,
	DbCreateOneSessionResponseData,
	DbCreateOneTodoResponse,
	DbCreateOneTodoInput,
	DbCreateOneTodoResponseData,
	DbCreateOneUserResponse,
	DbCreateOneUserInput,
	DbCreateOneUserResponseData,
	DbCreateOneVerificationTokenResponse,
	DbCreateOneVerificationTokenInput,
	DbCreateOneVerificationTokenResponseData,
	DbDeleteManyAccountResponse,
	DbDeleteManyAccountInput,
	DbDeleteManyAccountResponseData,
	DbDeleteManyInvitationResponse,
	DbDeleteManyInvitationInput,
	DbDeleteManyInvitationResponseData,
	DbDeleteManyMatchResponse,
	DbDeleteManyMatchInput,
	DbDeleteManyMatchResponseData,
	DbDeleteManyMessageResponse,
	DbDeleteManyMessageInput,
	DbDeleteManyMessageResponseData,
	DbDeleteManyNotificationResponse,
	DbDeleteManyNotificationInput,
	DbDeleteManyNotificationResponseData,
	DbDeleteManyPostResponse,
	DbDeleteManyPostInput,
	DbDeleteManyPostResponseData,
	DbDeleteManyReviewResponse,
	DbDeleteManyReviewInput,
	DbDeleteManyReviewResponseData,
	DbDeleteManyScheduleResponse,
	DbDeleteManyScheduleInput,
	DbDeleteManyScheduleResponseData,
	DbDeleteManySessionResponse,
	DbDeleteManySessionInput,
	DbDeleteManySessionResponseData,
	DbDeleteManyTodoResponse,
	DbDeleteManyTodoInput,
	DbDeleteManyTodoResponseData,
	DbDeleteManyUserResponse,
	DbDeleteManyUserInput,
	DbDeleteManyUserResponseData,
	DbDeleteManyVerificationTokenResponse,
	DbDeleteManyVerificationTokenInput,
	DbDeleteManyVerificationTokenResponseData,
	DbDeleteOneAccountResponse,
	DbDeleteOneAccountInput,
	DbDeleteOneAccountResponseData,
	DbDeleteOneInvitationResponse,
	DbDeleteOneInvitationInput,
	DbDeleteOneInvitationResponseData,
	DbDeleteOneMatchResponse,
	DbDeleteOneMatchInput,
	DbDeleteOneMatchResponseData,
	DbDeleteOneMessageResponse,
	DbDeleteOneMessageInput,
	DbDeleteOneMessageResponseData,
	DbDeleteOneNotificationResponse,
	DbDeleteOneNotificationInput,
	DbDeleteOneNotificationResponseData,
	DbDeleteOnePostResponse,
	DbDeleteOnePostInput,
	DbDeleteOnePostResponseData,
	DbDeleteOneReviewResponse,
	DbDeleteOneReviewInput,
	DbDeleteOneReviewResponseData,
	DbDeleteOneScheduleResponse,
	DbDeleteOneScheduleInput,
	DbDeleteOneScheduleResponseData,
	DbDeleteOneSessionResponse,
	DbDeleteOneSessionInput,
	DbDeleteOneSessionResponseData,
	DbDeleteOneTodoResponse,
	DbDeleteOneTodoInput,
	DbDeleteOneTodoResponseData,
	DbDeleteOneUserResponse,
	DbDeleteOneUserInput,
	DbDeleteOneUserResponseData,
	DbDeleteOneVerificationTokenResponse,
	DbDeleteOneVerificationTokenInput,
	DbDeleteOneVerificationTokenResponseData,
	DbExecuteRawResponse,
	DbExecuteRawInput,
	DbExecuteRawResponseData,
	DbFindFirstAccountResponse,
	DbFindFirstAccountInput,
	DbFindFirstAccountResponseData,
	DbFindFirstAccountOrThrowResponse,
	DbFindFirstAccountOrThrowInput,
	DbFindFirstAccountOrThrowResponseData,
	DbFindFirstInvitationResponse,
	DbFindFirstInvitationInput,
	DbFindFirstInvitationResponseData,
	DbFindFirstInvitationOrThrowResponse,
	DbFindFirstInvitationOrThrowInput,
	DbFindFirstInvitationOrThrowResponseData,
	DbFindFirstMatchResponse,
	DbFindFirstMatchInput,
	DbFindFirstMatchResponseData,
	DbFindFirstMatchOrThrowResponse,
	DbFindFirstMatchOrThrowInput,
	DbFindFirstMatchOrThrowResponseData,
	DbFindFirstMessageResponse,
	DbFindFirstMessageInput,
	DbFindFirstMessageResponseData,
	DbFindFirstMessageOrThrowResponse,
	DbFindFirstMessageOrThrowInput,
	DbFindFirstMessageOrThrowResponseData,
	DbFindFirstNotificationResponse,
	DbFindFirstNotificationInput,
	DbFindFirstNotificationResponseData,
	DbFindFirstNotificationOrThrowResponse,
	DbFindFirstNotificationOrThrowInput,
	DbFindFirstNotificationOrThrowResponseData,
	DbFindFirstPostResponse,
	DbFindFirstPostInput,
	DbFindFirstPostResponseData,
	DbFindFirstPostOrThrowResponse,
	DbFindFirstPostOrThrowInput,
	DbFindFirstPostOrThrowResponseData,
	DbFindFirstReviewResponse,
	DbFindFirstReviewInput,
	DbFindFirstReviewResponseData,
	DbFindFirstReviewOrThrowResponse,
	DbFindFirstReviewOrThrowInput,
	DbFindFirstReviewOrThrowResponseData,
	DbFindFirstScheduleResponse,
	DbFindFirstScheduleInput,
	DbFindFirstScheduleResponseData,
	DbFindFirstScheduleOrThrowResponse,
	DbFindFirstScheduleOrThrowInput,
	DbFindFirstScheduleOrThrowResponseData,
	DbFindFirstSessionResponse,
	DbFindFirstSessionInput,
	DbFindFirstSessionResponseData,
	DbFindFirstSessionOrThrowResponse,
	DbFindFirstSessionOrThrowInput,
	DbFindFirstSessionOrThrowResponseData,
	DbFindFirstTodoResponse,
	DbFindFirstTodoInput,
	DbFindFirstTodoResponseData,
	DbFindFirstTodoOrThrowResponse,
	DbFindFirstTodoOrThrowInput,
	DbFindFirstTodoOrThrowResponseData,
	DbFindFirstUserResponse,
	DbFindFirstUserInput,
	DbFindFirstUserResponseData,
	DbFindFirstUserOrThrowResponse,
	DbFindFirstUserOrThrowInput,
	DbFindFirstUserOrThrowResponseData,
	DbFindFirstVerificationTokenResponse,
	DbFindFirstVerificationTokenInput,
	DbFindFirstVerificationTokenResponseData,
	DbFindFirstVerificationTokenOrThrowResponse,
	DbFindFirstVerificationTokenOrThrowInput,
	DbFindFirstVerificationTokenOrThrowResponseData,
	DbFindManyAccountResponse,
	DbFindManyAccountInput,
	DbFindManyAccountResponseData,
	DbFindManyInvitationResponse,
	DbFindManyInvitationInput,
	DbFindManyInvitationResponseData,
	DbFindManyMatchResponse,
	DbFindManyMatchInput,
	DbFindManyMatchResponseData,
	DbFindManyMessageResponse,
	DbFindManyMessageInput,
	DbFindManyMessageResponseData,
	DbFindManyNotificationResponse,
	DbFindManyNotificationInput,
	DbFindManyNotificationResponseData,
	DbFindManyPostResponse,
	DbFindManyPostInput,
	DbFindManyPostResponseData,
	DbFindManyReviewResponse,
	DbFindManyReviewInput,
	DbFindManyReviewResponseData,
	DbFindManyScheduleResponse,
	DbFindManyScheduleInput,
	DbFindManyScheduleResponseData,
	DbFindManySessionResponse,
	DbFindManySessionInput,
	DbFindManySessionResponseData,
	DbFindManyTodoResponse,
	DbFindManyTodoInput,
	DbFindManyTodoResponseData,
	DbFindManyUserResponse,
	DbFindManyUserInput,
	DbFindManyUserResponseData,
	DbFindManyVerificationTokenResponse,
	DbFindManyVerificationTokenInput,
	DbFindManyVerificationTokenResponseData,
	DbFindUniqueAccountResponse,
	DbFindUniqueAccountInput,
	DbFindUniqueAccountResponseData,
	DbFindUniqueAccountOrThrowResponse,
	DbFindUniqueAccountOrThrowInput,
	DbFindUniqueAccountOrThrowResponseData,
	DbFindUniqueInvitationResponse,
	DbFindUniqueInvitationInput,
	DbFindUniqueInvitationResponseData,
	DbFindUniqueInvitationOrThrowResponse,
	DbFindUniqueInvitationOrThrowInput,
	DbFindUniqueInvitationOrThrowResponseData,
	DbFindUniqueMatchResponse,
	DbFindUniqueMatchInput,
	DbFindUniqueMatchResponseData,
	DbFindUniqueMatchOrThrowResponse,
	DbFindUniqueMatchOrThrowInput,
	DbFindUniqueMatchOrThrowResponseData,
	DbFindUniqueMessageResponse,
	DbFindUniqueMessageInput,
	DbFindUniqueMessageResponseData,
	DbFindUniqueMessageOrThrowResponse,
	DbFindUniqueMessageOrThrowInput,
	DbFindUniqueMessageOrThrowResponseData,
	DbFindUniqueNotificationResponse,
	DbFindUniqueNotificationInput,
	DbFindUniqueNotificationResponseData,
	DbFindUniqueNotificationOrThrowResponse,
	DbFindUniqueNotificationOrThrowInput,
	DbFindUniqueNotificationOrThrowResponseData,
	DbFindUniquePostResponse,
	DbFindUniquePostInput,
	DbFindUniquePostResponseData,
	DbFindUniquePostOrThrowResponse,
	DbFindUniquePostOrThrowInput,
	DbFindUniquePostOrThrowResponseData,
	DbFindUniqueReviewResponse,
	DbFindUniqueReviewInput,
	DbFindUniqueReviewResponseData,
	DbFindUniqueReviewOrThrowResponse,
	DbFindUniqueReviewOrThrowInput,
	DbFindUniqueReviewOrThrowResponseData,
	DbFindUniqueScheduleResponse,
	DbFindUniqueScheduleInput,
	DbFindUniqueScheduleResponseData,
	DbFindUniqueScheduleOrThrowResponse,
	DbFindUniqueScheduleOrThrowInput,
	DbFindUniqueScheduleOrThrowResponseData,
	DbFindUniqueSessionResponse,
	DbFindUniqueSessionInput,
	DbFindUniqueSessionResponseData,
	DbFindUniqueSessionOrThrowResponse,
	DbFindUniqueSessionOrThrowInput,
	DbFindUniqueSessionOrThrowResponseData,
	DbFindUniqueTodoResponse,
	DbFindUniqueTodoInput,
	DbFindUniqueTodoResponseData,
	DbFindUniqueTodoOrThrowResponse,
	DbFindUniqueTodoOrThrowInput,
	DbFindUniqueTodoOrThrowResponseData,
	DbFindUniqueUserResponse,
	DbFindUniqueUserInput,
	DbFindUniqueUserResponseData,
	DbFindUniqueUserOrThrowResponse,
	DbFindUniqueUserOrThrowInput,
	DbFindUniqueUserOrThrowResponseData,
	DbFindUniqueVerificationTokenResponse,
	DbFindUniqueVerificationTokenInput,
	DbFindUniqueVerificationTokenResponseData,
	DbFindUniqueVerificationTokenOrThrowResponse,
	DbFindUniqueVerificationTokenOrThrowInput,
	DbFindUniqueVerificationTokenOrThrowResponseData,
	DbGroupByAccountResponse,
	DbGroupByAccountInput,
	DbGroupByAccountResponseData,
	DbGroupByInvitationResponse,
	DbGroupByInvitationInput,
	DbGroupByInvitationResponseData,
	DbGroupByMatchResponse,
	DbGroupByMatchInput,
	DbGroupByMatchResponseData,
	DbGroupByMessageResponse,
	DbGroupByMessageInput,
	DbGroupByMessageResponseData,
	DbGroupByNotificationResponse,
	DbGroupByNotificationInput,
	DbGroupByNotificationResponseData,
	DbGroupByPostResponse,
	DbGroupByPostInput,
	DbGroupByPostResponseData,
	DbGroupByReviewResponse,
	DbGroupByReviewInput,
	DbGroupByReviewResponseData,
	DbGroupByScheduleResponse,
	DbGroupByScheduleInput,
	DbGroupByScheduleResponseData,
	DbGroupBySessionResponse,
	DbGroupBySessionInput,
	DbGroupBySessionResponseData,
	DbGroupByTodoResponse,
	DbGroupByTodoInput,
	DbGroupByTodoResponseData,
	DbGroupByUserResponse,
	DbGroupByUserInput,
	DbGroupByUserResponseData,
	DbGroupByVerificationTokenResponse,
	DbGroupByVerificationTokenInput,
	DbGroupByVerificationTokenResponseData,
	DbQueryRawResponse,
	DbQueryRawInput,
	DbQueryRawResponseData,
	DbQueryRawJSONResponse,
	DbQueryRawJSONInput,
	DbQueryRawJSONResponseData,
	DbUpdateManyAccountResponse,
	DbUpdateManyAccountInput,
	DbUpdateManyAccountResponseData,
	DbUpdateManyInvitationResponse,
	DbUpdateManyInvitationInput,
	DbUpdateManyInvitationResponseData,
	DbUpdateManyMatchResponse,
	DbUpdateManyMatchInput,
	DbUpdateManyMatchResponseData,
	DbUpdateManyMessageResponse,
	DbUpdateManyMessageInput,
	DbUpdateManyMessageResponseData,
	DbUpdateManyNotificationResponse,
	DbUpdateManyNotificationInput,
	DbUpdateManyNotificationResponseData,
	DbUpdateManyPostResponse,
	DbUpdateManyPostInput,
	DbUpdateManyPostResponseData,
	DbUpdateManyReviewResponse,
	DbUpdateManyReviewInput,
	DbUpdateManyReviewResponseData,
	DbUpdateManyScheduleResponse,
	DbUpdateManyScheduleInput,
	DbUpdateManyScheduleResponseData,
	DbUpdateManySessionResponse,
	DbUpdateManySessionInput,
	DbUpdateManySessionResponseData,
	DbUpdateManyTodoResponse,
	DbUpdateManyTodoInput,
	DbUpdateManyTodoResponseData,
	DbUpdateManyUserResponse,
	DbUpdateManyUserInput,
	DbUpdateManyUserResponseData,
	DbUpdateManyVerificationTokenResponse,
	DbUpdateManyVerificationTokenInput,
	DbUpdateManyVerificationTokenResponseData,
	DbUpdateOneAccountResponse,
	DbUpdateOneAccountInput,
	DbUpdateOneAccountResponseData,
	DbUpdateOneInvitationResponse,
	DbUpdateOneInvitationInput,
	DbUpdateOneInvitationResponseData,
	DbUpdateOneMatchResponse,
	DbUpdateOneMatchInput,
	DbUpdateOneMatchResponseData,
	DbUpdateOneMessageResponse,
	DbUpdateOneMessageInput,
	DbUpdateOneMessageResponseData,
	DbUpdateOneNotificationResponse,
	DbUpdateOneNotificationInput,
	DbUpdateOneNotificationResponseData,
	DbUpdateOnePostResponse,
	DbUpdateOnePostInput,
	DbUpdateOnePostResponseData,
	DbUpdateOneReviewResponse,
	DbUpdateOneReviewInput,
	DbUpdateOneReviewResponseData,
	DbUpdateOneScheduleResponse,
	DbUpdateOneScheduleInput,
	DbUpdateOneScheduleResponseData,
	DbUpdateOneSessionResponse,
	DbUpdateOneSessionInput,
	DbUpdateOneSessionResponseData,
	DbUpdateOneTodoResponse,
	DbUpdateOneTodoInput,
	DbUpdateOneTodoResponseData,
	DbUpdateOneUserResponse,
	DbUpdateOneUserInput,
	DbUpdateOneUserResponseData,
	DbUpdateOneVerificationTokenResponse,
	DbUpdateOneVerificationTokenInput,
	DbUpdateOneVerificationTokenResponseData,
	DbUpsertOneAccountResponse,
	DbUpsertOneAccountInput,
	DbUpsertOneAccountResponseData,
	DbUpsertOneInvitationResponse,
	DbUpsertOneInvitationInput,
	DbUpsertOneInvitationResponseData,
	DbUpsertOneMatchResponse,
	DbUpsertOneMatchInput,
	DbUpsertOneMatchResponseData,
	DbUpsertOneMessageResponse,
	DbUpsertOneMessageInput,
	DbUpsertOneMessageResponseData,
	DbUpsertOneNotificationResponse,
	DbUpsertOneNotificationInput,
	DbUpsertOneNotificationResponseData,
	DbUpsertOnePostResponse,
	DbUpsertOnePostInput,
	DbUpsertOnePostResponseData,
	DbUpsertOneReviewResponse,
	DbUpsertOneReviewInput,
	DbUpsertOneReviewResponseData,
	DbUpsertOneScheduleResponse,
	DbUpsertOneScheduleInput,
	DbUpsertOneScheduleResponseData,
	DbUpsertOneSessionResponse,
	DbUpsertOneSessionInput,
	DbUpsertOneSessionResponseData,
	DbUpsertOneTodoResponse,
	DbUpsertOneTodoInput,
	DbUpsertOneTodoResponseData,
	DbUpsertOneUserResponse,
	DbUpsertOneUserInput,
	DbUpsertOneUserResponseData,
	DbUpsertOneVerificationTokenResponse,
	DbUpsertOneVerificationTokenInput,
	DbUpsertOneVerificationTokenResponseData,
	TodosAddTodoResponse,
	TodosAddTodoInput,
	TodosAddTodoResponseData,
	TodosGetAllTodosForCurrentUserResponse,
	TodosGetAllTodosForCurrentUserInput,
	TodosGetAllTodosForCurrentUserResponseData,
	TodosUpdateTodoResponse,
	TodosUpdateTodoInput,
	TodosUpdateTodoResponseData,
	WeatherGetCityByIdResponse,
	WeatherGetCityByIdInput,
	WeatherGetCityByIdResponseData,
	WeatherGetCityByNameResponse,
	WeatherGetCityByNameInput,
	WeatherGetCityByNameResponseData,
	OpenaiExtract_website_metadataResponse,
	OpenaiExtract_website_metadataInput,
	OpenaiExtract_website_metadataResponseData,
	OpenaiLoad_urlResponse,
	OpenaiLoad_urlInput,
	OpenaiLoad_urlResponseData,
	OpenaiSummarize_url_contentResponse,
	OpenaiSummarize_url_contentInput,
	OpenaiSummarize_url_contentResponseData,
	OpenaiSummaryResponse,
	OpenaiSummaryInput,
	OpenaiSummaryResponseData,
	OpenaiWeatherResponse,
	OpenaiWeatherInput,
	OpenaiWeatherResponseData,
	UsersGetResponse,
	UsersGetInput,
	UsersGetResponseData,
	UsersSubscribeResponse,
	UsersSubscribeInput,
	UsersSubscribeResponseData,
	UsersUpdateResponse,
	UsersUpdateInput,
	UsersUpdateResponseData,
} from "./models";
export type UserRole = "admin" | "user";

export const WUNDERGRAPH_S3_ENABLED = false;
export const WUNDERGRAPH_AUTH_ENABLED = false;

export const defaultClientConfig: ClientConfig = {
	applicationHash: "d46489be",
	baseURL: "https://your-public-url.com",
	sdkVersion: "0.170.1",
};

export const operationMetadata: OperationMetadata = {
	"countries/Continent": {
		requiresAuthentication: false,
	},
	"countries/Continents": {
		requiresAuthentication: false,
	},
	"countries/Countries": {
		requiresAuthentication: false,
	},
	"countries/Country": {
		requiresAuthentication: false,
	},
	"countries/CountryByCode": {
		requiresAuthentication: false,
	},
	"countries/Language": {
		requiresAuthentication: false,
	},
	"countries/Languages": {
		requiresAuthentication: false,
	},
	"db/AggregateAccount": {
		requiresAuthentication: false,
	},
	"db/AggregateInvitation": {
		requiresAuthentication: false,
	},
	"db/AggregateMatch": {
		requiresAuthentication: false,
	},
	"db/AggregateMessage": {
		requiresAuthentication: false,
	},
	"db/AggregateNotification": {
		requiresAuthentication: false,
	},
	"db/AggregatePost": {
		requiresAuthentication: false,
	},
	"db/AggregateReview": {
		requiresAuthentication: false,
	},
	"db/AggregateSchedule": {
		requiresAuthentication: false,
	},
	"db/AggregateSession": {
		requiresAuthentication: false,
	},
	"db/AggregateTodo": {
		requiresAuthentication: false,
	},
	"db/AggregateUser": {
		requiresAuthentication: false,
	},
	"db/AggregateVerificationToken": {
		requiresAuthentication: false,
	},
	"db/CreateManyAccount": {
		requiresAuthentication: false,
	},
	"db/CreateManyInvitation": {
		requiresAuthentication: false,
	},
	"db/CreateManyMatch": {
		requiresAuthentication: false,
	},
	"db/CreateManyMessage": {
		requiresAuthentication: false,
	},
	"db/CreateManyNotification": {
		requiresAuthentication: false,
	},
	"db/CreateManyPost": {
		requiresAuthentication: false,
	},
	"db/CreateManyReview": {
		requiresAuthentication: false,
	},
	"db/CreateManySchedule": {
		requiresAuthentication: false,
	},
	"db/CreateManySession": {
		requiresAuthentication: false,
	},
	"db/CreateManyTodo": {
		requiresAuthentication: false,
	},
	"db/CreateManyUser": {
		requiresAuthentication: false,
	},
	"db/CreateManyVerificationToken": {
		requiresAuthentication: false,
	},
	"db/CreateOneAccount": {
		requiresAuthentication: false,
	},
	"db/CreateOneInvitation": {
		requiresAuthentication: false,
	},
	"db/CreateOneMatch": {
		requiresAuthentication: false,
	},
	"db/CreateOneMessage": {
		requiresAuthentication: false,
	},
	"db/CreateOneNotification": {
		requiresAuthentication: false,
	},
	"db/CreateOnePost": {
		requiresAuthentication: false,
	},
	"db/CreateOneReview": {
		requiresAuthentication: false,
	},
	"db/CreateOneSchedule": {
		requiresAuthentication: false,
	},
	"db/CreateOneSession": {
		requiresAuthentication: false,
	},
	"db/CreateOneTodo": {
		requiresAuthentication: false,
	},
	"db/CreateOneUser": {
		requiresAuthentication: false,
	},
	"db/CreateOneVerificationToken": {
		requiresAuthentication: false,
	},
	"db/DeleteManyAccount": {
		requiresAuthentication: false,
	},
	"db/DeleteManyInvitation": {
		requiresAuthentication: false,
	},
	"db/DeleteManyMatch": {
		requiresAuthentication: false,
	},
	"db/DeleteManyMessage": {
		requiresAuthentication: false,
	},
	"db/DeleteManyNotification": {
		requiresAuthentication: false,
	},
	"db/DeleteManyPost": {
		requiresAuthentication: false,
	},
	"db/DeleteManyReview": {
		requiresAuthentication: false,
	},
	"db/DeleteManySchedule": {
		requiresAuthentication: false,
	},
	"db/DeleteManySession": {
		requiresAuthentication: false,
	},
	"db/DeleteManyTodo": {
		requiresAuthentication: false,
	},
	"db/DeleteManyUser": {
		requiresAuthentication: false,
	},
	"db/DeleteManyVerificationToken": {
		requiresAuthentication: false,
	},
	"db/DeleteOneAccount": {
		requiresAuthentication: false,
	},
	"db/DeleteOneInvitation": {
		requiresAuthentication: false,
	},
	"db/DeleteOneMatch": {
		requiresAuthentication: false,
	},
	"db/DeleteOneMessage": {
		requiresAuthentication: false,
	},
	"db/DeleteOneNotification": {
		requiresAuthentication: false,
	},
	"db/DeleteOnePost": {
		requiresAuthentication: false,
	},
	"db/DeleteOneReview": {
		requiresAuthentication: false,
	},
	"db/DeleteOneSchedule": {
		requiresAuthentication: false,
	},
	"db/DeleteOneSession": {
		requiresAuthentication: false,
	},
	"db/DeleteOneTodo": {
		requiresAuthentication: false,
	},
	"db/DeleteOneUser": {
		requiresAuthentication: false,
	},
	"db/DeleteOneVerificationToken": {
		requiresAuthentication: false,
	},
	"db/ExecuteRaw": {
		requiresAuthentication: false,
	},
	"db/FindFirstAccount": {
		requiresAuthentication: false,
	},
	"db/FindFirstAccountOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstInvitation": {
		requiresAuthentication: false,
	},
	"db/FindFirstInvitationOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstMatch": {
		requiresAuthentication: false,
	},
	"db/FindFirstMatchOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstMessage": {
		requiresAuthentication: false,
	},
	"db/FindFirstMessageOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstNotification": {
		requiresAuthentication: false,
	},
	"db/FindFirstNotificationOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstPost": {
		requiresAuthentication: false,
	},
	"db/FindFirstPostOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstReview": {
		requiresAuthentication: false,
	},
	"db/FindFirstReviewOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstSchedule": {
		requiresAuthentication: false,
	},
	"db/FindFirstScheduleOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstSession": {
		requiresAuthentication: false,
	},
	"db/FindFirstSessionOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstTodo": {
		requiresAuthentication: false,
	},
	"db/FindFirstTodoOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstUser": {
		requiresAuthentication: false,
	},
	"db/FindFirstUserOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindFirstVerificationToken": {
		requiresAuthentication: false,
	},
	"db/FindFirstVerificationTokenOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindManyAccount": {
		requiresAuthentication: false,
	},
	"db/FindManyInvitation": {
		requiresAuthentication: false,
	},
	"db/FindManyMatch": {
		requiresAuthentication: false,
	},
	"db/FindManyMessage": {
		requiresAuthentication: false,
	},
	"db/FindManyNotification": {
		requiresAuthentication: false,
	},
	"db/FindManyPost": {
		requiresAuthentication: false,
	},
	"db/FindManyReview": {
		requiresAuthentication: false,
	},
	"db/FindManySchedule": {
		requiresAuthentication: false,
	},
	"db/FindManySession": {
		requiresAuthentication: false,
	},
	"db/FindManyTodo": {
		requiresAuthentication: false,
	},
	"db/FindManyUser": {
		requiresAuthentication: false,
	},
	"db/FindManyVerificationToken": {
		requiresAuthentication: false,
	},
	"db/FindUniqueAccount": {
		requiresAuthentication: false,
	},
	"db/FindUniqueAccountOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueInvitation": {
		requiresAuthentication: false,
	},
	"db/FindUniqueInvitationOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueMatch": {
		requiresAuthentication: false,
	},
	"db/FindUniqueMatchOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueMessage": {
		requiresAuthentication: false,
	},
	"db/FindUniqueMessageOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueNotification": {
		requiresAuthentication: false,
	},
	"db/FindUniqueNotificationOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniquePost": {
		requiresAuthentication: false,
	},
	"db/FindUniquePostOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueReview": {
		requiresAuthentication: false,
	},
	"db/FindUniqueReviewOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueSchedule": {
		requiresAuthentication: false,
	},
	"db/FindUniqueScheduleOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueSession": {
		requiresAuthentication: false,
	},
	"db/FindUniqueSessionOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueTodo": {
		requiresAuthentication: false,
	},
	"db/FindUniqueTodoOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueUser": {
		requiresAuthentication: false,
	},
	"db/FindUniqueUserOrThrow": {
		requiresAuthentication: false,
	},
	"db/FindUniqueVerificationToken": {
		requiresAuthentication: false,
	},
	"db/FindUniqueVerificationTokenOrThrow": {
		requiresAuthentication: false,
	},
	"db/GroupByAccount": {
		requiresAuthentication: false,
	},
	"db/GroupByInvitation": {
		requiresAuthentication: false,
	},
	"db/GroupByMatch": {
		requiresAuthentication: false,
	},
	"db/GroupByMessage": {
		requiresAuthentication: false,
	},
	"db/GroupByNotification": {
		requiresAuthentication: false,
	},
	"db/GroupByPost": {
		requiresAuthentication: false,
	},
	"db/GroupByReview": {
		requiresAuthentication: false,
	},
	"db/GroupBySchedule": {
		requiresAuthentication: false,
	},
	"db/GroupBySession": {
		requiresAuthentication: false,
	},
	"db/GroupByTodo": {
		requiresAuthentication: false,
	},
	"db/GroupByUser": {
		requiresAuthentication: false,
	},
	"db/GroupByVerificationToken": {
		requiresAuthentication: false,
	},
	"db/QueryRaw": {
		requiresAuthentication: false,
	},
	"db/QueryRawJSON": {
		requiresAuthentication: false,
	},
	"db/UpdateManyAccount": {
		requiresAuthentication: false,
	},
	"db/UpdateManyInvitation": {
		requiresAuthentication: false,
	},
	"db/UpdateManyMatch": {
		requiresAuthentication: false,
	},
	"db/UpdateManyMessage": {
		requiresAuthentication: false,
	},
	"db/UpdateManyNotification": {
		requiresAuthentication: false,
	},
	"db/UpdateManyPost": {
		requiresAuthentication: false,
	},
	"db/UpdateManyReview": {
		requiresAuthentication: false,
	},
	"db/UpdateManySchedule": {
		requiresAuthentication: false,
	},
	"db/UpdateManySession": {
		requiresAuthentication: false,
	},
	"db/UpdateManyTodo": {
		requiresAuthentication: false,
	},
	"db/UpdateManyUser": {
		requiresAuthentication: false,
	},
	"db/UpdateManyVerificationToken": {
		requiresAuthentication: false,
	},
	"db/UpdateOneAccount": {
		requiresAuthentication: false,
	},
	"db/UpdateOneInvitation": {
		requiresAuthentication: false,
	},
	"db/UpdateOneMatch": {
		requiresAuthentication: false,
	},
	"db/UpdateOneMessage": {
		requiresAuthentication: false,
	},
	"db/UpdateOneNotification": {
		requiresAuthentication: false,
	},
	"db/UpdateOnePost": {
		requiresAuthentication: false,
	},
	"db/UpdateOneReview": {
		requiresAuthentication: false,
	},
	"db/UpdateOneSchedule": {
		requiresAuthentication: false,
	},
	"db/UpdateOneSession": {
		requiresAuthentication: false,
	},
	"db/UpdateOneTodo": {
		requiresAuthentication: false,
	},
	"db/UpdateOneUser": {
		requiresAuthentication: false,
	},
	"db/UpdateOneVerificationToken": {
		requiresAuthentication: false,
	},
	"db/UpsertOneAccount": {
		requiresAuthentication: false,
	},
	"db/UpsertOneInvitation": {
		requiresAuthentication: false,
	},
	"db/UpsertOneMatch": {
		requiresAuthentication: false,
	},
	"db/UpsertOneMessage": {
		requiresAuthentication: false,
	},
	"db/UpsertOneNotification": {
		requiresAuthentication: false,
	},
	"db/UpsertOnePost": {
		requiresAuthentication: false,
	},
	"db/UpsertOneReview": {
		requiresAuthentication: false,
	},
	"db/UpsertOneSchedule": {
		requiresAuthentication: false,
	},
	"db/UpsertOneSession": {
		requiresAuthentication: false,
	},
	"db/UpsertOneTodo": {
		requiresAuthentication: false,
	},
	"db/UpsertOneUser": {
		requiresAuthentication: false,
	},
	"db/UpsertOneVerificationToken": {
		requiresAuthentication: false,
	},
	"todos/addTodo": {
		requiresAuthentication: false,
	},
	"todos/getAllTodosForCurrentUser": {
		requiresAuthentication: false,
	},
	"todos/updateTodo": {
		requiresAuthentication: false,
	},
	"weather/GetCityById": {
		requiresAuthentication: false,
	},
	"weather/GetCityByName": {
		requiresAuthentication: false,
	},
	"openai/extract-website-metadata": {
		requiresAuthentication: false,
	},
	"openai/load-url": {
		requiresAuthentication: false,
	},
	"openai/summarize-url-content": {
		requiresAuthentication: false,
	},
	"openai/summary": {
		requiresAuthentication: false,
	},
	"openai/weather": {
		requiresAuthentication: false,
	},
	"users/get": {
		requiresAuthentication: false,
	},
	"users/subscribe": {
		requiresAuthentication: false,
	},
	"users/update": {
		requiresAuthentication: false,
	},
};

export type PublicUser = User<UserRole, PublicCustomClaims>;

export class WunderGraphClient extends Client {
	query<
		OperationName extends Extract<keyof Operations["queries"], string>,
		Input extends Operations["queries"][OperationName]["input"] = Operations["queries"][OperationName]["input"],
		Response extends Operations["queries"][OperationName]["response"] = Operations["queries"][OperationName]["response"]
	>(options: OperationName extends string ? QueryRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.query<OperationRequestOptions, Response["data"], Response["error"]>(options);
	}

	mutate<
		OperationName extends Extract<keyof Operations["mutations"], string>,
		Input extends Operations["mutations"][OperationName]["input"] = Operations["mutations"][OperationName]["input"],
		Response extends Operations["mutations"][OperationName]["response"] = Operations["mutations"][OperationName]["response"]
	>(options: OperationName extends string ? MutationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.mutate<OperationRequestOptions, Response["data"], Response["error"]>(options);
	}

	subscribe<
		OperationName extends Extract<keyof Operations["subscriptions"], string>,
		Input extends Operations["subscriptions"][OperationName]["input"] = Operations["subscriptions"][OperationName]["input"],
		Response extends Operations["subscriptions"][OperationName]["response"] = Operations["subscriptions"][OperationName]["response"]
	>(
		options: OperationName extends string
			? SubscriptionRequestOptions<OperationName, Input>
			: SubscriptionRequestOptions,
		cb?: SubscriptionEventHandler<Response["data"], Response["error"]>
	) {
		return super.subscribe<OperationRequestOptions, Response["data"], Response["error"]>(options, cb);
	}
	public login(authProviderID: Operations["authProvider"], redirectURI?: string) {
		return super.login(authProviderID, redirectURI);
	}
	public async fetchUser<TUser extends PublicUser = PublicUser>(options?: FetchUserRequestOptions) {
		return super.fetchUser<TUser>(options);
	}
}

export const createClient = (config?: CreateClientConfig) => {
	return new WunderGraphClient({
		...defaultClientConfig,
		...config,
		operationMetadata,
		csrfEnabled: false,
	});
};

export type Queries = {
	"countries/Continent": {
		input: CountriesContinentInput;
		response: { data?: CountriesContinentResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"countries/Continents": {
		input: CountriesContinentsInput;
		response: { data?: CountriesContinentsResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"countries/Countries": {
		input: CountriesCountriesInput;
		response: { data?: CountriesCountriesResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"countries/Country": {
		input: CountriesCountryInput;
		response: { data?: CountriesCountryResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"countries/CountryByCode": {
		input: CountriesCountryByCodeInput;
		response: { data?: CountriesCountryByCodeResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"countries/Language": {
		input: CountriesLanguageInput;
		response: { data?: CountriesLanguageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"countries/Languages": {
		input: CountriesLanguagesInput;
		response: { data?: CountriesLanguagesResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateAccount": {
		input: DbAggregateAccountInput;
		response: { data?: DbAggregateAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateInvitation": {
		input: DbAggregateInvitationInput;
		response: { data?: DbAggregateInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateMatch": {
		input: DbAggregateMatchInput;
		response: { data?: DbAggregateMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateMessage": {
		input: DbAggregateMessageInput;
		response: { data?: DbAggregateMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateNotification": {
		input: DbAggregateNotificationInput;
		response: { data?: DbAggregateNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregatePost": {
		input: DbAggregatePostInput;
		response: { data?: DbAggregatePostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateReview": {
		input: DbAggregateReviewInput;
		response: { data?: DbAggregateReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateSchedule": {
		input: DbAggregateScheduleInput;
		response: { data?: DbAggregateScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateSession": {
		input: DbAggregateSessionInput;
		response: { data?: DbAggregateSessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateTodo": {
		input: DbAggregateTodoInput;
		response: { data?: DbAggregateTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateUser": {
		input: DbAggregateUserInput;
		response: { data?: DbAggregateUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/AggregateVerificationToken": {
		input: DbAggregateVerificationTokenInput;
		response: { data?: DbAggregateVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstAccount": {
		input: DbFindFirstAccountInput;
		response: { data?: DbFindFirstAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstAccountOrThrow": {
		input: DbFindFirstAccountOrThrowInput;
		response: { data?: DbFindFirstAccountOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstInvitation": {
		input: DbFindFirstInvitationInput;
		response: { data?: DbFindFirstInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstInvitationOrThrow": {
		input: DbFindFirstInvitationOrThrowInput;
		response: { data?: DbFindFirstInvitationOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstMatch": {
		input: DbFindFirstMatchInput;
		response: { data?: DbFindFirstMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstMatchOrThrow": {
		input: DbFindFirstMatchOrThrowInput;
		response: { data?: DbFindFirstMatchOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstMessage": {
		input: DbFindFirstMessageInput;
		response: { data?: DbFindFirstMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstMessageOrThrow": {
		input: DbFindFirstMessageOrThrowInput;
		response: { data?: DbFindFirstMessageOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstNotification": {
		input: DbFindFirstNotificationInput;
		response: { data?: DbFindFirstNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstNotificationOrThrow": {
		input: DbFindFirstNotificationOrThrowInput;
		response: { data?: DbFindFirstNotificationOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstPost": {
		input: DbFindFirstPostInput;
		response: { data?: DbFindFirstPostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstPostOrThrow": {
		input: DbFindFirstPostOrThrowInput;
		response: { data?: DbFindFirstPostOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstReview": {
		input: DbFindFirstReviewInput;
		response: { data?: DbFindFirstReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstReviewOrThrow": {
		input: DbFindFirstReviewOrThrowInput;
		response: { data?: DbFindFirstReviewOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstSchedule": {
		input: DbFindFirstScheduleInput;
		response: { data?: DbFindFirstScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstScheduleOrThrow": {
		input: DbFindFirstScheduleOrThrowInput;
		response: { data?: DbFindFirstScheduleOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstSession": {
		input: DbFindFirstSessionInput;
		response: { data?: DbFindFirstSessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstSessionOrThrow": {
		input: DbFindFirstSessionOrThrowInput;
		response: { data?: DbFindFirstSessionOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstTodo": {
		input: DbFindFirstTodoInput;
		response: { data?: DbFindFirstTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstTodoOrThrow": {
		input: DbFindFirstTodoOrThrowInput;
		response: { data?: DbFindFirstTodoOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstUser": {
		input: DbFindFirstUserInput;
		response: { data?: DbFindFirstUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstUserOrThrow": {
		input: DbFindFirstUserOrThrowInput;
		response: { data?: DbFindFirstUserOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstVerificationToken": {
		input: DbFindFirstVerificationTokenInput;
		response: { data?: DbFindFirstVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindFirstVerificationTokenOrThrow": {
		input: DbFindFirstVerificationTokenOrThrowInput;
		response: { data?: DbFindFirstVerificationTokenOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyAccount": {
		input: DbFindManyAccountInput;
		response: { data?: DbFindManyAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyInvitation": {
		input: DbFindManyInvitationInput;
		response: { data?: DbFindManyInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyMatch": {
		input: DbFindManyMatchInput;
		response: { data?: DbFindManyMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyMessage": {
		input: DbFindManyMessageInput;
		response: { data?: DbFindManyMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyNotification": {
		input: DbFindManyNotificationInput;
		response: { data?: DbFindManyNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyPost": {
		input: DbFindManyPostInput;
		response: { data?: DbFindManyPostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyReview": {
		input: DbFindManyReviewInput;
		response: { data?: DbFindManyReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManySchedule": {
		input: DbFindManyScheduleInput;
		response: { data?: DbFindManyScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManySession": {
		input: DbFindManySessionInput;
		response: { data?: DbFindManySessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyTodo": {
		input: DbFindManyTodoInput;
		response: { data?: DbFindManyTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyUser": {
		input: DbFindManyUserInput;
		response: { data?: DbFindManyUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindManyVerificationToken": {
		input: DbFindManyVerificationTokenInput;
		response: { data?: DbFindManyVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueAccount": {
		input: DbFindUniqueAccountInput;
		response: { data?: DbFindUniqueAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueAccountOrThrow": {
		input: DbFindUniqueAccountOrThrowInput;
		response: { data?: DbFindUniqueAccountOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueInvitation": {
		input: DbFindUniqueInvitationInput;
		response: { data?: DbFindUniqueInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueInvitationOrThrow": {
		input: DbFindUniqueInvitationOrThrowInput;
		response: { data?: DbFindUniqueInvitationOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueMatch": {
		input: DbFindUniqueMatchInput;
		response: { data?: DbFindUniqueMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueMatchOrThrow": {
		input: DbFindUniqueMatchOrThrowInput;
		response: { data?: DbFindUniqueMatchOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueMessage": {
		input: DbFindUniqueMessageInput;
		response: { data?: DbFindUniqueMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueMessageOrThrow": {
		input: DbFindUniqueMessageOrThrowInput;
		response: { data?: DbFindUniqueMessageOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueNotification": {
		input: DbFindUniqueNotificationInput;
		response: { data?: DbFindUniqueNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueNotificationOrThrow": {
		input: DbFindUniqueNotificationOrThrowInput;
		response: { data?: DbFindUniqueNotificationOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniquePost": {
		input: DbFindUniquePostInput;
		response: { data?: DbFindUniquePostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniquePostOrThrow": {
		input: DbFindUniquePostOrThrowInput;
		response: { data?: DbFindUniquePostOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueReview": {
		input: DbFindUniqueReviewInput;
		response: { data?: DbFindUniqueReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueReviewOrThrow": {
		input: DbFindUniqueReviewOrThrowInput;
		response: { data?: DbFindUniqueReviewOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueSchedule": {
		input: DbFindUniqueScheduleInput;
		response: { data?: DbFindUniqueScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueScheduleOrThrow": {
		input: DbFindUniqueScheduleOrThrowInput;
		response: { data?: DbFindUniqueScheduleOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueSession": {
		input: DbFindUniqueSessionInput;
		response: { data?: DbFindUniqueSessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueSessionOrThrow": {
		input: DbFindUniqueSessionOrThrowInput;
		response: { data?: DbFindUniqueSessionOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueTodo": {
		input: DbFindUniqueTodoInput;
		response: { data?: DbFindUniqueTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueTodoOrThrow": {
		input: DbFindUniqueTodoOrThrowInput;
		response: { data?: DbFindUniqueTodoOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueUser": {
		input: DbFindUniqueUserInput;
		response: { data?: DbFindUniqueUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueUserOrThrow": {
		input: DbFindUniqueUserOrThrowInput;
		response: { data?: DbFindUniqueUserOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueVerificationToken": {
		input: DbFindUniqueVerificationTokenInput;
		response: { data?: DbFindUniqueVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/FindUniqueVerificationTokenOrThrow": {
		input: DbFindUniqueVerificationTokenOrThrowInput;
		response: { data?: DbFindUniqueVerificationTokenOrThrowResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByAccount": {
		input: DbGroupByAccountInput;
		response: { data?: DbGroupByAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByInvitation": {
		input: DbGroupByInvitationInput;
		response: { data?: DbGroupByInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByMatch": {
		input: DbGroupByMatchInput;
		response: { data?: DbGroupByMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByMessage": {
		input: DbGroupByMessageInput;
		response: { data?: DbGroupByMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByNotification": {
		input: DbGroupByNotificationInput;
		response: { data?: DbGroupByNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByPost": {
		input: DbGroupByPostInput;
		response: { data?: DbGroupByPostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByReview": {
		input: DbGroupByReviewInput;
		response: { data?: DbGroupByReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupBySchedule": {
		input: DbGroupByScheduleInput;
		response: { data?: DbGroupByScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupBySession": {
		input: DbGroupBySessionInput;
		response: { data?: DbGroupBySessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByTodo": {
		input: DbGroupByTodoInput;
		response: { data?: DbGroupByTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByUser": {
		input: DbGroupByUserInput;
		response: { data?: DbGroupByUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/GroupByVerificationToken": {
		input: DbGroupByVerificationTokenInput;
		response: { data?: DbGroupByVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/QueryRaw": {
		input: DbQueryRawInput;
		response: { data?: DbQueryRawResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"db/QueryRawJSON": {
		input: DbQueryRawJSONInput;
		response: { data?: DbQueryRawJSONResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"todos/getAllTodosForCurrentUser": {
		input: TodosGetAllTodosForCurrentUserInput;
		response: { data?: TodosGetAllTodosForCurrentUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"weather/GetCityById": {
		input: WeatherGetCityByIdInput;
		response: { data?: WeatherGetCityByIdResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"weather/GetCityByName": {
		input: WeatherGetCityByNameInput;
		response: { data?: WeatherGetCityByNameResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"openai/extract-website-metadata": {
		input: OpenaiExtract_website_metadataInput;
		response: {
			data?: OpenaiExtract_website_metadataResponseData;
			error?: OperationErrors["openai/extract-website-metadata"];
		};
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"openai/load-url": {
		input: OpenaiLoad_urlInput;
		response: { data?: OpenaiLoad_urlResponseData; error?: OperationErrors["openai/load-url"] };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"openai/summarize-url-content": {
		input: OpenaiSummarize_url_contentInput;
		response: {
			data?: OpenaiSummarize_url_contentResponseData;
			error?: OperationErrors["openai/summarize-url-content"];
		};
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"openai/summary": {
		input: OpenaiSummaryInput;
		response: { data?: OpenaiSummaryResponseData; error?: OperationErrors["openai/summary"] };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"openai/weather": {
		input: OpenaiWeatherInput;
		response: { data?: OpenaiWeatherResponseData; error?: OperationErrors["openai/weather"] };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"users/get": {
		input: UsersGetInput;
		response: { data?: UsersGetResponseData; error?: OperationErrors["users/get"] };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
};

export type Mutations = {
	"db/CreateManyAccount": {
		input: DbCreateManyAccountInput;
		response: { data?: DbCreateManyAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyInvitation": {
		input: DbCreateManyInvitationInput;
		response: { data?: DbCreateManyInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyMatch": {
		input: DbCreateManyMatchInput;
		response: { data?: DbCreateManyMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyMessage": {
		input: DbCreateManyMessageInput;
		response: { data?: DbCreateManyMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyNotification": {
		input: DbCreateManyNotificationInput;
		response: { data?: DbCreateManyNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyPost": {
		input: DbCreateManyPostInput;
		response: { data?: DbCreateManyPostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyReview": {
		input: DbCreateManyReviewInput;
		response: { data?: DbCreateManyReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManySchedule": {
		input: DbCreateManyScheduleInput;
		response: { data?: DbCreateManyScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManySession": {
		input: DbCreateManySessionInput;
		response: { data?: DbCreateManySessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyTodo": {
		input: DbCreateManyTodoInput;
		response: { data?: DbCreateManyTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyUser": {
		input: DbCreateManyUserInput;
		response: { data?: DbCreateManyUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateManyVerificationToken": {
		input: DbCreateManyVerificationTokenInput;
		response: { data?: DbCreateManyVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneAccount": {
		input: DbCreateOneAccountInput;
		response: { data?: DbCreateOneAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneInvitation": {
		input: DbCreateOneInvitationInput;
		response: { data?: DbCreateOneInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneMatch": {
		input: DbCreateOneMatchInput;
		response: { data?: DbCreateOneMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneMessage": {
		input: DbCreateOneMessageInput;
		response: { data?: DbCreateOneMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneNotification": {
		input: DbCreateOneNotificationInput;
		response: { data?: DbCreateOneNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOnePost": {
		input: DbCreateOnePostInput;
		response: { data?: DbCreateOnePostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneReview": {
		input: DbCreateOneReviewInput;
		response: { data?: DbCreateOneReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneSchedule": {
		input: DbCreateOneScheduleInput;
		response: { data?: DbCreateOneScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneSession": {
		input: DbCreateOneSessionInput;
		response: { data?: DbCreateOneSessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneTodo": {
		input: DbCreateOneTodoInput;
		response: { data?: DbCreateOneTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneUser": {
		input: DbCreateOneUserInput;
		response: { data?: DbCreateOneUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/CreateOneVerificationToken": {
		input: DbCreateOneVerificationTokenInput;
		response: { data?: DbCreateOneVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyAccount": {
		input: DbDeleteManyAccountInput;
		response: { data?: DbDeleteManyAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyInvitation": {
		input: DbDeleteManyInvitationInput;
		response: { data?: DbDeleteManyInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyMatch": {
		input: DbDeleteManyMatchInput;
		response: { data?: DbDeleteManyMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyMessage": {
		input: DbDeleteManyMessageInput;
		response: { data?: DbDeleteManyMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyNotification": {
		input: DbDeleteManyNotificationInput;
		response: { data?: DbDeleteManyNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyPost": {
		input: DbDeleteManyPostInput;
		response: { data?: DbDeleteManyPostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyReview": {
		input: DbDeleteManyReviewInput;
		response: { data?: DbDeleteManyReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManySchedule": {
		input: DbDeleteManyScheduleInput;
		response: { data?: DbDeleteManyScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManySession": {
		input: DbDeleteManySessionInput;
		response: { data?: DbDeleteManySessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyTodo": {
		input: DbDeleteManyTodoInput;
		response: { data?: DbDeleteManyTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyUser": {
		input: DbDeleteManyUserInput;
		response: { data?: DbDeleteManyUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteManyVerificationToken": {
		input: DbDeleteManyVerificationTokenInput;
		response: { data?: DbDeleteManyVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneAccount": {
		input: DbDeleteOneAccountInput;
		response: { data?: DbDeleteOneAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneInvitation": {
		input: DbDeleteOneInvitationInput;
		response: { data?: DbDeleteOneInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneMatch": {
		input: DbDeleteOneMatchInput;
		response: { data?: DbDeleteOneMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneMessage": {
		input: DbDeleteOneMessageInput;
		response: { data?: DbDeleteOneMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneNotification": {
		input: DbDeleteOneNotificationInput;
		response: { data?: DbDeleteOneNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOnePost": {
		input: DbDeleteOnePostInput;
		response: { data?: DbDeleteOnePostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneReview": {
		input: DbDeleteOneReviewInput;
		response: { data?: DbDeleteOneReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneSchedule": {
		input: DbDeleteOneScheduleInput;
		response: { data?: DbDeleteOneScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneSession": {
		input: DbDeleteOneSessionInput;
		response: { data?: DbDeleteOneSessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneTodo": {
		input: DbDeleteOneTodoInput;
		response: { data?: DbDeleteOneTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneUser": {
		input: DbDeleteOneUserInput;
		response: { data?: DbDeleteOneUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/DeleteOneVerificationToken": {
		input: DbDeleteOneVerificationTokenInput;
		response: { data?: DbDeleteOneVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/ExecuteRaw": {
		input: DbExecuteRawInput;
		response: { data?: DbExecuteRawResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyAccount": {
		input: DbUpdateManyAccountInput;
		response: { data?: DbUpdateManyAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyInvitation": {
		input: DbUpdateManyInvitationInput;
		response: { data?: DbUpdateManyInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyMatch": {
		input: DbUpdateManyMatchInput;
		response: { data?: DbUpdateManyMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyMessage": {
		input: DbUpdateManyMessageInput;
		response: { data?: DbUpdateManyMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyNotification": {
		input: DbUpdateManyNotificationInput;
		response: { data?: DbUpdateManyNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyPost": {
		input: DbUpdateManyPostInput;
		response: { data?: DbUpdateManyPostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyReview": {
		input: DbUpdateManyReviewInput;
		response: { data?: DbUpdateManyReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManySchedule": {
		input: DbUpdateManyScheduleInput;
		response: { data?: DbUpdateManyScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManySession": {
		input: DbUpdateManySessionInput;
		response: { data?: DbUpdateManySessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyTodo": {
		input: DbUpdateManyTodoInput;
		response: { data?: DbUpdateManyTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyUser": {
		input: DbUpdateManyUserInput;
		response: { data?: DbUpdateManyUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateManyVerificationToken": {
		input: DbUpdateManyVerificationTokenInput;
		response: { data?: DbUpdateManyVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneAccount": {
		input: DbUpdateOneAccountInput;
		response: { data?: DbUpdateOneAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneInvitation": {
		input: DbUpdateOneInvitationInput;
		response: { data?: DbUpdateOneInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneMatch": {
		input: DbUpdateOneMatchInput;
		response: { data?: DbUpdateOneMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneMessage": {
		input: DbUpdateOneMessageInput;
		response: { data?: DbUpdateOneMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneNotification": {
		input: DbUpdateOneNotificationInput;
		response: { data?: DbUpdateOneNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOnePost": {
		input: DbUpdateOnePostInput;
		response: { data?: DbUpdateOnePostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneReview": {
		input: DbUpdateOneReviewInput;
		response: { data?: DbUpdateOneReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneSchedule": {
		input: DbUpdateOneScheduleInput;
		response: { data?: DbUpdateOneScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneSession": {
		input: DbUpdateOneSessionInput;
		response: { data?: DbUpdateOneSessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneTodo": {
		input: DbUpdateOneTodoInput;
		response: { data?: DbUpdateOneTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneUser": {
		input: DbUpdateOneUserInput;
		response: { data?: DbUpdateOneUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpdateOneVerificationToken": {
		input: DbUpdateOneVerificationTokenInput;
		response: { data?: DbUpdateOneVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneAccount": {
		input: DbUpsertOneAccountInput;
		response: { data?: DbUpsertOneAccountResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneInvitation": {
		input: DbUpsertOneInvitationInput;
		response: { data?: DbUpsertOneInvitationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneMatch": {
		input: DbUpsertOneMatchInput;
		response: { data?: DbUpsertOneMatchResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneMessage": {
		input: DbUpsertOneMessageInput;
		response: { data?: DbUpsertOneMessageResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneNotification": {
		input: DbUpsertOneNotificationInput;
		response: { data?: DbUpsertOneNotificationResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOnePost": {
		input: DbUpsertOnePostInput;
		response: { data?: DbUpsertOnePostResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneReview": {
		input: DbUpsertOneReviewInput;
		response: { data?: DbUpsertOneReviewResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneSchedule": {
		input: DbUpsertOneScheduleInput;
		response: { data?: DbUpsertOneScheduleResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneSession": {
		input: DbUpsertOneSessionInput;
		response: { data?: DbUpsertOneSessionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneTodo": {
		input: DbUpsertOneTodoInput;
		response: { data?: DbUpsertOneTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneUser": {
		input: DbUpsertOneUserInput;
		response: { data?: DbUpsertOneUserResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"db/UpsertOneVerificationToken": {
		input: DbUpsertOneVerificationTokenInput;
		response: { data?: DbUpsertOneVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"todos/addTodo": {
		input: TodosAddTodoInput;
		response: { data?: TodosAddTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"todos/updateTodo": {
		input: TodosUpdateTodoInput;
		response: { data?: TodosUpdateTodoResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	"users/update": {
		input: UsersUpdateInput;
		response: { data?: UsersUpdateResponseData; error?: OperationErrors["users/update"] };
		requiresAuthentication: false;
	};
};

export type Subscriptions = {
	"users/subscribe": {
		input: UsersSubscribeInput;
		response: { data?: UsersSubscribeResponseData; error?: OperationErrors["users/subscribe"] };
		requiresAuthentication: false;
	};
	"countries/Continent": {
		input: CountriesContinentInput;
		response: { data?: CountriesContinentResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Continents": {
		input: CountriesContinentsInput;
		response: { data?: CountriesContinentsResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Countries": {
		input: CountriesCountriesInput;
		response: { data?: CountriesCountriesResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Country": {
		input: CountriesCountryInput;
		response: { data?: CountriesCountryResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/CountryByCode": {
		input: CountriesCountryByCodeInput;
		response: { data?: CountriesCountryByCodeResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Language": {
		input: CountriesLanguageInput;
		response: { data?: CountriesLanguageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Languages": {
		input: CountriesLanguagesInput;
		response: { data?: CountriesLanguagesResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateAccount": {
		input: DbAggregateAccountInput;
		response: { data?: DbAggregateAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateInvitation": {
		input: DbAggregateInvitationInput;
		response: { data?: DbAggregateInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateMatch": {
		input: DbAggregateMatchInput;
		response: { data?: DbAggregateMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateMessage": {
		input: DbAggregateMessageInput;
		response: { data?: DbAggregateMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateNotification": {
		input: DbAggregateNotificationInput;
		response: { data?: DbAggregateNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregatePost": {
		input: DbAggregatePostInput;
		response: { data?: DbAggregatePostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateReview": {
		input: DbAggregateReviewInput;
		response: { data?: DbAggregateReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateSchedule": {
		input: DbAggregateScheduleInput;
		response: { data?: DbAggregateScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateSession": {
		input: DbAggregateSessionInput;
		response: { data?: DbAggregateSessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateTodo": {
		input: DbAggregateTodoInput;
		response: { data?: DbAggregateTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateUser": {
		input: DbAggregateUserInput;
		response: { data?: DbAggregateUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateVerificationToken": {
		input: DbAggregateVerificationTokenInput;
		response: { data?: DbAggregateVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstAccount": {
		input: DbFindFirstAccountInput;
		response: { data?: DbFindFirstAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstAccountOrThrow": {
		input: DbFindFirstAccountOrThrowInput;
		response: { data?: DbFindFirstAccountOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstInvitation": {
		input: DbFindFirstInvitationInput;
		response: { data?: DbFindFirstInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstInvitationOrThrow": {
		input: DbFindFirstInvitationOrThrowInput;
		response: { data?: DbFindFirstInvitationOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstMatch": {
		input: DbFindFirstMatchInput;
		response: { data?: DbFindFirstMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstMatchOrThrow": {
		input: DbFindFirstMatchOrThrowInput;
		response: { data?: DbFindFirstMatchOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstMessage": {
		input: DbFindFirstMessageInput;
		response: { data?: DbFindFirstMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstMessageOrThrow": {
		input: DbFindFirstMessageOrThrowInput;
		response: { data?: DbFindFirstMessageOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstNotification": {
		input: DbFindFirstNotificationInput;
		response: { data?: DbFindFirstNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstNotificationOrThrow": {
		input: DbFindFirstNotificationOrThrowInput;
		response: { data?: DbFindFirstNotificationOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstPost": {
		input: DbFindFirstPostInput;
		response: { data?: DbFindFirstPostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstPostOrThrow": {
		input: DbFindFirstPostOrThrowInput;
		response: { data?: DbFindFirstPostOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstReview": {
		input: DbFindFirstReviewInput;
		response: { data?: DbFindFirstReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstReviewOrThrow": {
		input: DbFindFirstReviewOrThrowInput;
		response: { data?: DbFindFirstReviewOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstSchedule": {
		input: DbFindFirstScheduleInput;
		response: { data?: DbFindFirstScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstScheduleOrThrow": {
		input: DbFindFirstScheduleOrThrowInput;
		response: { data?: DbFindFirstScheduleOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstSession": {
		input: DbFindFirstSessionInput;
		response: { data?: DbFindFirstSessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstSessionOrThrow": {
		input: DbFindFirstSessionOrThrowInput;
		response: { data?: DbFindFirstSessionOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstTodo": {
		input: DbFindFirstTodoInput;
		response: { data?: DbFindFirstTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstTodoOrThrow": {
		input: DbFindFirstTodoOrThrowInput;
		response: { data?: DbFindFirstTodoOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstUser": {
		input: DbFindFirstUserInput;
		response: { data?: DbFindFirstUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstUserOrThrow": {
		input: DbFindFirstUserOrThrowInput;
		response: { data?: DbFindFirstUserOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstVerificationToken": {
		input: DbFindFirstVerificationTokenInput;
		response: { data?: DbFindFirstVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstVerificationTokenOrThrow": {
		input: DbFindFirstVerificationTokenOrThrowInput;
		response: { data?: DbFindFirstVerificationTokenOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyAccount": {
		input: DbFindManyAccountInput;
		response: { data?: DbFindManyAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyInvitation": {
		input: DbFindManyInvitationInput;
		response: { data?: DbFindManyInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyMatch": {
		input: DbFindManyMatchInput;
		response: { data?: DbFindManyMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyMessage": {
		input: DbFindManyMessageInput;
		response: { data?: DbFindManyMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyNotification": {
		input: DbFindManyNotificationInput;
		response: { data?: DbFindManyNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyPost": {
		input: DbFindManyPostInput;
		response: { data?: DbFindManyPostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyReview": {
		input: DbFindManyReviewInput;
		response: { data?: DbFindManyReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManySchedule": {
		input: DbFindManyScheduleInput;
		response: { data?: DbFindManyScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManySession": {
		input: DbFindManySessionInput;
		response: { data?: DbFindManySessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyTodo": {
		input: DbFindManyTodoInput;
		response: { data?: DbFindManyTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyUser": {
		input: DbFindManyUserInput;
		response: { data?: DbFindManyUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyVerificationToken": {
		input: DbFindManyVerificationTokenInput;
		response: { data?: DbFindManyVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueAccount": {
		input: DbFindUniqueAccountInput;
		response: { data?: DbFindUniqueAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueAccountOrThrow": {
		input: DbFindUniqueAccountOrThrowInput;
		response: { data?: DbFindUniqueAccountOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueInvitation": {
		input: DbFindUniqueInvitationInput;
		response: { data?: DbFindUniqueInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueInvitationOrThrow": {
		input: DbFindUniqueInvitationOrThrowInput;
		response: { data?: DbFindUniqueInvitationOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueMatch": {
		input: DbFindUniqueMatchInput;
		response: { data?: DbFindUniqueMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueMatchOrThrow": {
		input: DbFindUniqueMatchOrThrowInput;
		response: { data?: DbFindUniqueMatchOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueMessage": {
		input: DbFindUniqueMessageInput;
		response: { data?: DbFindUniqueMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueMessageOrThrow": {
		input: DbFindUniqueMessageOrThrowInput;
		response: { data?: DbFindUniqueMessageOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueNotification": {
		input: DbFindUniqueNotificationInput;
		response: { data?: DbFindUniqueNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueNotificationOrThrow": {
		input: DbFindUniqueNotificationOrThrowInput;
		response: { data?: DbFindUniqueNotificationOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniquePost": {
		input: DbFindUniquePostInput;
		response: { data?: DbFindUniquePostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniquePostOrThrow": {
		input: DbFindUniquePostOrThrowInput;
		response: { data?: DbFindUniquePostOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueReview": {
		input: DbFindUniqueReviewInput;
		response: { data?: DbFindUniqueReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueReviewOrThrow": {
		input: DbFindUniqueReviewOrThrowInput;
		response: { data?: DbFindUniqueReviewOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueSchedule": {
		input: DbFindUniqueScheduleInput;
		response: { data?: DbFindUniqueScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueScheduleOrThrow": {
		input: DbFindUniqueScheduleOrThrowInput;
		response: { data?: DbFindUniqueScheduleOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueSession": {
		input: DbFindUniqueSessionInput;
		response: { data?: DbFindUniqueSessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueSessionOrThrow": {
		input: DbFindUniqueSessionOrThrowInput;
		response: { data?: DbFindUniqueSessionOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueTodo": {
		input: DbFindUniqueTodoInput;
		response: { data?: DbFindUniqueTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueTodoOrThrow": {
		input: DbFindUniqueTodoOrThrowInput;
		response: { data?: DbFindUniqueTodoOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueUser": {
		input: DbFindUniqueUserInput;
		response: { data?: DbFindUniqueUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueUserOrThrow": {
		input: DbFindUniqueUserOrThrowInput;
		response: { data?: DbFindUniqueUserOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueVerificationToken": {
		input: DbFindUniqueVerificationTokenInput;
		response: { data?: DbFindUniqueVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueVerificationTokenOrThrow": {
		input: DbFindUniqueVerificationTokenOrThrowInput;
		response: { data?: DbFindUniqueVerificationTokenOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByAccount": {
		input: DbGroupByAccountInput;
		response: { data?: DbGroupByAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByInvitation": {
		input: DbGroupByInvitationInput;
		response: { data?: DbGroupByInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByMatch": {
		input: DbGroupByMatchInput;
		response: { data?: DbGroupByMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByMessage": {
		input: DbGroupByMessageInput;
		response: { data?: DbGroupByMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByNotification": {
		input: DbGroupByNotificationInput;
		response: { data?: DbGroupByNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByPost": {
		input: DbGroupByPostInput;
		response: { data?: DbGroupByPostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByReview": {
		input: DbGroupByReviewInput;
		response: { data?: DbGroupByReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupBySchedule": {
		input: DbGroupByScheduleInput;
		response: { data?: DbGroupByScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupBySession": {
		input: DbGroupBySessionInput;
		response: { data?: DbGroupBySessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByTodo": {
		input: DbGroupByTodoInput;
		response: { data?: DbGroupByTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByUser": {
		input: DbGroupByUserInput;
		response: { data?: DbGroupByUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByVerificationToken": {
		input: DbGroupByVerificationTokenInput;
		response: { data?: DbGroupByVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/QueryRaw": {
		input: DbQueryRawInput;
		response: { data?: DbQueryRawResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/QueryRawJSON": {
		input: DbQueryRawJSONInput;
		response: { data?: DbQueryRawJSONResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"todos/getAllTodosForCurrentUser": {
		input: TodosGetAllTodosForCurrentUserInput;
		response: { data?: TodosGetAllTodosForCurrentUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"weather/GetCityById": {
		input: WeatherGetCityByIdInput;
		response: { data?: WeatherGetCityByIdResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"weather/GetCityByName": {
		input: WeatherGetCityByNameInput;
		response: { data?: WeatherGetCityByNameResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/extract-website-metadata": {
		input: OpenaiExtract_website_metadataInput;
		response: { data?: OpenaiExtract_website_metadataResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/load-url": {
		input: OpenaiLoad_urlInput;
		response: { data?: OpenaiLoad_urlResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/summarize-url-content": {
		input: OpenaiSummarize_url_contentInput;
		response: { data?: OpenaiSummarize_url_contentResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/summary": {
		input: OpenaiSummaryInput;
		response: { data?: OpenaiSummaryResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/weather": {
		input: OpenaiWeatherInput;
		response: { data?: OpenaiWeatherResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"users/get": {
		input: UsersGetInput;
		response: { data?: UsersGetResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
};

export type LiveQueries = {
	"countries/Continent": {
		input: CountriesContinentInput;
		response: { data?: CountriesContinentResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Continents": {
		input: CountriesContinentsInput;
		response: { data?: CountriesContinentsResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Countries": {
		input: CountriesCountriesInput;
		response: { data?: CountriesCountriesResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Country": {
		input: CountriesCountryInput;
		response: { data?: CountriesCountryResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/CountryByCode": {
		input: CountriesCountryByCodeInput;
		response: { data?: CountriesCountryByCodeResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Language": {
		input: CountriesLanguageInput;
		response: { data?: CountriesLanguageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"countries/Languages": {
		input: CountriesLanguagesInput;
		response: { data?: CountriesLanguagesResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateAccount": {
		input: DbAggregateAccountInput;
		response: { data?: DbAggregateAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateInvitation": {
		input: DbAggregateInvitationInput;
		response: { data?: DbAggregateInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateMatch": {
		input: DbAggregateMatchInput;
		response: { data?: DbAggregateMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateMessage": {
		input: DbAggregateMessageInput;
		response: { data?: DbAggregateMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateNotification": {
		input: DbAggregateNotificationInput;
		response: { data?: DbAggregateNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregatePost": {
		input: DbAggregatePostInput;
		response: { data?: DbAggregatePostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateReview": {
		input: DbAggregateReviewInput;
		response: { data?: DbAggregateReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateSchedule": {
		input: DbAggregateScheduleInput;
		response: { data?: DbAggregateScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateSession": {
		input: DbAggregateSessionInput;
		response: { data?: DbAggregateSessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateTodo": {
		input: DbAggregateTodoInput;
		response: { data?: DbAggregateTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateUser": {
		input: DbAggregateUserInput;
		response: { data?: DbAggregateUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/AggregateVerificationToken": {
		input: DbAggregateVerificationTokenInput;
		response: { data?: DbAggregateVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstAccount": {
		input: DbFindFirstAccountInput;
		response: { data?: DbFindFirstAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstAccountOrThrow": {
		input: DbFindFirstAccountOrThrowInput;
		response: { data?: DbFindFirstAccountOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstInvitation": {
		input: DbFindFirstInvitationInput;
		response: { data?: DbFindFirstInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstInvitationOrThrow": {
		input: DbFindFirstInvitationOrThrowInput;
		response: { data?: DbFindFirstInvitationOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstMatch": {
		input: DbFindFirstMatchInput;
		response: { data?: DbFindFirstMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstMatchOrThrow": {
		input: DbFindFirstMatchOrThrowInput;
		response: { data?: DbFindFirstMatchOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstMessage": {
		input: DbFindFirstMessageInput;
		response: { data?: DbFindFirstMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstMessageOrThrow": {
		input: DbFindFirstMessageOrThrowInput;
		response: { data?: DbFindFirstMessageOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstNotification": {
		input: DbFindFirstNotificationInput;
		response: { data?: DbFindFirstNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstNotificationOrThrow": {
		input: DbFindFirstNotificationOrThrowInput;
		response: { data?: DbFindFirstNotificationOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstPost": {
		input: DbFindFirstPostInput;
		response: { data?: DbFindFirstPostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstPostOrThrow": {
		input: DbFindFirstPostOrThrowInput;
		response: { data?: DbFindFirstPostOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstReview": {
		input: DbFindFirstReviewInput;
		response: { data?: DbFindFirstReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstReviewOrThrow": {
		input: DbFindFirstReviewOrThrowInput;
		response: { data?: DbFindFirstReviewOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstSchedule": {
		input: DbFindFirstScheduleInput;
		response: { data?: DbFindFirstScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstScheduleOrThrow": {
		input: DbFindFirstScheduleOrThrowInput;
		response: { data?: DbFindFirstScheduleOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstSession": {
		input: DbFindFirstSessionInput;
		response: { data?: DbFindFirstSessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstSessionOrThrow": {
		input: DbFindFirstSessionOrThrowInput;
		response: { data?: DbFindFirstSessionOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstTodo": {
		input: DbFindFirstTodoInput;
		response: { data?: DbFindFirstTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstTodoOrThrow": {
		input: DbFindFirstTodoOrThrowInput;
		response: { data?: DbFindFirstTodoOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstUser": {
		input: DbFindFirstUserInput;
		response: { data?: DbFindFirstUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstUserOrThrow": {
		input: DbFindFirstUserOrThrowInput;
		response: { data?: DbFindFirstUserOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstVerificationToken": {
		input: DbFindFirstVerificationTokenInput;
		response: { data?: DbFindFirstVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindFirstVerificationTokenOrThrow": {
		input: DbFindFirstVerificationTokenOrThrowInput;
		response: { data?: DbFindFirstVerificationTokenOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyAccount": {
		input: DbFindManyAccountInput;
		response: { data?: DbFindManyAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyInvitation": {
		input: DbFindManyInvitationInput;
		response: { data?: DbFindManyInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyMatch": {
		input: DbFindManyMatchInput;
		response: { data?: DbFindManyMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyMessage": {
		input: DbFindManyMessageInput;
		response: { data?: DbFindManyMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyNotification": {
		input: DbFindManyNotificationInput;
		response: { data?: DbFindManyNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyPost": {
		input: DbFindManyPostInput;
		response: { data?: DbFindManyPostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyReview": {
		input: DbFindManyReviewInput;
		response: { data?: DbFindManyReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManySchedule": {
		input: DbFindManyScheduleInput;
		response: { data?: DbFindManyScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManySession": {
		input: DbFindManySessionInput;
		response: { data?: DbFindManySessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyTodo": {
		input: DbFindManyTodoInput;
		response: { data?: DbFindManyTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyUser": {
		input: DbFindManyUserInput;
		response: { data?: DbFindManyUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindManyVerificationToken": {
		input: DbFindManyVerificationTokenInput;
		response: { data?: DbFindManyVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueAccount": {
		input: DbFindUniqueAccountInput;
		response: { data?: DbFindUniqueAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueAccountOrThrow": {
		input: DbFindUniqueAccountOrThrowInput;
		response: { data?: DbFindUniqueAccountOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueInvitation": {
		input: DbFindUniqueInvitationInput;
		response: { data?: DbFindUniqueInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueInvitationOrThrow": {
		input: DbFindUniqueInvitationOrThrowInput;
		response: { data?: DbFindUniqueInvitationOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueMatch": {
		input: DbFindUniqueMatchInput;
		response: { data?: DbFindUniqueMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueMatchOrThrow": {
		input: DbFindUniqueMatchOrThrowInput;
		response: { data?: DbFindUniqueMatchOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueMessage": {
		input: DbFindUniqueMessageInput;
		response: { data?: DbFindUniqueMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueMessageOrThrow": {
		input: DbFindUniqueMessageOrThrowInput;
		response: { data?: DbFindUniqueMessageOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueNotification": {
		input: DbFindUniqueNotificationInput;
		response: { data?: DbFindUniqueNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueNotificationOrThrow": {
		input: DbFindUniqueNotificationOrThrowInput;
		response: { data?: DbFindUniqueNotificationOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniquePost": {
		input: DbFindUniquePostInput;
		response: { data?: DbFindUniquePostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniquePostOrThrow": {
		input: DbFindUniquePostOrThrowInput;
		response: { data?: DbFindUniquePostOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueReview": {
		input: DbFindUniqueReviewInput;
		response: { data?: DbFindUniqueReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueReviewOrThrow": {
		input: DbFindUniqueReviewOrThrowInput;
		response: { data?: DbFindUniqueReviewOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueSchedule": {
		input: DbFindUniqueScheduleInput;
		response: { data?: DbFindUniqueScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueScheduleOrThrow": {
		input: DbFindUniqueScheduleOrThrowInput;
		response: { data?: DbFindUniqueScheduleOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueSession": {
		input: DbFindUniqueSessionInput;
		response: { data?: DbFindUniqueSessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueSessionOrThrow": {
		input: DbFindUniqueSessionOrThrowInput;
		response: { data?: DbFindUniqueSessionOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueTodo": {
		input: DbFindUniqueTodoInput;
		response: { data?: DbFindUniqueTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueTodoOrThrow": {
		input: DbFindUniqueTodoOrThrowInput;
		response: { data?: DbFindUniqueTodoOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueUser": {
		input: DbFindUniqueUserInput;
		response: { data?: DbFindUniqueUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueUserOrThrow": {
		input: DbFindUniqueUserOrThrowInput;
		response: { data?: DbFindUniqueUserOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueVerificationToken": {
		input: DbFindUniqueVerificationTokenInput;
		response: { data?: DbFindUniqueVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/FindUniqueVerificationTokenOrThrow": {
		input: DbFindUniqueVerificationTokenOrThrowInput;
		response: { data?: DbFindUniqueVerificationTokenOrThrowResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByAccount": {
		input: DbGroupByAccountInput;
		response: { data?: DbGroupByAccountResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByInvitation": {
		input: DbGroupByInvitationInput;
		response: { data?: DbGroupByInvitationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByMatch": {
		input: DbGroupByMatchInput;
		response: { data?: DbGroupByMatchResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByMessage": {
		input: DbGroupByMessageInput;
		response: { data?: DbGroupByMessageResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByNotification": {
		input: DbGroupByNotificationInput;
		response: { data?: DbGroupByNotificationResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByPost": {
		input: DbGroupByPostInput;
		response: { data?: DbGroupByPostResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByReview": {
		input: DbGroupByReviewInput;
		response: { data?: DbGroupByReviewResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupBySchedule": {
		input: DbGroupByScheduleInput;
		response: { data?: DbGroupByScheduleResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupBySession": {
		input: DbGroupBySessionInput;
		response: { data?: DbGroupBySessionResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByTodo": {
		input: DbGroupByTodoInput;
		response: { data?: DbGroupByTodoResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByUser": {
		input: DbGroupByUserInput;
		response: { data?: DbGroupByUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/GroupByVerificationToken": {
		input: DbGroupByVerificationTokenInput;
		response: { data?: DbGroupByVerificationTokenResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/QueryRaw": {
		input: DbQueryRawInput;
		response: { data?: DbQueryRawResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"db/QueryRawJSON": {
		input: DbQueryRawJSONInput;
		response: { data?: DbQueryRawJSONResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"todos/getAllTodosForCurrentUser": {
		input: TodosGetAllTodosForCurrentUserInput;
		response: { data?: TodosGetAllTodosForCurrentUserResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"weather/GetCityById": {
		input: WeatherGetCityByIdInput;
		response: { data?: WeatherGetCityByIdResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"weather/GetCityByName": {
		input: WeatherGetCityByNameInput;
		response: { data?: WeatherGetCityByNameResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/extract-website-metadata": {
		input: OpenaiExtract_website_metadataInput;
		response: { data?: OpenaiExtract_website_metadataResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/load-url": {
		input: OpenaiLoad_urlInput;
		response: { data?: OpenaiLoad_urlResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/summarize-url-content": {
		input: OpenaiSummarize_url_contentInput;
		response: { data?: OpenaiSummarize_url_contentResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/summary": {
		input: OpenaiSummaryInput;
		response: { data?: OpenaiSummaryResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"openai/weather": {
		input: OpenaiWeatherInput;
		response: { data?: OpenaiWeatherResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"users/get": {
		input: UsersGetInput;
		response: { data?: UsersGetResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
};

export interface Operations
	extends OperationsDefinition<Queries, Mutations, Subscriptions, LiveQueries, UserRole, {}> {}
