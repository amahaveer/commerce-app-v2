import { ClientType, Money, Wishlist, WishlistLineItem } from '@royalcyber/global-types';
import {
  ShoppingList,
  ShoppingListDraft,
  ShoppingListLineItem,
} from '@commercetools/platform-sdk';
import { Locale } from '../Locale';
import { ProductRouter } from '../utils/routers/ProductRouter';
import LocalizedValue from '../utils/LocalizedValue';
import { ProductMapper } from './ProductMapper';

export class WishlistMapper {
  static commercetoolsShoppingListToWishlist = (
    commercetoolsShoppingList: ShoppingList,
    locale: Locale,
    defaultLocale: string,
    clientType: ClientType,
  ): Wishlist => {
    return {
      wishlistId: commercetoolsShoppingList.id,
      wishlistVersion: commercetoolsShoppingList.version.toString(),
      anonymousId: commercetoolsShoppingList.anonymousId,
      accountId: commercetoolsShoppingList.customer?.id ?? undefined,
      name: LocalizedValue.getLocalizedValue(
        locale,
        defaultLocale,
        commercetoolsShoppingList.name,
      ),
      lineItems: (commercetoolsShoppingList.lineItems || []).map((lineItem) =>
        WishlistMapper.commercetoolsLineItemToLineItem(
          lineItem,
          locale,
          defaultLocale,
          clientType,
        ),
      ),
    };
  };

  private static commercetoolsLineItemToLineItem = (
    commercetoolsLineItem: ShoppingListLineItem,
    locale: Locale,
    defaultLocale: string,
    clientType: ClientType,
  ): WishlistLineItem => {
    const variant = commercetoolsLineItem?.variant ? 
      ProductMapper.commercetoolsProductVariantToVariant(
        commercetoolsLineItem.variant,
        clientType,
        locale,
      ) : undefined;
    const totalPriceValue = variant?.price?.centAmount ? variant?.price : undefined;
    const lineItem: WishlistLineItem = {
      lineItemId: commercetoolsLineItem.id,
      productId: commercetoolsLineItem.productId,
      name: LocalizedValue.getLocalizedValue(
        locale,
        defaultLocale,
        commercetoolsLineItem.name,
      ),
      type: 'variant',
      addedAt: new Date(commercetoolsLineItem.addedAt),
      count: commercetoolsLineItem.quantity,
      variant,
      totalPrice: totalPriceValue?.centAmount ? {
        ...totalPriceValue, 
        centAmount: totalPriceValue?.centAmount * commercetoolsLineItem.quantity
      } : {} as Money,
    };
    lineItem._url = ProductRouter.generateUrlFor(lineItem);
    return lineItem;
  };

  static wishlistToCommercetoolsShoppingListDraft = (
    wishlist: Omit<Wishlist, 'wishlistId'>,
    locale: Locale,
  ): ShoppingListDraft => {
    return {
      anonymousId: wishlist.anonymousId,
      customer:
        wishlist.accountId === undefined
          ? undefined
          : { typeId: 'customer', id: wishlist.accountId },
      name: { [locale.language]: wishlist.name || '' },
    };
  };
}
