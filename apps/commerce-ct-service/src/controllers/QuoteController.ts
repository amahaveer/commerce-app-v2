import {
  ActionContext,
  ClientType,
  Request,
  Response,
  QuoteRequest,
  QuoteQuery,
} from '@royalcyber/global-types';
import { CartFetcher } from '../utils/CartFetcher';
import queryParamsToIds from '../utils/queryParamsToIds';
import queryParamsToStates from '../utils/queryParamsToState';
import handleError from '../utils/handleError';
import parseRequestBody from '../utils/requestHandlers/parseRequestBody';
import { ValidationError } from '../errors/ValidationError';
import parseQueryParams from '../utils/requestHandlers/parseRequestParams';
import queryParamsToSortAttributes from '../utils/requestHandlers/queryParamsToSortAttributes';
import {
  getBusinessUnitKey,
  getCurrency,
  getDistributionChannelId,
  getLocale,
  getSupplyChannelId,
} from '../utils/Request';
import QuoteService from '../services/QuoteService';
import { assertIsAuthenticated } from '../utils/assertIsAuthenticated';
import { fetchAccountFromSession } from '../utils/fetchAccountFromSession';
import { CartService } from '../services/CartService';

type ActionHook = (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => Promise<Response>;

export interface QuoteRequestBody {
  comment: string;
  purchaseOrderNumber?: string;
}

function getQuoteService(request: Request, actionContext: ActionContext) {
  assertIsAuthenticated(request);
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  const account = fetchAccountFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);
  const locale = getLocale(request);
  const currency = getCurrency(request);
  return new QuoteService(
    actionContext.globalContext,
    locale,
    currency,
    account?.accountId,
    businessUnitKey,
  );
}

function getCartService(request: Request, actionContext: ActionContext) {
  assertIsAuthenticated(request);
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  const account = fetchAccountFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);
  const locale = getLocale(request);
  const currency = getCurrency(request);
  const distributionChannelId = getDistributionChannelId(request);
  const supplyChannelId = getSupplyChannelId(request);

  return new CartService(
    actionContext.globalContext,
    locale,
    currency,
    request,
    account?.accountId,
    businessUnitKey,
    distributionChannelId,
    supplyChannelId,
  );
}

export const createQuoteRequest: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const quoteApi = getQuoteService(request, actionContext);
    const cartApi = getCartService(request, actionContext);

    const quoteBody = parseRequestBody<QuoteRequestBody>(request.body);
    let quoteRequest: QuoteRequest = {
      buyerComment: quoteBody?.comment,
      purchaseOrderNumber: quoteBody?.purchaseOrderNumber,
    };

    const cart = await CartFetcher.fetchCart(cartApi, request);

    quoteRequest = await quoteApi.createQuoteRequest(
      quoteRequest,
      cart,
      clientType,
    );

    await cartApi.deleteCart(cart, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(quoteRequest),
      sessionData: {
        ...request.sessionData,
        cartId: undefined,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const query: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const quoteApi = getQuoteService(request, actionContext);

    const quoteQuery: QuoteQuery = {
      limit: request.query?.limit ?? undefined,
      cursor: request.query?.cursor ?? undefined,
      quoteIds: queryParamsToIds('quoteIds', request.query),
      quoteStates: queryParamsToStates('quoteStates', request.query),
      sortAttributes: queryParamsToSortAttributes(request.query),
      query: request.query?.query ?? undefined,
      storeKey: request.query?.storeKey ?? undefined,
    };

    const queryResult = await quoteApi.query(quoteQuery, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(queryResult),
      sessionData: request.sessionData,
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const queryQuoteRequests: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const quoteApi = getQuoteService(request, actionContext);

    const quoteQuery: QuoteQuery = {
      limit: request.query?.limit ?? undefined,
      cursor: request.query?.cursor ?? undefined,
      quoteIds: queryParamsToIds('quoteIds', request.query),
      quoteStates: queryParamsToStates('quoteStates', request.query),
      sortAttributes: queryParamsToSortAttributes(request.query),
      query: request.query?.query ?? undefined,
      storeKey: request.query?.storeKey ?? undefined,
    };

    const queryResult = await quoteApi.queryQuoteRequests(
      quoteQuery,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(queryResult),
      sessionData: request.sessionData,
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const acceptQuote: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const quoteApi = getQuoteService(request, actionContext);

    const { id: quoteId } = parseQueryParams<{ id: string }>(request.query);

    if (!quoteId) {
      throw new ValidationError({ message: 'Quote id is missing.' });
    }

    const quote = await quoteApi.acceptQuote(quoteId, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(quote),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const declineQuote: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const quoteApi = getQuoteService(request, actionContext);

    const { id: quoteId } = parseQueryParams<{ id: string }>(request.query);

    if (!quoteId) {
      throw new ValidationError({ message: 'Quote id is missing.' });
    }

    const quote = await quoteApi.declineQuote(quoteId, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(quote),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const renegotiateQuote: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const quoteApi = getQuoteService(request, actionContext);

    const { id: quoteId } = parseQueryParams<{ id: string }>(request.query);

    const requestBody = parseRequestBody<{ comment: string }>(request.body);
    const buyerComment = requestBody ? requestBody.comment : undefined;

    if (!buyerComment) {
      throw new Error('Buyer comment is required for renegotiating the quote.');
    }

    const quote = await quoteApi.renegotiateQuote(
      quoteId,
      buyerComment,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(quote),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const cancelQuoteRequest: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const quoteApi = getQuoteService(request, actionContext);

    const { id: quoteRequestId } = parseQueryParams<{ id: string }>(
      request.query,
    );

    if (!quoteRequestId) {
      throw new ValidationError({ message: 'QuoteRequest  id is missing.' });
    }

    const quoteRequest = await quoteApi.cancelQuoteRequest(
      quoteRequestId,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(quoteRequest),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};
