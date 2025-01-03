import {
  Cart as CommercetoolsCart,
  CartAddDiscountCodeAction,
  CartAddLineItemAction,
  CartAddPaymentAction,
  CartChangeLineItemQuantityAction,
  CartDraft,
  CartRemoveDiscountCodeAction,
  CartRemoveLineItemAction,
  CartSetBillingAddressAction,
  CartSetCountryAction,
  CartSetCustomerEmailAction,
  CartSetLocaleAction,
  CartSetShippingAddressAction,
  CartSetShippingMethodAction,
  CartUpdate,
  OrderFromCartDraft,
  OrderState,
  OrderUpdateAction,
  PaymentDraft,
  PaymentState,
  PaymentUpdateAction,
} from '@commercetools/platform-sdk';
import {
  Context,
  Request,
  Cart,
  LineItem,
  Address,
  Order,
  ShippingMethod,
  Payment,
  Account,
  Discount,
  PaginatedResult,
  OrderQuery,
  Token,
  ClientType,
  Delivery,
  CategoryQuery,
} from '@royalcyber/global-types';
import { Locale } from '../Locale';
import { isReadyForCheckout } from '../utils/Cart';
import { CartNotCompleteError } from '../errors/CartNotCompleteError';
import { CartPaymentNotFoundError } from '../errors/CartPaymentNotFoundError';
import { CartRedeemDiscountCodeError } from '../errors/CartRedeemDiscountCodeError';
import { CartMapper } from '../mappers/CartMapper';
import { ProductService } from './ProductService';
import { BaseService } from './BaseService';
import { ProductMapper } from '../mappers/ProductMapper';
import { getOffsetFromCursor } from '../utils/Pagination';
import { ExternalError } from '../errors/ExternalError';
import { Guid } from '../utils/Guid';

export class CartService extends BaseService {
  productService: ProductService;
  protected accountId: string | undefined;
  protected businessUnitKey: string | undefined;
  protected storeKey: string | undefined;
  protected distributionChannelId: string | undefined;
  protected supplyChannelId: string | undefined;

  constructor(
    commercetoolsFrontendContext: Context,
    locale: string | null,
    currency: string | null,
    request?: Request | null,
    accountId?: string,
    businessUnitKey?: string | null,
    distributionChannelId?: string | null,
    supplyChannelId?: string | null,
  ) {
    super(commercetoolsFrontendContext, locale, currency, request);
    this.productService = new ProductService(
      commercetoolsFrontendContext,
      locale,
      currency,
      request,
    );
    this.accountId = accountId;
    this.businessUnitKey = businessUnitKey || '';
    this.distributionChannelId = distributionChannelId || '';
    this.supplyChannelId = supplyChannelId || '';
  }
  protected getOffsetFromCursor(cursor: string) {
    if (cursor === undefined) {
      return undefined;
    }

    const offsetMach = cursor.match(/(?<=offset:).+/);
    return offsetMach !== null ? +Object.values(offsetMach)[0] : undefined;
  }

  async getCarts(
    clientType: ClientType,
    categoryQuery: CategoryQuery,
  ): Promise<PaginatedResult<Cart>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const limit = +(categoryQuery.limit ?? 24);
    return await this.requestBuilder()
      .carts()
      .get({
        queryArgs: {
          limit: limit,
          offset: this.getOffsetFromCursor(categoryQuery.cursor ?? ''),
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
        },
      })
      .execute()
      .then(async (response) => {
        // Resolve all promises returned by map
        const items = await Promise.all(
          response.body.results.map((cart) =>
            this.buildCartWithAvailableShippingMethods(
              cart,
              locale,
              clientType,
            ),
          ),
        );
        // Create the paginated result
        const paginatedResult: PaginatedResult<Cart> = {
          total: response.body.total,
          items: items,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset ?? 0,
            response.body.count ?? 0,
            response.body.total ?? 0,
          ),
        };

        return paginatedResult;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async replicateCart(orderId: string, clientType: ClientType): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const response = await this.requestBuilder()
      .carts()
      .replicate()
      .post({
        body: {
          reference: {
            id: orderId,
            typeId: 'order',
          },
        },
      })
      .execute()
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    return await this.buildCartWithAvailableShippingMethods(
      response.body,
      locale,
      clientType,
    );
  }

  async deleteCart(cart: Cart, clientType: ClientType): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.requestBuilder()
      .carts()
      .withId({
        ID: cart.cartId,
      })
      .delete({
        queryArgs: {
          version: cart.cartVersion ? +cart.cartVersion : 0,
        },
      })
      .execute()
      .then(() => {
        return {
          cartId: cart.cartId,
          locale,
          clientType,
        };
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getForUser(account: Account, clientType: ClientType): Promise<Cart> {
    this.invalidateSessionCheckoutData();

    const locale = await this.getCommercetoolsLocal(clientType);

    const response = await this.requestBuilder()
      .carts()
      .get({
        queryArgs: {
          limit: 1,
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
          where: [`customerId="${account.accountId}"`, `cartState="Active"`],
          sort: 'lastModifiedAt desc',
        },
      })
      .execute()
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    if (response.body.count >= 1) {
      return this.buildCartWithAvailableShippingMethods(
        response.body.results[0],
        locale,
        clientType,
      );
    }

    const cartDraft: CartDraft = {
      currency: locale.currency,
      country: locale.country,
      locale: locale.language,
      customerId: account.accountId,
      customerEmail: account.email,
      inventoryMode: 'ReserveOnOrder',
    };

    return await this.requestBuilder()
      .carts()
      .post({
        queryArgs: {
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
        },
        body: cartDraft,
      })
      .execute()
      .then((response) => {
        return this.buildCartWithAvailableShippingMethods(
          response.body,
          locale,
          clientType,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getAnonymous(clientType: ClientType): Promise<Cart> {
    this.invalidateSessionCheckoutData();

    const locale = await this.getCommercetoolsLocal(clientType);

    const response = await this.requestBuilder()
      .carts()
      .get({
        queryArgs: {
          limit: 1,
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
          where: [`anonymousId="${Guid.newGuid()}"`, `cartState="Active"`],
          sort: 'createdAt desc',
        },
      })
      .execute()
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    if (response.body.count >= 1) {
      return this.buildCartWithAvailableShippingMethods(
        response.body.results[0],
        locale,
        clientType,
      );
    }

    const cartDraft: CartDraft = {
      currency: locale.currency,
      country: locale.country,
      locale: locale.language,
      anonymousId: Guid.newGuid(),
      inventoryMode: 'ReserveOnOrder',
    };

    return await this.requestBuilder()
      .carts()
      .post({
        queryArgs: {
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
        },
        body: cartDraft,
      })
      .execute()
      .then((response) => {
        return this.buildCartWithAvailableShippingMethods(
          response.body,
          locale,
          clientType,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getById(cartId: string, clientType: ClientType): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.requestBuilder()
      .carts()
      .withId({
        ID: cartId,
      })
      .get({
        queryArgs: {
          limit: 1,
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
        },
      })
      .execute()
      .then((response) => {
        return this.buildCartWithAvailableShippingMethods(
          response.body,
          locale,
          clientType,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async addToCart(
    cart: Cart,
    lineItem: LineItem,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: cart.cartVersion ? +cart.cartVersion : 0,
      actions: [
        {
          action: 'addLineItem',
          sku: lineItem.variant?.sku ?? '',
          quantity: +(lineItem.count ?? 0),
          supplyChannel: {
            typeId: 'channel',
            key: 'default-inventory', // TODO : Make this dynamic
          },
        } as CartAddLineItemAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async updateLineItem(
    cart: Cart,
    lineItem: LineItem,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: lineItem.lineItemId,
          quantity: +(lineItem.count ?? 0),
        } as CartChangeLineItemQuantityAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async removeLineItem(
    cart: Cart,
    lineItem: LineItem,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: lineItem.lineItemId,
        } as CartRemoveLineItemAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async setEmail(
    cart: Cart,
    email: string,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'setCustomerEmail',
          email: email,
        } as CartSetCustomerEmailAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async setShippingAddress(
    cart: Cart,
    address: Address,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'setShippingAddress',
          address: CartMapper.addressToCommercetoolsAddress(address),
        } as CartSetShippingAddressAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async setBillingAddress(
    cart: Cart,
    address: Address,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'setBillingAddress',
          address: CartMapper.addressToCommercetoolsAddress(address),
        } as CartSetBillingAddressAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async setShippingMethod(
    cart: Cart,
    shippingMethod: ShippingMethod,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'setShippingMethod',
          shippingMethod: {
            typeId: 'shipping-method',
            id: shippingMethod.shippingMethodId,
          },
        } as CartSetShippingMethodAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async order(
    cart: Cart,
    clientType: ClientType,
    purchaseOrderNumber?: string,
  ): Promise<Order> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const date = new Date();

    const orderFromCartDraft: OrderFromCartDraft = {
      cart: {
        typeId: 'cart',
        id: cart.cartId,
      },
      version: +(cart.cartVersion ?? 0),
      orderNumber: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${String(Date.now()).slice(-6, -1)}`,
      purchaseOrderNumber:
        purchaseOrderNumber !== undefined ? purchaseOrderNumber : undefined,
    };

    if (!isReadyForCheckout(cart)) {
      throw new CartNotCompleteError({ message: 'Cart not complete yet.' });
    }

    return await this.requestBuilder()
      .orders()
      .post({
        queryArgs: {
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
        },
        body: orderFromCartDraft,
      })
      .execute()
      .then((response) => {
        return CartMapper.commercetoolsOrderToOrder(
          response.body,
          clientType,
          locale,
          this.defaultLocale,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getOrders(account: Account, clientType: ClientType): Promise<Order[]> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.requestBuilder()
      .orders()
      .get({
        queryArgs: {
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
          where: `customerId="${account.accountId}"`,
          sort: 'createdAt desc',
        },
      })
      .execute()
      .then((response) => {
        return response.body.results.map((order) =>
          CartMapper.commercetoolsOrderToOrder(
            order,
            clientType,
            locale,
            this.defaultLocale,
          ),
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getShippingMethods(
    onlyMatching: boolean,
    clientType: ClientType,
  ): Promise<ShippingMethod[]> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const methodArgs = {
      queryArgs: {
        expand: ['zoneRates[*].zone'],
        country: undefined as string | any,
      },
    };

    let requestBuilder = this.requestBuilder()
      .shippingMethods()
      .get(methodArgs);

    if (onlyMatching) {
      methodArgs.queryArgs.country = locale.country;
      requestBuilder = this.requestBuilder()
        .shippingMethods()
        .matchingLocation()
        .get(methodArgs);
    }

    return await requestBuilder
      .execute()
      .then((response) => {
        return response.body.results.map((shippingMethod) =>
          CartMapper.commercetoolsShippingMethodToShippingMethod(
            shippingMethod,
            clientType,
            locale,
            this.defaultLocale,
          ),
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getAvailableShippingMethods(
    cart: Cart,
    clientType: ClientType,
  ): Promise<ShippingMethod[]> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.requestBuilder()
      .shippingMethods()
      .matchingCart()
      .get({
        queryArgs: {
          expand: ['zoneRates[*].zone'],
          cartId: cart.cartId,
        },
      })
      .execute()
      .then((response) => {
        return response.body.results.map((shippingMethod) =>
          CartMapper.commercetoolsShippingMethodToShippingMethod(
            shippingMethod,
            clientType,
            locale,
            this.defaultLocale,
          ),
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async addPayment(
    cart: Cart,
    payment: Payment,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    // TODO: create and use custom a payment field to include details for the payment integration

    const paymentDraft: PaymentDraft = {
      key: payment.id,
      amountPlanned: {
        type: 'highPrecision',
        centAmount: payment.amountPlanned.centAmount,
        currencyCode: payment.amountPlanned.currencyCode ?? 'USD',
        fractionDigits: 2, // Adjust as needed
        preciseAmount: (payment.amountPlanned.centAmount ?? 0) * 100, // Adjust as needed
      },
      interfaceId: payment.paymentId,
      paymentMethodInfo: {
        paymentInterface: payment.paymentProvider,
        method: payment.paymentMethod,
      },
      paymentStatus: {
        interfaceCode: payment.paymentStatus,
        interfaceText: payment.debug,
      },
    };

    const paymentResponse = await this.requestBuilder()
      .payments()
      .post({
        body: paymentDraft,
      })
      .execute();

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'addPayment',
          payment: {
            typeId: 'payment',
            id: paymentResponse.body.id,
          },
        } as CartAddPaymentAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async updatePayment(
    cart: Cart,
    payment: Payment,
    clientType: ClientType,
  ): Promise<Payment> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const originalPayment = cart.payments?.find(
      (cartPayment) => cartPayment.id === payment.id,
    );

    if (originalPayment === undefined) {
      throw new CartPaymentNotFoundError({
        message: `Payment ${payment.id} not found in cart ${cart.cartId}`,
      });
    }

    const paymentUpdateActions: PaymentUpdateAction[] = [];

    if (payment.paymentStatus) {
      paymentUpdateActions.push({
        action: 'setStatusInterfaceCode',
        interfaceCode: payment.paymentStatus,
      });
    }

    if (payment.debug) {
      paymentUpdateActions.push({
        action: 'setStatusInterfaceText',
        interfaceText: payment.debug,
      });
    }

    if (payment.paymentId) {
      paymentUpdateActions.push({
        action: 'setInterfaceId',
        interfaceId: payment.paymentId,
      });
    }

    if (paymentUpdateActions.length === 0) {
      // There is nothing to be updated
      return payment;
    }

    return await this.requestBuilder()
      .payments()
      .withKey({
        key: originalPayment.id,
      })
      .post({
        body: {
          version: originalPayment.version ?? 0,
          actions: paymentUpdateActions,
        },
      })
      .execute()
      .then((response) => {
        return CartMapper.commercetoolsPaymentToPayment(response.body, locale);
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getPayment(paymentId: string): Promise<any> {
    return await this.requestBuilder()
      .payments()
      .withId({
        ID: paymentId,
      })
      .get()
      .execute();
  }

  async updateOrderByNumber(
    orderNumber: string,
    payload: Pick<Order, 'orderState' | 'payments'> & {
      paymentState?: PaymentState;
    },
    clientType: ClientType,
  ): Promise<Order> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const order = await this.requestBuilder()
      .orders()
      .withOrderNumber({ orderNumber })
      .get()
      .execute()
      .then((res) => res.body);

    const orderUpdateActions = [] as OrderUpdateAction[];

    if (payload.orderState) {
      orderUpdateActions.push({
        action: 'changeOrderState',
        orderState: payload.orderState as OrderState,
      });
    }

    if (payload.payments) {
      payload.payments.forEach((payment) => {
        orderUpdateActions.push({
          action: 'addPayment',
          payment: {
            typeId: 'payment',
            id: payment.id,
          },
        });
      });
    }

    if (payload.paymentState) {
      orderUpdateActions.push({
        action: 'changePaymentState',
        paymentState: payload.paymentState,
      });
    }

    return this.requestBuilder()
      .orders()
      .withOrderNumber({ orderNumber })
      .post({ body: { version: order.version, actions: orderUpdateActions } })
      .execute()
      .then((response) =>
        CartMapper.commercetoolsOrderToOrder(
          response.body,
          clientType,
          locale,
          this.defaultLocale,
        ),
      )
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async createPayment(
    payload: PaymentDraft,
    clientType: ClientType,
  ): Promise<Payment> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const payment = this.requestBuilder()
      .payments()
      .post({ body: payload })
      .execute()
      .then((response) =>
        CartMapper.commercetoolsPaymentToPayment(response.body, locale),
      );

    return payment;
  }

  async updateOrderPayment(
    paymentId: string,
    paymentDraft: Payment,
    clientType: ClientType,
  ): Promise<any> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const paymentUpdateActions: PaymentUpdateAction[] = [];

    if (paymentDraft.paymentMethod) {
      paymentUpdateActions.push({
        action: 'setMethodInfoMethod',
        method: paymentDraft.paymentMethod,
      });
    }

    if (paymentDraft.amountPlanned) {
      paymentUpdateActions.push({
        action: 'changeAmountPlanned',
        amount: {
          type: 'highPrecision',
          centAmount: paymentDraft.amountPlanned.centAmount,
          currencyCode: paymentDraft.amountPlanned.currencyCode ?? 'USD',
          fractionDigits: 2, // Adjust as needed
          preciseAmount: (paymentDraft.amountPlanned.centAmount ?? 0) * 100, // Adjust as needed
        },
      });
    }

    if (paymentDraft.paymentStatus) {
      paymentUpdateActions.push({
        action: 'setStatusInterfaceCode',
        interfaceCode: paymentDraft.paymentStatus,
      });
    }

    return await this.requestBuilder()
      .payments()
      .withId({
        ID: paymentId,
      })
      .post({
        body: {
          version: paymentDraft.version ?? 0,
          actions: paymentUpdateActions,
        },
      })
      .execute()
      .then((response) => {
        return CartMapper.commercetoolsPaymentToPayment(response.body, locale);
        //return response;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async redeemDiscountCode(
    cart: Cart,
    code: string,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'addDiscountCode',
          code: code,
        } as CartAddDiscountCodeAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    )
      .then((commercetoolsCart) => {
        const commercetoolsDiscountCode = commercetoolsCart.discountCodes.find(
          (discountCode) => discountCode.discountCode?.obj?.code === code,
        );

        if (
          commercetoolsDiscountCode &&
          commercetoolsDiscountCode.state !== 'MatchesCart'
        ) {
          // Remove the discount code if status is different than MatchesCart
          const cartUpdate: CartUpdate = {
            version: +commercetoolsCart.version,
            actions: [
              {
                action: 'removeDiscountCode',
                discountCode: {
                  typeId: 'discount-code',
                  id: commercetoolsDiscountCode.discountCode.id,
                },
              } as CartRemoveDiscountCodeAction,
            ],
          };

          this.updateCart(commercetoolsCart.id, cartUpdate, locale);

          throw new CartRedeemDiscountCodeError({
            message: `Redeem discount code '${code}' failed with state '${commercetoolsDiscountCode.state}'`,
            statusCode: 409,
          });
        }

        return commercetoolsCart;
      })
      .catch((error) => {
        if (error instanceof ExternalError) {
          throw new CartRedeemDiscountCodeError({
            message: `Redeem discount code '${code}' failed. ${error.message}`,
            statusCode: error.statusCode,
          });
        }

        throw error;
      });

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async removeDiscountCode(
    cart: Cart,
    discount: Discount,
    clientType: ClientType,
  ): Promise<Cart> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const cartUpdate: CartUpdate = {
      version: +(cart.cartVersion ?? 0),
      actions: [
        {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: discount.discountId,
          },
        } as CartRemoveDiscountCodeAction,
      ],
    };

    const commercetoolsCart = await this.updateCart(
      cart.cartId,
      cartUpdate,
      locale,
    );

    return this.buildCartWithAvailableShippingMethods(
      commercetoolsCart,
      locale,
      clientType,
    );
  }

  async getBusinessUnitOrders(clientType: ClientType): Promise<Order[]> {
    const locale = await this.getCommercetoolsLocal(clientType);

    if (!this.businessUnitKey) {
      throw new Error('Business Unit Key is not defined.');
    }

    if (!this.accountId) {
      throw new Error('Account ID is not defined.');
    }

    return await this.associateEndpoints(this.accountId, this.businessUnitKey)
      .orders()
      .get({
        queryArgs: {
          expand: ['state'],
          where: `businessUnit(key="${this.businessUnitKey}")`,
          sort: 'createdAt desc',
        },
      })
      .execute()
      .then((response) =>
        response.body.results.map((order) =>
          CartMapper.commercetoolsOrderToOrder(order, clientType, locale, ''),
        ),
      )
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async addOrderDelivery(
    orderId: string,
    deliveryDraft: Delivery,
    clientType: ClientType,
  ): Promise<any> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const deliveryActions: OrderUpdateAction[] = [];

    deliveryActions.push({
      action: 'addDelivery',
      items: deliveryDraft?.items
        ? deliveryDraft?.items
            ?.filter((item) => item?.id && item?.quantity)
            .map((item) => ({
              id: item.id!,
              quantity: item.quantity!,
            }))
        : undefined,
    });

    const orderUpdateResponse = await this.updateOrder(
      orderId,
      deliveryActions,
      clientType,
      locale,
    );

    return orderUpdateResponse;
  }

  async getOrder(orderId: string, clientType: ClientType) {
    const order = await this.requestBuilder()
      .orders()
      .withId({ ID: orderId })
      .get()
      .execute()
      .then((res) => res.body);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    } else {
      // const locale = await this.getCommercetoolsLocal(clientType);
      // return CartMapper.commercetoolsOrderToOrder(order, clientType, locale, this.defaultLocale);
      return order;
    }
  }

  async updateOrder(
    orderId: string,
    updateOrderAction: OrderUpdateAction[],
    clientType: ClientType,
    locale?: Locale,
  ) {
    const orderDetails = await this.getOrder(orderId, clientType);
    return await this.requestBuilder()
      .orders()
      .withId({
        ID: orderId,
      })
      .post({
        body: {
          version: orderDetails?.version,
          actions: updateOrderAction,
        },
      })
      .execute()
      .then((response) => {
        return CartMapper.commercetoolsOrderToOrder(response.body, clientType);
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async queryOrders(
    orderQuery: OrderQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<Order>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const limit = orderQuery.limit ?? undefined;
    const sortAttributes: string[] = [];

    if (orderQuery.sortAttributes !== undefined) {
      Object.keys(orderQuery.sortAttributes).map((field, directionIndex) => {
        if (orderQuery.sortAttributes) {
          sortAttributes.push(
            `${field} ${Object.values(orderQuery.sortAttributes)[directionIndex]}`,
          );
        }
      });
    } else {
      // default sort
      sortAttributes.push(`lastModifiedAt desc`);
    }

    const whereClause = [];

    if (orderQuery.accountId !== undefined) {
      whereClause.push(`customerId="${orderQuery.accountId}"`);
    }

    if (orderQuery.orderIds !== undefined && orderQuery.orderIds.length !== 0) {
      whereClause.push(`id in ("${orderQuery.orderIds.join('","')}")`);
    }

    if (
      orderQuery.orderNumbers !== undefined &&
      orderQuery.orderNumbers.length !== 0
    ) {
      whereClause.push(
        `orderNumber in ("${orderQuery.orderNumbers.join('","')}")`,
      );
    }

    if (
      orderQuery.orderState !== undefined &&
      orderQuery.orderState.length > 0
    ) {
      whereClause.push(
        `orderState in ("${orderQuery.orderState.join('","')}")`,
      );
    }

    if (orderQuery.businessUnitKey !== undefined) {
      whereClause.push(`businessUnit(key="${orderQuery.businessUnitKey}")`);
    }

    const searchQuery = orderQuery.query && orderQuery.query;

    return this.requestBuilder()
      .orders()
      .get({
        queryArgs: {
          where: whereClause,
          expand: ['orderState'],
          limit: limit,
          offset: getOffsetFromCursor(orderQuery.cursor ?? ''),
          sort: sortAttributes,
          [`text.${locale.language}`]: searchQuery,
        },
      })
      .execute()
      .then((response) => {
        const orders = response.body.results.map((commercetoolsQuote) => {
          return CartMapper.commercetoolsOrderToOrder(
            commercetoolsQuote,
            clientType,
            locale,
            this.defaultLocale,
          );
        });

        return {
          total: response.body.total,
          items: orders,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset ?? 0,
            response.body.count ?? 0,
            response.body.total ?? 0,
          ),
          query: orderQuery,
        };
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async customerOrders(
    orderQuery: OrderQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<Order>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const limit = orderQuery.limit ?? undefined;
    const sortAttributes: string[] = [];

    if (orderQuery.sortAttributes !== undefined) {
      Object.keys(orderQuery.sortAttributes).map((field, directionIndex) => {
        if (orderQuery.sortAttributes) {
          sortAttributes.push(
            `${field} ${Object.values(orderQuery.sortAttributes)[directionIndex]}`,
          );
        }
      });
    } else {
      // default sort
      sortAttributes.push(`lastModifiedAt desc`);
    }

    const whereClause = [];

    // if (orderQuery.accountId !== undefined) {
    //   whereClause.push(`customerId="${orderQuery.accountId}"`);
    // }

    if (orderQuery.orderIds !== undefined && orderQuery.orderIds.length !== 0) {
      whereClause.push(`id in ("${orderQuery.orderIds.join('","')}")`);
    }

    if (
      orderQuery.orderNumbers !== undefined &&
      orderQuery.orderNumbers.length !== 0
    ) {
      whereClause.push(
        `orderNumber in ("${orderQuery.orderNumbers.join('","')}")`,
      );
    }

    if (
      orderQuery.orderState !== undefined &&
      orderQuery.orderState.length > 0
    ) {
      whereClause.push(
        `orderState in ("${orderQuery.orderState.join('","')}")`,
      );
    }

    if (orderQuery.businessUnitKey !== undefined) {
      whereClause.push(`businessUnit(key="${orderQuery.businessUnitKey}")`);
    }

    const searchQuery = orderQuery.query && orderQuery.query;

    return this.requestBuilder()
      .orders()
      .get({
        queryArgs: {
          where: whereClause,
          expand: ['orderState'],
          limit: limit,
          offset: getOffsetFromCursor(orderQuery.cursor ?? ''),
          sort: sortAttributes,
          [`text.${locale.language}`]: searchQuery,
        },
      })
      .execute()
      .then((response) => {
        const orders = response.body.results.map((commercetoolsQuote) => {
          return CartMapper.commercetoolsOrderToOrder(
            commercetoolsQuote,
            clientType,
            locale,
            this.defaultLocale,
          );
        });

        return {
          total: response.body.total,
          items: orders,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset ?? 0,
            response.body.count ?? 0,
            response.body.total ?? 0,
          ),
          query: orderQuery,
        };
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getCheckoutSessionToken(cartId: string): Promise<Token> {
    const token = await this.generateCheckoutSessionToken(cartId);
    if (!token) {
      throw new ExternalError({
        statusCode: 500,
        message: 'Failed to generate checkout session token',
      });
    }
    return token;
  }

  assertCartIsActive: (cart: Cart) => boolean = (cart: Cart) => {
    return cart.cartState === 'Active';
  };

  protected async updateCart(
    cartId: string,
    cartUpdate: CartUpdate,
    locale: Locale,
  ): Promise<CommercetoolsCart> {
    return await this.requestBuilder()
      .carts()
      .withId({
        ID: cartId,
      })
      .post({
        queryArgs: {
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
        },
        body: cartUpdate,
      })
      .execute()
      .then((response) => {
        return response.body;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  protected buildCartWithAvailableShippingMethods: (
    commercetoolsCart: CommercetoolsCart,
    locale: Locale,
    clientType: ClientType,
  ) => Promise<Cart> = async (
    commercetoolsCart: CommercetoolsCart,
    locale: Locale,
    clientType: ClientType,
  ) => {
    const cart = await this.assertCorrectLocale(
      commercetoolsCart,
      locale,
      clientType,
    );

    // It would not be possible to get available shipping method
    // if the shipping address has not been set.
    if (
      cart.shippingAddress !== undefined &&
      cart.shippingAddress.country !== undefined
    ) {
      cart.availableShippingMethods = await this.getAvailableShippingMethods(
        cart,
        clientType,
      );
    }

    return cart;
  };

  protected assertCorrectLocale: (
    commercetoolsCart: CommercetoolsCart,
    locale: Locale,
    clientType: ClientType,
  ) => Promise<Cart> = async (
    commercetoolsCart: CommercetoolsCart,
    locale: Locale,
    clientType: ClientType,
  ) => {
    if (
      commercetoolsCart.totalPrice.currencyCode !==
      locale.currency.toLocaleUpperCase()
    ) {
      return this.recreate(commercetoolsCart, locale, clientType);
    }

    if (this.doesCartNeedLocaleUpdate(commercetoolsCart, locale)) {
      const cartUpdate: CartUpdate = {
        version: commercetoolsCart.version,
        actions: [
          {
            action: 'setCountry',
            country: locale.country,
          } as CartSetCountryAction,
          {
            action: 'setLocale',
            country: locale.language,
          } as CartSetLocaleAction,
        ],
      };

      commercetoolsCart = await this.updateCart(
        commercetoolsCart.id,
        cartUpdate,
        locale,
      );

      return CartMapper.commercetoolsCartToCart(
        commercetoolsCart,
        locale,
        this.defaultLocale,
        clientType,
      );
    }

    return CartMapper.commercetoolsCartToCart(
      commercetoolsCart,
      locale,
      this.defaultLocale,
      clientType,
    );
  };

  protected async recreate(
    primaryCommercetoolsCart: CommercetoolsCart,
    locale: Locale,
    clientType: ClientType,
  ): Promise<Cart> {
    const primaryCartId = primaryCommercetoolsCart.id;
    const cartVersion = primaryCommercetoolsCart.version;
    const lineItems = primaryCommercetoolsCart.lineItems;

    const cartDraft: CartDraft = {
      currency: locale.currency,
      country: locale.country,
      locale: locale.language,
    };

    // TODO: implement a logic that hydrate cartDraft with commercetoolsCart
    // for (const key of Object.keys(commercetoolsCart)) {
    //   if (cartDraft.hasOwnProperty(key) && cartDraft[key] !== undefined) {
    //     cartDraft[key] = commercetoolsCart[key];
    //   }
    // }

    const propertyList = [
      'customerEmail',
      'customerGroup',
      'store',
      'inventoryMode',
      'taxMode',
      'taxRoundingMode',
      'taxCalculationMode',
      'shippingAddress',
      'billingAddress',
      'shippingMethod',
      'externalTaxRateForShippingMethod',
      'deleteDaysAfterLastModification',
      'origin',
      'shippingRateInput',
      'itemShippingAddresses',
    ];

    // Commercetools cart only accepts customerId or anonymousId
    primaryCommercetoolsCart.customerId !== undefined
      ? propertyList.push('customerId')
      : propertyList.push('anonymousId');

    for (const key of propertyList) {
      if (primaryCommercetoolsCart.hasOwnProperty(key)) {
        (cartDraft as any)[key] = (primaryCommercetoolsCart as any)[key];
      }
    }

    let replicatedCommercetoolsCart = await this.requestBuilder()
      .carts()
      .post({
        queryArgs: {
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
        },
        body: cartDraft,
      })
      .execute()
      .then((response) => {
        return response.body;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    // Add line items to the replicated cart one by one to handle the exception
    // if an item is not available on the new currency.
    for (const lineItem of lineItems) {
      try {
        const cartUpdate: CartUpdate = {
          version: +replicatedCommercetoolsCart.version,
          actions: [
            {
              action: 'addLineItem',
              sku: lineItem.variant.sku,
              quantity: +lineItem.quantity,
            },
          ],
        };

        replicatedCommercetoolsCart = await this.updateCart(
          replicatedCommercetoolsCart.id,
          cartUpdate,
          locale,
        );
      } catch (error) {
        // Ignore that a line item could not be added due to missing price, etc
      }
    }

    // Delete previous cart
    await this.requestBuilder()
      .carts()
      .withId({
        ID: primaryCartId,
      })
      .delete({
        queryArgs: {
          version: cartVersion,
        },
      })
      .execute()
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    return CartMapper.commercetoolsCartToCart(
      replicatedCommercetoolsCart,
      locale,
      this.defaultLocale,
      clientType,
    );
  }

  protected doesCartNeedLocaleUpdate(
    commercetoolsCart: CommercetoolsCart,
    locale: Locale,
  ): boolean {
    if (commercetoolsCart.country === undefined) {
      return true;
    }

    if (commercetoolsCart.locale === undefined) {
      return true;
    }

    return (
      commercetoolsCart.country !== locale.country ||
      commercetoolsCart.locale !== locale.language
    );
  }
}
