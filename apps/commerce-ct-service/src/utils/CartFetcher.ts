import { Request, Cart } from '@royalcyber/global-types';
import { CartService } from '../services/CartService';
import { ExternalError } from '../errors/ExternalError';
import { getClientType } from './Request';

export class CartFetcher {
  static async fetchCart(
    cartService: CartService,
    request: Request,
  ): Promise<Cart> {
    const clientType = getClientType(request);
    const cart = await this.fetchActiveCartFromSession(cartService, request);

    if (cart) {
      return cart;
    }

    return await cartService.getAnonymous(clientType);
  }

  static async fetchActiveCartFromSession(
    cartService: CartService,
    request: Request,
  ): Promise<Cart | undefined> {
    const clientType = getClientType(request);
    if (request.sessionData?.cartId !== undefined) {
      try {
        const cart = await cartService.getById(
          request.sessionData.cartId,
          clientType,
        );
        if (cartService.assertCartIsActive(cart)) {
          return cart;
        }
      } catch (error) {
        // A ExternalError might be thrown if the cart does not exist or belongs to a different business unit,
        // in which case we should create a new cart.
        if (!(error instanceof ExternalError)) {
          throw error;
        }
      }
    }

    if (request.sessionData?.account !== undefined) {
      return await cartService.getForUser(
        request.sessionData.account,
        clientType,
      );
    }

    return undefined;
  }
}
