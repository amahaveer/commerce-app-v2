import {
  ActionContext,
  Request,
  Response,
  Cart,
  LineItem,
  Address,
  ShippingMethod,
  Payment,
  PaymentStatuses,
  Discount,
  SortAttributes,
  SortOrder,
  OrderQuery,
  CategoryQuery,
  Token,
} from '@royalcyber/global-types';
import { CartFetcher } from '../utils/CartFetcher';
import { CartService } from '../services/CartService';
import { getClientType, getCurrency, getLocale } from '../utils/Request';
// import { EmailApiFactory } from '../utils/EmailApiFactory';
import { AccountAuthenticationError } from '../errors/AccountAuthenticationError';
import queryParamsToStates from '../utils/queryParamsToState';
import queryParamsToIds from '../utils/queryParamsToIds';
import handleError from '../utils/handleError';
import { fetchAccountFromSession } from '../utils/fetchAccountFromSession';
import { CartNotMatchOrderError } from '../errors/CartNotMatchOrderError';
import { ValidationError } from '../errors/ValidationError';

type ActionHook = (
  request: Request,
  actionContext: ActionContext,
) => Promise<Response>;

function getCartService(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  return new CartService(
    actionContext.globalContext,
    getLocale(request),
    getCurrency(request),
    request,
  );
}

function queryParamsToSortAttributes(queryParams: any) {
  const sortAttributes: SortAttributes = {};

  if (queryParams.sortAttributes) {
    let sortAttribute: { [key: string]: SortOrder };

    for (sortAttribute of Object.values(queryParams.sortAttributes) as {
      [key: string]: SortOrder;
    }[]) {
      const key = Object.keys(sortAttribute)[0];
      sortAttributes[key] = sortAttribute[key]
        ? sortAttribute[key]
        : SortOrder.ASCENDING;
    }
  }

  return sortAttributes;
}

async function updateCartFromRequest(
  cartService: CartService,
  request: Request,
): Promise<Cart> {
  const clientType = getClientType(request);
  let cart = await CartFetcher.fetchCart(cartService, request);

  if (request?.body === undefined || request?.body === '') {
    return cart;
  }

  const body: {
    account?: { email?: string };
    shipping?: Address;
    billing?: Address;
  } = JSON.parse(request.body ?? '{}');

  if (body?.account?.email !== undefined) {
    cart = await cartService.setEmail(cart, body.account.email, clientType);
  }

  if (body?.shipping !== undefined || body?.billing !== undefined) {
    const shippingAddress =
      body?.shipping !== undefined ? body.shipping : body.billing;
    const billingAddress =
      body?.billing !== undefined ? body.billing : body.shipping;

    if (shippingAddress) {
      cart = await cartService.setShippingAddress(
        cart,
        shippingAddress,
        clientType,
      );
    }
    if (billingAddress) {
      cart = await cartService.setBillingAddress(
        cart,
        billingAddress,
        clientType,
      );
    }
  }

  return cart;
}

export const getCart: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);
    if (clientType == 'backoffice') {
      try {
        const categoryQuery: CategoryQuery = {
          limit: request.query?.limit ?? undefined,
          cursor: request.query?.cursor ?? undefined,
        };
        // Fetch all carts or a filtered list of carts as required
        const cartList = await cartService.getCarts(clientType, categoryQuery); // Assuming `getCartList` fetches the required data

        return {
          statusCode: 200,
          body: JSON.stringify(cartList),
          sessionData: {
            ...cartService.getSessionData(),
          },
        };
      } catch (error) {
        const errorResponse = error as Error;
        return {
          statusCode: 400,
          message: `Failed to fetch cart list: ${errorResponse.message}`,
        };
      }
    } else {
      try {
        const cart = await CartFetcher.fetchActiveCartFromSession(
          cartService,
          request,
        );

        return {
          statusCode: 200,
          body: cart ? JSON.stringify(cart) : JSON.stringify({}),
          sessionData: {
            ...cartService.getSessionData(),
            ...(cart ? { cartId: cart.cartId } : {}),
          },
        };
      } catch (error) {
        const errorResponse = error as Error;
        return {
          statusCode: 400,
          message: errorResponse.message,
        };
      }
    }
  } catch (error) {
    return handleError(error, request);
  }
};

export const resetCart: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  const cartService = getCartService(request, actionContext);
  cartService.invalidateSessionCheckoutData();

  const response: Response = {
    statusCode: 200,
    body: '',
    sessionData: {
      ...request.sessionData,
      cartId: null,
    },
  };

  return response;
};

export const addToCart: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);

    const body: {
      variant?: { sku?: string; count: number };
    } = JSON.parse(request.body ?? '{}');

    const lineItem: LineItem = {
      variant: {
        sku: body.variant?.sku ?? '',
        price: undefined,
      },
      count: +(body.variant?.count ?? 1),
    };

    let cart = await CartFetcher.fetchCart(cartService, request);
    cart = await cartService.addToCart(cart, lineItem, clientType);

    const cartId = cart.cartId;

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const replicateCart: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);
    const orderId = request.query?.['orderId'];

    if (!orderId) {
      throw new ValidationError({ message: `orderId is required` });
    }

    const cart = await cartService.replicateCart(orderId, clientType);

    return {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId: cart.cartId,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateLineItem: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);

    const body: {
      lineItem?: { id?: string; count: number };
    } = JSON.parse(request.body ?? '{}');

    const lineItem: LineItem = {
      lineItemId: body.lineItem?.id,
      count: +(body.lineItem?.count ?? 1),
    };

    let cart = await CartFetcher.fetchCart(cartService, request);
    cart = await cartService.updateLineItem(cart, lineItem, clientType);

    const cartId = cart.cartId;

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const removeLineItem: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);

    const body: {
      lineItem?: { id?: string };
    } = JSON.parse(request.body ?? '{}');

    const lineItem: LineItem = {
      lineItemId: body.lineItem?.id,
    };

    let cart = await CartFetcher.fetchCart(cartService, request);
    cart = await cartService.removeLineItem(cart, lineItem, clientType);

    const cartId = cart.cartId;

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateCart: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const cartService = getCartService(request, actionContext);

    const cart = await updateCartFromRequest(cartService, request);
    const cartId = cart.cartId;

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const checkout: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const locale = getLocale(request);
    const body: {
      purchaseOrderNumber?: string;
    } = JSON.parse(request.body ?? '{}');

    const cartService = getCartService(request, actionContext);
    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    // const emailApi = EmailApiFactory.getDefaultApi(actionContext.globalContext, locale || 'en');

    const cart = await updateCartFromRequest(cartService, request);

    const order = await cartService.order(
      cart,
      clientType,
      body?.purchaseOrderNumber,
    );

    // emailApi.sendOrderConfirmationEmail({ ...order, email: order.email || cart.email });

    // Unset the cartId
    const cartId: string | undefined = undefined;

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(order),
      sessionData: {
        ...cartService.getSessionData(),
        cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

/**
 * @deprecated Use queryOrders instead
 */
export const getOrders: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);

    const account =
      request.sessionData?.account !== undefined
        ? request.sessionData.account
        : undefined;

    if (account === undefined) {
      throw new AccountAuthenticationError({ message: 'Not logged in.' });
    }

    const orders = await cartService.getOrders(account, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(orders),
      sessionData: {
        ...cartService.getSessionData(),
      },
    };
    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getShippingMethods: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);
    const onlyMatching = request.query.onlyMatching === 'true';

    const shippingMethods = await cartService.getShippingMethods(
      onlyMatching,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(shippingMethods),
      sessionData: {
        ...cartService.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getAvailableShippingMethods: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);
    const cart = await CartFetcher.fetchCart(cartService, request);

    const availableShippingMethods =
      await cartService.getAvailableShippingMethods(cart, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(availableShippingMethods),
      sessionData: {
        ...cartService.getSessionData(),
        cartId: cart.cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const setShippingMethod: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);

    let cart = await CartFetcher.fetchCart(cartService, request);

    const body: {
      shippingMethod?: { id?: string };
    } = JSON.parse(request.body ?? '{}');

    const shippingMethod: ShippingMethod = {
      shippingMethodId: body.shippingMethod?.id ?? '',
    };

    cart = await cartService.setShippingMethod(
      cart,
      shippingMethod,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId: cart.cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const addPaymentByInvoice: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);

    let cart = await CartFetcher.fetchCart(cartService, request);

    const body: {
      payment?: Payment;
    } = JSON.parse(request.body ?? '{}');

    const payment: Payment = {
      ...body.payment,
      id: body.payment?.id ?? '',
      paymentProvider: 'frontastic',
      paymentMethod: 'invoice',
      paymentStatus: PaymentStatuses.PENDING,
      paymentId: body.payment?.paymentId ?? '',
      amountPlanned: {
        centAmount:
          body.payment?.amountPlanned?.centAmount ?? cart.sum?.centAmount ?? 0,
        currencyCode:
          body.payment?.amountPlanned?.currencyCode ??
          cart.sum?.currencyCode ??
          '',
      },
    };

    cart = await cartService.addPayment(cart, payment, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId: cart.cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const updatePayment: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);
    const cart = await CartFetcher.fetchCart(cartService, request);

    const body: {
      payment?: Payment;
    } = JSON.parse(request.body ?? '{}');

    if (!body.payment) {
      throw new ValidationError({ message: 'Payment information is required' });
    }
    const payment = await cartService.updatePayment(
      cart,
      body.payment,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(payment),
      sessionData: {
        ...cartService.getSessionData(),
        cartId: cart.cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const redeemDiscount: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);
    let cart = await CartFetcher.fetchCart(cartService, request);

    const body: {
      code?: string;
    } = JSON.parse(request.body ?? '{}');

    if (!body.code) {
      throw new ValidationError({ message: 'Discount code is required' });
    }
    cart = await cartService.redeemDiscountCode(cart, body.code, clientType);

    return {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId: cart.cartId,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const removeDiscount: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);
    let cart = await CartFetcher.fetchCart(cartService, request);

    const body: {
      discountId?: string;
    } = JSON.parse(request.body ?? '{}');

    const discount: Discount = {
      discountId: body?.discountId,
    };

    cart = await cartService.removeDiscountCode(cart, discount, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartService.getSessionData(),
        cartId: cart.cartId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const queryOrders: ActionHook = async (request, actionContext) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);

    if (clientType == 'backoffice') {
      const orderQuery: OrderQuery = {
        limit: request.query?.limit ?? undefined,
        cursor: request.query?.cursor ?? undefined,
        orderNumbers: queryParamsToIds('orderNumbers', request.query),
        orderIds: queryParamsToIds('orderIds', request.query),
        orderState: queryParamsToStates('orderStates', request.query),
        sortAttributes: queryParamsToSortAttributes(request.query),
        query: request.query?.query ?? undefined,
      };
      const queryResult = await cartService.customerOrders(
        orderQuery,
        clientType,
      );
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(queryResult),
        sessionData: {
          ...cartService.getSessionData(),
        },
      };

      return response;
    } else {
      const account = fetchAccountFromSession(request);
      if (account === undefined) {
        throw new AccountAuthenticationError({ message: 'Not logged in.' });
      }

      const orderQuery: OrderQuery = {
        accountId: account.accountId ?? '',
        limit: request.query?.limit ?? undefined,
        cursor: request.query?.cursor ?? undefined,
        orderNumbers: queryParamsToIds('orderNumbers', request.query),
        orderIds: queryParamsToIds('orderIds', request.query),
        orderState: queryParamsToStates('orderStates', request.query),
        sortAttributes: queryParamsToSortAttributes(request.query),
        query: request.query?.query ?? undefined,
      };

      const queryResult = await cartService.queryOrders(orderQuery, clientType);

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(queryResult),
        sessionData: {
          ...cartService.getSessionData(),
        },
      };

      return response;
    }
  } catch (error) {
    return handleError(error, request);
  }
};

export const getOrder: ActionHook = async (request, actionContext) => {
  try {
    const clientType = getClientType(request);
    const cartService = getCartService(request, actionContext);
    if (clientType == 'backoffice') {
      const orderQuery: OrderQuery = {
        orderIds: [request.query?.orderId],
        limit: 1,
      };

      const queryResult = await cartService.customerOrders(
        orderQuery,
        clientType,
      );

      // We'll consider the first order as the checkout order
      const order = queryResult.items[0];
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(order),
        sessionData: {
          ...cartService.getSessionData(),
        },
      };

      return response;
    } else {
      const account = fetchAccountFromSession(request);
      const orderQuery: OrderQuery = {
        accountId: account?.accountId ?? '',
        orderIds: [request.query?.orderId],
        limit: 1,
      };

      const queryResult = await cartService.queryOrders(orderQuery, clientType);

      // We'll consider the first order as the checkout order
      const order = queryResult.items[0];

      if (account === undefined) {
        // If account is not logged in, we need to validate if the order belongs to the current session cart
        if (order?.cartId !== request.sessionData?.cartId) {
          throw new CartNotMatchOrderError({
            message: 'Order does not match the current cart.',
          });
        }
      }

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(order),
        sessionData: {
          ...cartService.getSessionData(),
        },
      };

      return response;
    }
  } catch (error) {
    return handleError(error, request);
  }
};

export const getCheckoutSessionToken: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    let checkoutSessionToken: Token | undefined = undefined;
    const cartService = getCartService(request, actionContext);

    // We are getting the cartId from the session data so carts that are not active can be used
    const cartId = request.sessionData?.cartId;

    if (cartId !== undefined) {
      checkoutSessionToken = await cartService.getCheckoutSessionToken(cartId);
    }

    const response: Response = {
      statusCode: 200,
      body: checkoutSessionToken ? JSON.stringify(checkoutSessionToken) : '',
      sessionData: {
        ...cartService.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const addDeliveryToOrder: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const orderService = getCartService(request, actionContext);

    const body: {
      orderId: string;
      deliveryDraft?: {
        items?: { id: string; quantity: number }[];
      };
    } = JSON.parse(request.body ?? '{}');

    if (!body.orderId) {
      throw new ValidationError({ message: 'Order ID is required' });
    }
    if (!body?.deliveryDraft || !body?.deliveryDraft?.items) {
      throw new ValidationError({
        message: 'Delivery details with items are required',
      });
    }

    const delivery = await orderService.addOrderDelivery(
      body.orderId,
      body.deliveryDraft,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(delivery),
      sessionData: {
        ...orderService.getSessionData(),
        orderId: body.orderId,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};
