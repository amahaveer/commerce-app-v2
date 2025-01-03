import {
  ActionContext,
  Request,
  Response,
  Account,
} from '@royalcyber/global-types';
import { WishlistService } from '../services/WishlistService';
import { Guid } from '../utils/Guid';
import { getClientType, getCurrency, getLocale } from '../utils/Request';
import { AccountAuthenticationError } from '../errors/AccountAuthenticationError';
import handleError from '../utils/handleError';

type ActionHook = (
  request: Request,
  actionContext: ActionContext,
) => Promise<Response>;

function getWishlistService(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  return new WishlistService(
    actionContext.globalContext,
    getLocale(request),
    getCurrency(request),
    request,
  );
}

function fetchAccountFromSession(request: Request): Account | undefined {
  return request.sessionData?.account;
}

function fetchAccountFromSessionEnsureLoggedIn(request: Request): Account {
  const account = fetchAccountFromSession(request);
  if (!account) {
    throw new AccountAuthenticationError({ message: 'Not logged in.' });
  }
  return account;
}

async function fetchWishlistFromSession(
  request: Request,
  wishlistService: WishlistService,
) {
  if (request.sessionData?.wishlistId !== undefined) {
    try {
      const clientType = getClientType(request);
      return await wishlistService.getById(
        request.sessionData?.wishlistId,
        clientType,
      );
    } catch (error) {
      console.info(
        `Error fetching the wishlist ${request.sessionData.wishlistId}. ${error}`,
      );
    }
  }

  return undefined;
}

async function fetchWishlist(
  request: Request,
  wishlistService: WishlistService,
) {
  const clientType = getClientType(request);
  if (request.sessionData?.wishlistId !== undefined) {
    try {
      return await wishlistService.getById(
        request.sessionData?.wishlistId,
        clientType,
      );
    } catch (error) {
      console.info(
        `Error fetching the wishlist ${request.sessionData.wishlistId}, creating a new one. ${error}`,
      );
    }
  }

  const account = fetchAccountFromSession(request);
  if (account) {
    const wishlistId = request.query.id as string | undefined;
    const accountId = account.accountId as string | undefined;
    if (wishlistId && accountId) {
      return await wishlistService.getByIdForAccount(
        wishlistId,
        accountId,
        clientType,
      );
    }

    const accountWishlists = await wishlistService.getForAccount(
      accountId as string,
      clientType,
    );
    if (accountWishlists.length > 0) {
      return accountWishlists[0];
    }

    return await wishlistService.create(
      {
        accountId: account.accountId,
        name: 'Wishlist',
      },
      clientType,
    );
  }

  return await wishlistService.create(
    {
      anonymousId: Guid.newGuid(),
      name: 'Wishlist',
    },
    clientType,
  );
}

export const getWishlist: ActionHook = async (request, actionContext) => {
  try {
    const wishlistService = getWishlistService(request, actionContext);
    const wishlist = await fetchWishlistFromSession(request, wishlistService);

    return {
      statusCode: 200,
      body: JSON.stringify(wishlist),
      sessionData: {
        ...wishlistService.getSessionData(),
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const createWishlist: ActionHook = async (request, actionContext) => {
  try {
    const clientType = getClientType(request);
    const wishlistService = getWishlistService(request, actionContext);

    const body: {
      name?: string;
    } = JSON.parse(request.body ?? '{}');

    const account = fetchAccountFromSessionEnsureLoggedIn(request);

    const wishlist = await wishlistService.create(
      {
        accountId: account.accountId,
        name: body.name ?? 'Wishlist',
      },
      clientType,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(wishlist),
      sessionData: {
        ...wishlistService.getSessionData(),
        wishlistId: wishlist.wishlistId,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const addToWishlist: ActionHook = async (request, actionContext) => {
  try {
    const clientType = getClientType(request);
    const wishlistService = getWishlistService(request, actionContext);
    const wishlist = await fetchWishlist(request, wishlistService);

    const body: {
      variant?: { sku?: string };
      count?: number;
    } = JSON.parse(request.body ?? '{}');

    const updatedWishlist = await wishlistService.addToWishlist(
      wishlist,
      {
        sku: body?.variant?.sku ?? '',
        count: body.count || 1,
      },
      clientType,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(updatedWishlist),
      sessionData: {
        ...wishlistService.getSessionData(),
        wishlistId: updatedWishlist.wishlistId,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const removeLineItem: ActionHook = async (request, actionContext) => {
  try {
    const clientType = getClientType(request);
    const wishlistService = getWishlistService(request, actionContext);
    const wishlist = await fetchWishlist(request, wishlistService);

    const body: {
      lineItem?: { id?: string };
    } = JSON.parse(request.body ?? '{}');

    const updatedWishlist = await wishlistService.removeLineItem(
      wishlist,
      body.lineItem?.id ?? '',
      clientType,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(updatedWishlist),
      sessionData: {
        ...wishlistService.getSessionData(),
        wishlistId: updatedWishlist.wishlistId,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const deleteWishlist: ActionHook = async (request, actionContext) => {
  try {
    const wishlistService = getWishlistService(request, actionContext);
    const wishlist = await fetchWishlist(request, wishlistService);

    await wishlistService.deleteWishlist(wishlist);

    return {
      statusCode: 200,
      body: JSON.stringify(null),
      sessionData: {
        ...wishlistService.getSessionData(),
        wishlistId: undefined,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateLineItemCount: ActionHook = async (
  request,
  actionContext,
) => {
  try {
    const clientType = getClientType(request);
    const wishlistService = getWishlistService(request, actionContext);
    const wishlist = await fetchWishlist(request, wishlistService);

    const body: {
      lineItem?: { id?: string };
      count?: number;
    } = JSON.parse(request.body ?? '{}');

    const updatedWishlist = await wishlistService.updateLineItemCount(
      wishlist,
      body.lineItem?.id || '',
      body.count || 1,
      clientType,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(updatedWishlist),
      sessionData: {
        ...wishlistService.getSessionData(),
        wishlistId: updatedWishlist.wishlistId,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};
