import { ClientType, Wishlist } from '@royalcyber/global-types';
import { WishlistMapper } from '../mappers/WishlistMapper';
import { BaseService } from './BaseService';
import { ExternalError } from '../errors/ExternalError';

const expandVariants = ['lineItems[*].variant'];

interface AddToWishlistRequest {
  sku: string;
  count: number;
}

export class WishlistService extends BaseService {
  async getById(wishlistId: string, clientType: ClientType): Promise<Wishlist> {
    const locale = await this.getCommercetoolsLocal(clientType);
    return await this.requestBuilder()
      .shoppingLists()
      .withId({ ID: wishlistId })
      .get({
        queryArgs: {
          expand: expandVariants,
        },
      })
      .execute()
      .then((response) => {
        return WishlistMapper.commercetoolsShoppingListToWishlist(
          response.body,
          locale,
          this.defaultLocale,
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

  async getForAccount(
    accountId: string,
    clientType: ClientType,
  ): Promise<Wishlist[]> {
    const locale = await this.getCommercetoolsLocal(clientType);
    return await this.requestBuilder()
      .shoppingLists()
      .get({
        queryArgs: {
          where: `customer(id="${accountId}")`,
          expand: expandVariants,
        },
      })
      .execute()
      .then((response) => {
        return response.body.results.map((shoppingList) =>
          WishlistMapper.commercetoolsShoppingListToWishlist(
            shoppingList,
            locale,
            this.defaultLocale,
            clientType,
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

  async getByIdForAccount(
    wishlistId: string,
    accountId: string,
    clientType: ClientType,
  ): Promise<Wishlist> {
    const locale = await this.getCommercetoolsLocal(clientType);
    return await this.requestBuilder()
      .shoppingLists()
      .withId({ ID: wishlistId })
      .get({
        queryArgs: {
          where: `customer(id="${accountId}")`,
          expand: expandVariants,
        },
      })
      .execute()
      .then((response) => {
        return WishlistMapper.commercetoolsShoppingListToWishlist(
          response.body,
          locale,
          this.defaultLocale,
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

  async create(
    wishlist: Omit<Wishlist, 'wishlistId'>,
    clientType: ClientType,
  ): Promise<Wishlist> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const body = WishlistMapper.wishlistToCommercetoolsShoppingListDraft(
      wishlist,
      locale,
    );
    return await this.requestBuilder()
      .shoppingLists()
      .post({
        body: body,
        queryArgs: {
          expand: expandVariants,
        },
      })
      .execute()
      .then((response) => {
        return WishlistMapper.commercetoolsShoppingListToWishlist(
          response.body,
          locale,
          this.defaultLocale,
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

  async addToWishlist(
    wishlist: Wishlist,
    request: AddToWishlistRequest,
    clientType: ClientType,
  ): Promise<Wishlist> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.requestBuilder()
      .shoppingLists()
      .withId({ ID: wishlist.wishlistId })
      .post({
        body: {
          version: +(wishlist.wishlistVersion ?? 0),
          actions: [
            {
              action: 'addLineItem',
              sku: request.sku,
              quantity: request.count,
            },
          ],
        },
        queryArgs: {
          expand: expandVariants,
        },
      })
      .execute()
      .then((response) => {
        return WishlistMapper.commercetoolsShoppingListToWishlist(
          response.body,
          locale,
          this.defaultLocale,
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

  async removeLineItem(
    wishlist: Wishlist,
    lineItemId: string,
    clientType: ClientType,
  ): Promise<Wishlist> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.requestBuilder()
      .shoppingLists()
      .withId({ ID: wishlist.wishlistId })
      .post({
        body: {
          version: +(wishlist.wishlistVersion ?? 0),
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
            },
          ],
        },
        queryArgs: {
          expand: expandVariants,
        },
      })
      .execute()
      .then((response) => {
        return WishlistMapper.commercetoolsShoppingListToWishlist(
          response.body,
          locale,
          this.defaultLocale,
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

  async deleteWishlist(wishlist: Wishlist): Promise<void> {
    await this.requestBuilder()
      .shoppingLists()
      .withId({ ID: wishlist.wishlistId })
      .delete({
        queryArgs: {
          version: +(wishlist.wishlistVersion ?? 0),
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
  }

  async updateLineItemCount(
    wishlist: Wishlist,
    lineItemId: string,
    count: number,
    clientType: ClientType,
  ): Promise<Wishlist> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.requestBuilder()
      .shoppingLists()
      .withId({ ID: wishlist.wishlistId })
      .post({
        body: {
          version: +(wishlist.wishlistVersion ?? 0),
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity: count,
            },
          ],
        },
        queryArgs: {
          expand: expandVariants,
        },
      })
      .execute()
      .then((response) => {
        return WishlistMapper.commercetoolsShoppingListToWishlist(
          response.body,
          locale,
          this.defaultLocale,
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
}
