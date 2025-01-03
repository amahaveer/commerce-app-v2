import {
  ActionContext,
  ActionHook,
  Request,
  Response,
  StoreQuery,
} from '@royalcyber/global-types';
import { StoreService } from '../services/StoreService';
import { getClientType, getCurrency, getLocale } from '../utils/Request';
import handleError from '../utils/handleError';

function getStoreService(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  return new StoreService(
    actionContext.globalContext,
    getLocale(request),
    getCurrency(request),
    request,
  );
}

export const getStores: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    const storeApi = getStoreService(request, actionContext);

    const storeQuery: StoreQuery = {
      name: request.query?.name ?? undefined,
      limit: request.query?.limit ?? undefined,
      cursor: request.query?.cursor ?? undefined,
      expand: request.query?.expand ?? undefined,
    };

    const result = await storeApi.queryStores(storeQuery, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...storeApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getStore: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const storeId = request.query?.id ?? undefined;
    const clientType = getClientType(request);

    const storeApi = getStoreService(request, actionContext);
    const result = await storeApi.getStore(storeId, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...storeApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};
