import {
  BaseAddress as CommercetoolsAddress,
  Cart as CommercetoolsCart,
  CartDiscountReference,
  CartOrigin as CommercetoolsCartOrigin,
  CartState as CommercetoolsCartState,
  DiscountCodeInfo as CommercetoolsDiscountCodeInfo,
  DiscountedLineItemPortion as CommercetoolsDiscountedLineItemPortion,
  DiscountedLineItemPriceForQuantity as CommercetoolsDiscountedLineItemPriceForQuantity,
  LineItem as CommercetoolsLineItem,
  LineItemReturnItem,
  Order as CommercetoolsOrder,
  OrderState as CommercetoolsOrderState,
  Payment as CommercetoolsPayment,
  PaymentInfo as CommercetoolsPaymentInfo,
  Reference,
  ReturnInfo as CommercetoolsReturnInfo,
  ReturnItemDraft,
  ShipmentState as CommercetoolsShipmentState,
  ShippingInfo as CommercetoolsShippingInfo,
  ShippingMethod as CommercetoolsShippingMethod,
  TaxedPrice as CommercetoolsTaxedPrice,
  TaxRate as CommercetoolsTaxRate,
  TaxedItemPrice as CommercetoolsTaxedItemPrice,
  ZoneRate as CommercetoolsZoneRate,
  Delivery as CommercetoolsDelivery,
  DeliveryItem as CommercetoolsDeliveryItem,
  Parcel as CommercetoolsParcel,
} from '@commercetools/platform-sdk';
import {
  Cart,
  CartOrigin,
  CartState,
  LineItem,
  Address,
  Order,
  OrderState,
  ReturnInfo,
  ReturnLineItem,
  ShippingMethod,
  ShippingRate,
  ShippingLocation,
  ShippingInfo,
  Payment,
  Tax,
  TaxPortion,
  Discount,
  DiscountedPricePerCount,
  TaxRate,
  ShipmentState,
  ClientType,
  LocalizedString,
  CustomerGroup,
  BusinessUnit,
  Delivery,
} from '@royalcyber/global-types';
import { ProductRouter } from '../utils/routers/ProductRouter';
import { Locale } from '../Locale';
import LocalizedValue from '../utils/LocalizedValue';
import { ProductMapper } from './ProductMapper';
import { CustomerGroupMapper } from './CustomerGroupMapper';
import BusinessUnitMapper from './BusinessUnitMapper';
import {
  DeliveryItem,
  Parcel,
} from '@royalcyber/global-types/dist/types/cart/Delivery';

export class CartMapper {
  static commercetoolsCartToCart: (
    commercetoolsCart: CommercetoolsCart,
    locale: Locale,
    defaultLocale: string,
    clientType: ClientType,
  ) => Cart = (
    commercetoolsCart: CommercetoolsCart,
    locale: Locale,
    defaultLocale: string,
    clientType: ClientType,
  ) => {
      if (clientType === ClientType.BO) {
        return {
          cartId: commercetoolsCart.id,
          accountId: commercetoolsCart.customerId,
          cartVersion: commercetoolsCart.version.toString(),
          lineItems: CartMapper.commercetoolsLineItemsToLineItems(
            commercetoolsCart.lineItems,
            clientType,
          ),
          email: commercetoolsCart?.customerEmail,
          sum: ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsCart.totalPrice,
          ),
          shippingAddress: commercetoolsCart.shippingAddress
            ? CartMapper.commercetoolsAddressToAddress(
              commercetoolsCart.shippingAddress,
            )
            : undefined,
          billingAddress: commercetoolsCart.billingAddress
            ? CartMapper.commercetoolsAddressToAddress(
              commercetoolsCart.billingAddress,
            )
            : undefined,
          shippingInfo: CartMapper.commercetoolsShippingInfoToShippingInfo(
            commercetoolsCart.shippingInfo,
            clientType,
          ),
          payments: CartMapper.commercetoolsPaymentInfoToPayments(
            commercetoolsCart.paymentInfo,
            clientType,
          ),
          discountCodes: CartMapper.commercetoolsDiscountCodesInfoToDiscount(
            commercetoolsCart.discountCodes,
            clientType,
          ),
          taxed: CartMapper.commercetoolsTaxedPriceToTaxed(
            commercetoolsCart.taxedPrice,
          ),
          discountedAmount: commercetoolsCart.discountOnTotalPrice
            ?.discountedAmount
            ? ProductMapper.commercetoolsMoneyToMoney(
              commercetoolsCart.discountOnTotalPrice.discountedAmount,
            )
            : undefined,
          itemShippingAddresses: commercetoolsCart.itemShippingAddresses,
          origin: this.commercetoolsCartOriginToCartOrigin(
            commercetoolsCart.origin,
          ),
          cartState: this.commercetoolsCartStateToCartState(
            commercetoolsCart.cartState,
          ),
          storeKey: commercetoolsCart.store?.key,
          availableShippingMethods: [
            CartMapper.commercetoolsShippingMethodToShippingMethod(
              commercetoolsCart.shippingInfo?.shippingMethod?.obj!,
              clientType,
            ),
          ],
          customerId: commercetoolsCart?.customerId,
          customerGroup: commercetoolsCart?.customerGroup
            ? CustomerGroupMapper.commercetoolsCustomerGroupToCustomerGroup(
              commercetoolsCart?.customerGroup,
              clientType,
            )
            : ({} as CustomerGroup),
          anonymousId: commercetoolsCart?.anonymousId,
          businessUnitKey: commercetoolsCart?.businessUnit?.key,
          totalLineItemQuantity: commercetoolsCart?.totalLineItemQuantity,
          taxedShippingPrice: commercetoolsCart?.taxedShippingPrice,
          shippingKey: commercetoolsCart?.shippingKey,
          country: commercetoolsCart?.country,
          custom: commercetoolsCart?.custom,
          createdAt: commercetoolsCart?.createdAt
            ? new Date(commercetoolsCart?.createdAt)
            : undefined,
          lastModifiedAt: commercetoolsCart?.lastModifiedAt,
        };
      }

      return {
        cartId: commercetoolsCart.id,
        accountId: commercetoolsCart.customerId,
        cartVersion: commercetoolsCart.version.toString(),
        lineItems: CartMapper.commercetoolsLineItemsToLineItems(
          commercetoolsCart.lineItems,
          clientType,
          locale,
          defaultLocale,
        ),
        email: commercetoolsCart?.customerEmail,
        sum: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsCart.totalPrice,
        ),
        shippingAddress: commercetoolsCart.shippingAddress
          ? CartMapper.commercetoolsAddressToAddress(
            commercetoolsCart.shippingAddress,
          )
          : undefined,
        billingAddress: commercetoolsCart.billingAddress
          ? CartMapper.commercetoolsAddressToAddress(
            commercetoolsCart.billingAddress,
          )
          : undefined,
        shippingInfo: CartMapper.commercetoolsShippingInfoToShippingInfo(
          commercetoolsCart.shippingInfo,
          clientType,
          locale,
          defaultLocale,
        ),
        payments: CartMapper.commercetoolsPaymentInfoToPayments(
          commercetoolsCart.paymentInfo,
          clientType,
          locale,
        ),
        discountCodes: CartMapper.commercetoolsDiscountCodesInfoToDiscount(
          commercetoolsCart.discountCodes,
          clientType,
          locale,
          defaultLocale,
        ),
        taxed: CartMapper.commercetoolsTaxedPriceToTaxed(
          commercetoolsCart.taxedPrice,
          locale,
        ),
        discountedAmount: commercetoolsCart.discountOnTotalPrice?.discountedAmount
          ? ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsCart.discountOnTotalPrice.discountedAmount,
          )
          : undefined,
        itemShippingAddresses: commercetoolsCart.itemShippingAddresses,
        origin: this.commercetoolsCartOriginToCartOrigin(
          commercetoolsCart.origin,
        ),
        cartState: this.commercetoolsCartStateToCartState(
          commercetoolsCart.cartState,
        ),
        storeKey: commercetoolsCart.store?.key,
        availableShippingMethods: [
          CartMapper.commercetoolsShippingMethodToShippingMethod(
            commercetoolsCart.shippingInfo?.shippingMethod?.obj!,
            clientType,
            locale,
            defaultLocale,
          ),
        ],
      };
    };

  static commercetoolsLineItemsToLineItems: (
    commercetoolsLineItems: CommercetoolsLineItem[],
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => LineItem[] = (
    commercetoolsLineItems: CommercetoolsLineItem[],
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => {
      const lineItems: LineItem[] = [];

      if (clientType === ClientType.BO) {
        commercetoolsLineItems?.forEach((commercetoolsLineItem) => {
          const item: LineItem = {
            lineItemId: commercetoolsLineItem.id,
            productId: commercetoolsLineItem.productId,
            name: commercetoolsLineItem?.name || '',
            type: 'variant',
            count: commercetoolsLineItem.quantity,
            price: ProductMapper.commercetoolsMoneyToMoney(
              commercetoolsLineItem.price?.value,
            ),
            discountedPrice: commercetoolsLineItem.price?.discounted?.value
              ? ProductMapper.commercetoolsMoneyToMoney(
                commercetoolsLineItem.price.discounted.value,
              )
              : undefined,
            discountTexts:
              CartMapper.commercetoolsDiscountedPricesPerQuantityToDiscountTexts(
                clientType,
                commercetoolsLineItem.discountedPricePerQuantity,
              ),
            discounts:
              CartMapper.commercetoolsDiscountedPricesPerQuantityToDiscounts(
                clientType,
                commercetoolsLineItem.discountedPricePerQuantity,
              ),
            totalPrice: commercetoolsLineItem?.totalPrice,
            taxed: commercetoolsLineItem?.taxedPrice,
            taxRate: commercetoolsLineItem?.taxRate,
            variant: ProductMapper.commercetoolsProductVariantToVariant(
              commercetoolsLineItem.variant,
              clientType,
            ),
            isGift:
              commercetoolsLineItem?.lineItemMode !== undefined &&
              commercetoolsLineItem.lineItemMode === 'GiftLineItem',
            _url: ProductRouter.generateUrlFor({
              productId: commercetoolsLineItem.productId,
              productSlug: commercetoolsLineItem.productSlug,
            }),
            key: commercetoolsLineItem?.key,
            productSlug: commercetoolsLineItem?.productSlug,
            supplyChannel: commercetoolsLineItem?.supplyChannel,
            distributionChannel: commercetoolsLineItem?.distributionChannel,
            custom: commercetoolsLineItem?.custom,
            priceMode: commercetoolsLineItem?.priceMode,
            lineItemMode: commercetoolsLineItem?.lineItemMode,
            inventoryMode: commercetoolsLineItem?.inventoryMode,
            createdAt: commercetoolsLineItem?.addedAt,
            lastModifiedAt: commercetoolsLineItem?.lastModifiedAt,
            perMethodTaxRate: commercetoolsLineItem?.perMethodTaxRate,
          };
          lineItems.push(item);
        });
        return lineItems;
      }

      commercetoolsLineItems?.forEach((commercetoolsLineItem) => {
        const item: LineItem = {
          lineItemId: commercetoolsLineItem.id,
          productId: commercetoolsLineItem.productId,
          name:
            locale && defaultLocale
              ? LocalizedValue.getLocalizedValue(
                locale,
                defaultLocale,
                commercetoolsLineItem?.name,
              )
              : '',
          type: 'variant',
          count: commercetoolsLineItem.quantity,
          price: ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsLineItem.price?.value,
          ),
          discountedPrice: commercetoolsLineItem.price?.discounted?.value
            ? ProductMapper.commercetoolsMoneyToMoney(
              commercetoolsLineItem.price.discounted.value,
            )
            : undefined,
          discountTexts:
            locale && defaultLocale
              ? CartMapper.commercetoolsDiscountedPricesPerQuantityToDiscountTexts(
                clientType,
                commercetoolsLineItem.discountedPricePerQuantity,
                locale,
                defaultLocale,
              )
              : [],
          discounts:
            locale && defaultLocale
              ? CartMapper.commercetoolsDiscountedPricesPerQuantityToDiscounts(
                clientType,
                commercetoolsLineItem.discountedPricePerQuantity,
                locale,
                defaultLocale,
              )
              : [],
          discountedPricePerCount:
            locale && defaultLocale
              ? this.commercetoolsDiscountedPricesPerQuantityToDiscountedPricePerCount(
                commercetoolsLineItem.discountedPricePerQuantity,
                clientType,
                locale,
                defaultLocale,
              )
              : [],
          totalPrice: ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsLineItem.totalPrice,
          ),
          taxed: this.commercetoolsTaxedItemPriceToTaxed(
            commercetoolsLineItem.taxedPrice,
          ),
          taxRate: this.commercetoolsTaxRateToTaxRate(
            commercetoolsLineItem.taxRate,
          ),
          variant:
            locale && defaultLocale
              ? ProductMapper.commercetoolsProductVariantToVariant(
                commercetoolsLineItem.variant,
                clientType,
                locale,
              )
              : {},
          isGift:
            commercetoolsLineItem?.lineItemMode !== undefined &&
            commercetoolsLineItem.lineItemMode === 'GiftLineItem',
        };
        item._url = ProductRouter.generateUrlFor(item);
        lineItems.push(item);
      });

      return lineItems;
    };

  static commercetoolsAddressToAddress: (
    commercetoolsAddress: CommercetoolsAddress,
  ) => Address = (commercetoolsAddress: CommercetoolsAddress) => {
    return {
      addressId: commercetoolsAddress?.id,
      salutation: commercetoolsAddress?.salutation,
      firstName: commercetoolsAddress?.firstName,
      lastName: commercetoolsAddress?.lastName,
      streetName: commercetoolsAddress?.streetName,
      streetNumber: commercetoolsAddress?.streetNumber,
      additionalStreetInfo: commercetoolsAddress?.additionalStreetInfo,
      additionalAddressInfo: commercetoolsAddress?.additionalAddressInfo,
      postalCode: commercetoolsAddress?.postalCode,
      city: commercetoolsAddress?.city,
      country: commercetoolsAddress?.country,
      state: commercetoolsAddress?.state,
      phone: commercetoolsAddress?.phone,
      email: commercetoolsAddress?.email,
      company: commercetoolsAddress?.company,
      department: commercetoolsAddress?.department,
      building: commercetoolsAddress?.building,
      apartment: commercetoolsAddress?.apartment,
      pOBox: commercetoolsAddress?.pOBox,
    };
  };

  static commercetoolsShipmentStateToShipmentState: (
    commercetoolsShipmentState: CommercetoolsShipmentState | undefined,
  ) => ShipmentState | undefined = (
    commercetoolsShipmentState: CommercetoolsShipmentState | undefined,
  ) => {
      switch (commercetoolsShipmentState) {
        case 'backorder':
          return ShipmentState.BACKORDER;
        case 'delayed':
          return ShipmentState.DELAYED;
        case 'delivered':
          return ShipmentState.DELIVERED;
        case 'partial':
          return ShipmentState.PARTIAL;
        case 'ready':
          return ShipmentState.READY;
        case 'shipped':
          return ShipmentState.SHIPPED;
        case 'pending':
        default:
          return ShipmentState.PENDING;
      }
    };
  static addressToCommercetoolsAddress: (
    address: Address,
  ) => CommercetoolsAddress = (address: Address) => {
    return {
      id: address?.addressId,
      salutation: address?.salutation,
      firstName: address?.firstName,
      lastName: address?.lastName,
      streetName: address?.streetName,
      streetNumber: address?.streetNumber,
      additionalStreetInfo: address?.additionalStreetInfo,
      additionalAddressInfo: address?.additionalAddressInfo,
      postalCode: address?.postalCode,
      city: address?.city,
      country: address?.country || '',
      state: address?.state,
      phone: address?.phone,
    };
  };

  static commercetoolsOrderToOrder: (
    commercetoolsOrder: CommercetoolsOrder,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => Order = (
    commercetoolsOrder: CommercetoolsOrder,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => {
      // BackOffice specific functionality
      if (clientType === ClientType.BO) {
        return {
          cartId: commercetoolsOrder.cart?.id || '',
          origin: this.commercetoolsCartOriginToCartOrigin(
            commercetoolsOrder.origin,
          ),
          orderId: commercetoolsOrder.id,
          orderNumber: commercetoolsOrder.orderNumber,
          orderVersion: commercetoolsOrder.version.toString(),
          createdAt: new Date(commercetoolsOrder.createdAt),
          lastModifiedAt: commercetoolsOrder.lastModifiedAt
            ? new Date(commercetoolsOrder.lastModifiedAt)
            : undefined,
          completedAt: commercetoolsOrder.completedAt
            ? new Date(commercetoolsOrder.completedAt)
            : undefined,
          orderState: this.commercetoolsOrderStateToOrderState(
            commercetoolsOrder.orderState,
          ),
          returnInfo: commercetoolsOrder.returnInfo
            ? CartMapper.commercetoolsReturnInfoToReturnInfo(
              commercetoolsOrder.returnInfo,
            )
            : undefined,
          purchaseOrderNumber: commercetoolsOrder.purchaseOrderNumber,
          shipmentState: CartMapper.commercetoolsShipmentStateToShipmentState(
            commercetoolsOrder.shipmentState,
          ),
          paymentState: commercetoolsOrder.paymentState,
          customerId: commercetoolsOrder.customerId,
          customerEmail: commercetoolsOrder.customerEmail,
          customerGroup: commercetoolsOrder?.customerGroup
            ? CustomerGroupMapper.commercetoolsCustomerGroupToCustomerGroup(
              commercetoolsOrder?.customerGroup,
              clientType,
            )
            : ({} as CustomerGroup),
          businessUnit: commercetoolsOrder.businessUnit?.key,
          store: commercetoolsOrder.store?.key,
          shippingAddress: commercetoolsOrder.shippingAddress
            ? CartMapper.commercetoolsAddressToAddress(
              commercetoolsOrder.shippingAddress,
            )
            : undefined,
          billingAddress: commercetoolsOrder.billingAddress
            ? CartMapper.commercetoolsAddressToAddress(
              commercetoolsOrder.billingAddress,
            )
            : undefined,
          itemShippingAddresses: commercetoolsOrder.itemShippingAddresses?.map(
            CartMapper.commercetoolsAddressToAddress,
          ),
          country: commercetoolsOrder.country,
          locale: commercetoolsOrder.locale,
          shippingKey: commercetoolsOrder.shippingKey,
          shippingInfo: commercetoolsOrder.shippingInfo
            ? CartMapper.commercetoolsShippingInfoToShippingInfo(
              commercetoolsOrder.shippingInfo,
              clientType,
            )
            : undefined,
          shippingRateInput: commercetoolsOrder.shippingRateInput,
          shippingCustomFields: commercetoolsOrder.shippingCustomFields,
          discountCodes: CartMapper.commercetoolsDiscountCodesInfoToDiscount(
            commercetoolsOrder.discountCodes,
            clientType,
          ),
          payments: CartMapper.commercetoolsPaymentInfoToPayments(
            commercetoolsOrder.paymentInfo,
            clientType,
          ),
          lineItems: CartMapper.commercetoolsLineItemsToLineItems(
            commercetoolsOrder.lineItems,
            clientType,
          ),
          sum: ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsOrder.totalPrice,
          ),
          taxedPrice: commercetoolsOrder.taxedPrice
            ? CartMapper.commercetoolsTaxedPriceToTaxed(
              commercetoolsOrder.taxedPrice,
            )
            : undefined,
          taxedShippingPrice: commercetoolsOrder.taxedShippingPrice
            ? CartMapper.commercetoolsTaxedPriceToTaxed(
              commercetoolsOrder.taxedShippingPrice,
            )
            : undefined,
          discountOnTotalPrice: commercetoolsOrder.discountOnTotalPrice
            ?.discountedAmount
            ? ProductMapper.commercetoolsMoneyToMoney(
              commercetoolsOrder.discountOnTotalPrice.discountedAmount,
            )
            : undefined,
          taxMode: commercetoolsOrder.taxMode,
          custom: commercetoolsOrder.custom,
          quote: commercetoolsOrder.quote?.id,
        } as Order;
      }

      // Web specific functionality
      return {
        cartId: commercetoolsOrder.cart?.id || '',
        origin: this.commercetoolsCartOriginToCartOrigin(
          commercetoolsOrder.origin,
        ),
        orderState: this.commercetoolsOrderStateToOrderState(
          commercetoolsOrder.orderState,
        ),
        orderId: commercetoolsOrder.id,
        orderNumber: commercetoolsOrder.orderNumber,
        purchaseOrderNumber: commercetoolsOrder.purchaseOrderNumber,
        orderVersion: commercetoolsOrder.version.toString(),
        createdAt: new Date(commercetoolsOrder.createdAt),
        lineItems: CartMapper.commercetoolsLineItemsToLineItems(
          commercetoolsOrder.lineItems,
          clientType,
          locale,
          defaultLocale,
        ),
        email: commercetoolsOrder?.customerEmail,
        shippingAddress: commercetoolsOrder.shippingAddress
          ? CartMapper.commercetoolsAddressToAddress(
            commercetoolsOrder.shippingAddress,
          )
          : undefined,
        billingAddress: commercetoolsOrder.billingAddress
          ? CartMapper.commercetoolsAddressToAddress(
            commercetoolsOrder.billingAddress,
          )
          : undefined,
        sum: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsOrder.totalPrice,
        ),
        taxed: CartMapper.commercetoolsTaxedPriceToTaxed(
          commercetoolsOrder.taxedPrice,
          locale,
        ),
        discountedAmount: commercetoolsOrder.discountOnTotalPrice
          ?.discountedAmount
          ? ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsOrder.discountOnTotalPrice.discountedAmount,
          )
          : undefined,
        payments: CartMapper.commercetoolsPaymentInfoToPayments(
          commercetoolsOrder.paymentInfo,
          clientType,
          locale,
        ),
        shipmentState: CartMapper.commercetoolsShipmentStateToShipmentState(
          commercetoolsOrder.shipmentState,
        ),
      };
    };

  static commercetoolsShippingInfoToShippingInfo: (
    commercetoolsShippingInfo: CommercetoolsShippingInfo | undefined,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => ShippingInfo | undefined = (
    commercetoolsShippingInfo: CommercetoolsShippingInfo | undefined,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => {
      if (commercetoolsShippingInfo === undefined) {
        return undefined;
      }

      let shippingMethod: ShippingMethod = {
        shippingMethodId: commercetoolsShippingInfo?.shippingMethod?.id || '',
      };

      if (clientType === ClientType.BO) {
        return {
          ...shippingMethod,
          price: ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsShippingInfo.price,
          ),
          taxed: this.commercetoolsTaxedItemPriceToTaxed(
            commercetoolsShippingInfo.taxedPrice,
          ),
          taxIncludedInPrice: commercetoolsShippingInfo.taxRate?.includedInPrice,
          discounts:
            commercetoolsShippingInfo.discountedPrice?.includedDiscounts?.map(
              (commercetoolsDiscountedLineItemPortion) => {
                return this.commercetoolsDiscountedLineItemPortionToDiscount(
                  commercetoolsDiscountedLineItemPortion,
                  clientType,
                );
              },
            ),
          shippingMethodName:
            commercetoolsShippingInfo?.shippingMethod?.obj?.name,
          shippingRate: commercetoolsShippingInfo?.shippingRate,
          taxRate: commercetoolsShippingInfo?.taxRate,
          taxCategory: commercetoolsShippingInfo?.taxCategory,
          shippingMethod: commercetoolsShippingInfo?.shippingMethod?.obj
            ? {
              shippingMethodId: commercetoolsShippingInfo.shippingMethod.obj.id,
              name: commercetoolsShippingInfo.shippingMethod.obj.name,
            }
            : undefined,
          shippingMethodState: commercetoolsShippingInfo?.shippingMethodState,
          deliveries: commercetoolsShippingInfo?.deliveries
            ? commercetoolsShippingInfo.deliveries
              .map((delivery) =>
                this.commercetoolsDeliveryToDelivery(
                  delivery,
                  clientType,
                  locale,
                ),
              )
              .filter(
                (delivery): delivery is Delivery => delivery !== undefined,
              )
            : undefined,
        };
      }

      // For non-BO clients
      return {
        ...shippingMethod,
        price: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsShippingInfo.price,
        ),
        taxed: this.commercetoolsTaxedItemPriceToTaxed(
          commercetoolsShippingInfo.taxedPrice,
        ),
        taxIncludedInPrice: commercetoolsShippingInfo.taxRate?.includedInPrice,
        discounts:
          commercetoolsShippingInfo.discountedPrice?.includedDiscounts?.map(
            (commercetoolsDiscountedLineItemPortion) => {
              return this.commercetoolsDiscountedLineItemPortionToDiscount(
                commercetoolsDiscountedLineItemPortion,
                clientType,
                locale,
                defaultLocale,
              );
            },
          ),
      };
    };

  static commercetoolsShippingMethodToShippingMethod: (
    commercetoolsShippingMethod: CommercetoolsShippingMethod,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => ShippingMethod = (
    commercetoolsShippingMethod: CommercetoolsShippingMethod,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => {
      if (clientType === ClientType.BO) {
        return {
          shippingMethodId: commercetoolsShippingMethod?.id || undefined,
          name: commercetoolsShippingMethod?.localizedName,
          description: commercetoolsShippingMethod?.localizedDescription,
          rates: CartMapper.commercetoolsZoneRatesToRates(
            commercetoolsShippingMethod?.zoneRates,
            clientType,
          ),
        } as ShippingMethod;
      }
      return {
        shippingMethodId: commercetoolsShippingMethod?.id || undefined,
        name:
          locale && defaultLocale
            ? LocalizedValue.getLocalizedValue(
              locale,
              defaultLocale,
              commercetoolsShippingMethod?.localizedName,
            )
            : undefined,
        description:
          locale && defaultLocale
            ? LocalizedValue.getLocalizedValue(
              locale,
              defaultLocale,
              commercetoolsShippingMethod?.localizedDescription,
            )
            : undefined,
        rates:
          locale && defaultLocale
            ? CartMapper.commercetoolsZoneRatesToRates(
              commercetoolsShippingMethod?.zoneRates,
              clientType,
              locale,
            )
            : [],
      } as ShippingMethod;
    };

  static commercetoolsZoneRatesToRates: (
    commercetoolsZoneRates: CommercetoolsZoneRate[] | undefined,
    clientType: ClientType,
    locale?: Locale,
  ) => ShippingRate[] | undefined = (
    commercetoolsZoneRates: CommercetoolsZoneRate[] | undefined,
    clientType: ClientType,
    locale?: Locale,
  ) => {
      if (commercetoolsZoneRates === undefined) {
        return undefined;
      }

      const shippingRates: ShippingRate[] = [];

      commercetoolsZoneRates.forEach((commercetoolsZoneRate) => {
        const shippingRateId = commercetoolsZoneRate.zone.id;
        const name = commercetoolsZoneRate.zone?.obj?.name || undefined;
        const locations = commercetoolsZoneRate.zone?.obj?.locations?.map(
          (location) => {
            return {
              country: location.country,
              state: location.state,
            } as ShippingLocation;
          },
        );

        // When we tried to get only matching shipping methods, `isMatching` value will be returned.
        // In those cases, we'll only map the ones with value `true`.
        const matchingShippingRates = commercetoolsZoneRate.shippingRates.filter(
          function (shippingRate) {
            if (
              shippingRate.isMatching !== undefined &&
              shippingRate.isMatching !== true
            ) {
              return false; // skip
            }
            return true;
          },
        );

        matchingShippingRates.forEach((matchingShippingRates) => {
          const matchingShippingRatePriceTiers =
            matchingShippingRates.tiers.filter(function (shippingRatePriceTier) {
              if (shippingRatePriceTier.isMatching !== true) {
                return false; // skip
              }
              return true;
            });

          shippingRates.push({
            shippingRateId: shippingRateId,
            name: name,
            locations: locations,
            price:
              // If there are multiple matching price, we only consider the first match.
              matchingShippingRatePriceTiers.length > 0
                ? matchingShippingRatePriceTiers[0].price
                  ? ProductMapper.commercetoolsMoneyToMoney(
                    matchingShippingRatePriceTiers[0].price,
                  )
                  : undefined
                : ProductMapper.commercetoolsMoneyToMoney(
                  matchingShippingRates.price,
                ),
          } as ShippingRate);
        });
      });

      return shippingRates;
    };

  static commercetoolsPaymentInfoToPayments: (
    commercetoolsPaymentInfo: CommercetoolsPaymentInfo | undefined,
    clientType: ClientType,
    locale?: Locale,
  ) => Payment[] = (
    commercetoolsPaymentInfo: CommercetoolsPaymentInfo | undefined,
    clientType: ClientType,
    locale?: Locale,
  ) => {
      const payments: Payment[] = [];

      if (clientType === ClientType.BO) {
        commercetoolsPaymentInfo?.payments?.forEach((commercetoolsPayment) => {
          if (commercetoolsPayment.obj) {
            payments.push(
              CartMapper.commercetoolsPaymentToPayment(commercetoolsPayment.obj),
            );
          }
        });
        return payments;
      }

      if (locale) {
        commercetoolsPaymentInfo?.payments?.forEach((commercetoolsPayment) => {
          if (commercetoolsPayment.obj) {
            payments.push(
              CartMapper.commercetoolsPaymentToPayment(
                commercetoolsPayment.obj,
                locale,
              ),
            );
          }
        });
        return payments;
      }
      return payments;
    };

  static commercetoolsPaymentToPayment: (
    commercetoolsPayment: CommercetoolsPayment,
    locale?: Locale,
  ) => Payment = (
    commercetoolsPayment: CommercetoolsPayment,
    locale?: Locale,
  ) => {
      return {
        id: commercetoolsPayment.id ?? null,
        paymentId: commercetoolsPayment.interfaceId ?? '',
        paymentProvider:
          commercetoolsPayment.paymentMethodInfo.paymentInterface || '',
        paymentMethod: commercetoolsPayment.paymentMethodInfo.method ?? '',
        amountPlanned: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsPayment.amountPlanned,
        ) ?? { currencyCode: '', centAmount: 0 },
        debug: JSON.stringify(commercetoolsPayment),
        paymentStatus: commercetoolsPayment.paymentStatus.interfaceCode ?? '',
        version: commercetoolsPayment.version ?? 0,
      };
    };

  static commercetoolsDiscountCodesInfoToDiscount: (
    commercetoolsDiscountCodesInfo: CommercetoolsDiscountCodeInfo[] | undefined,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => Discount[] = (
    commercetoolsDiscountCodesInfo: CommercetoolsDiscountCodeInfo[] | undefined,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => {
      const discounts: Discount[] = [];

      if (clientType === ClientType.BO) {
        commercetoolsDiscountCodesInfo?.forEach(
          (commercetoolsDiscountCodeInfo) => {
            discounts.push(
              CartMapper.commercetoolsDiscountCodeInfoToDiscountCode(
                commercetoolsDiscountCodeInfo,
                clientType,
              ),
            );
          },
        );
      }

      if (locale) {
        commercetoolsDiscountCodesInfo?.forEach(
          (commercetoolsDiscountCodeInfo) => {
            discounts.push(
              CartMapper.commercetoolsDiscountCodeInfoToDiscountCode(
                commercetoolsDiscountCodeInfo,
                clientType,
                locale,
                defaultLocale,
              ),
            );
          },
        );
      }

      return discounts;
    };

  static commercetoolsDiscountCodeInfoToDiscountCode: (
    commercetoolsDiscountCodeInfo: CommercetoolsDiscountCodeInfo,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => Discount = (
    commercetoolsDiscountCodeInfo: CommercetoolsDiscountCodeInfo,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ) => {
      let discount: Discount = {
        state: commercetoolsDiscountCodeInfo.state,
      };

      if (clientType === ClientType.BO) {
        if (commercetoolsDiscountCodeInfo.discountCode.obj) {
          const commercetoolsDiscountCode =
            commercetoolsDiscountCodeInfo.discountCode.obj;

          discount = {
            ...discount,
            discountId: commercetoolsDiscountCode.id,
            code: commercetoolsDiscountCode.code,
            name: commercetoolsDiscountCode.name || undefined,
            description: commercetoolsDiscountCode.description || undefined,
          };
        }
      }

      if (
        commercetoolsDiscountCodeInfo.discountCode.obj &&
        locale &&
        defaultLocale
      ) {
        const commercetoolsDiscountCode =
          commercetoolsDiscountCodeInfo.discountCode.obj;

        discount = {
          ...discount,
          discountId: commercetoolsDiscountCode.id,
          code: commercetoolsDiscountCode.code,
          name:
            LocalizedValue.getLocalizedValue(
              locale,
              defaultLocale,
              commercetoolsDiscountCode.name,
            ) || undefined,
          description:
            LocalizedValue.getLocalizedValue(
              locale,
              defaultLocale,
              commercetoolsDiscountCode.description,
            ) || undefined,
        };
      }

      return discount;
    };

  static commercetoolsDiscountedPricesPerQuantityToDiscountTexts: (
    clientType: ClientType,
    commercetoolsDiscountedLineItemPricesForQuantity:
      | CommercetoolsDiscountedLineItemPriceForQuantity[]
      | undefined,
    locale?: Locale,
    defaultLocale?: string,
  ) => string[] = (
    clientType: ClientType,
    commercetoolsDiscountedLineItemPricesForQuantity:
      | CommercetoolsDiscountedLineItemPriceForQuantity[]
      | undefined,
    locale?: Locale,
    defaultLocale?: string,
  ) => {
      const discountTexts: (string | LocalizedString | undefined)[] = [];

      if (clientType === ClientType.BO) {
        commercetoolsDiscountedLineItemPricesForQuantity?.forEach(
          (commercetoolsDiscountedLineItemPriceForQuantity) => {
            commercetoolsDiscountedLineItemPriceForQuantity.discountedPrice.includedDiscounts.forEach(
              (commercetoolsDiscountedLineItemPortion) => {
                if (
                  this.isCartDiscountReference(
                    commercetoolsDiscountedLineItemPortion.discount,
                  )
                ) {
                  const discountName =
                    commercetoolsDiscountedLineItemPortion.discount.obj?.name;
                  discountTexts.push(discountName);
                }
              },
            );
          },
        );
      }

      if (clientType === ClientType.WEB && locale) {
        commercetoolsDiscountedLineItemPricesForQuantity?.forEach(
          (commercetoolsDiscountedLineItemPriceForQuantity) => {
            commercetoolsDiscountedLineItemPriceForQuantity.discountedPrice.includedDiscounts.forEach(
              (commercetoolsDiscountedLineItemPortion) => {
                if (
                  this.isCartDiscountReference(
                    commercetoolsDiscountedLineItemPortion.discount,
                  )
                ) {
                  discountTexts.push(
                    LocalizedValue.getLocalizedValue(
                      locale,
                      defaultLocale || '',
                      commercetoolsDiscountedLineItemPortion.discount.obj?.name,
                    ),
                  );
                }
              },
            );
          },
        );
      }

      return discountTexts.filter(
        (text): text is string => typeof text === 'string',
      );
    };

  static commercetoolsDiscountedPricesPerQuantityToDiscounts: (
    clientType: ClientType,
    commercetoolsDiscountedLineItemPricesForQuantity?:
      | CommercetoolsDiscountedLineItemPriceForQuantity[]
      | undefined,
    locale?: Locale,
    defaultLocale?: string,
  ) => Discount[] = (
    clientType: ClientType,
    commercetoolsDiscountedLineItemPricesForQuantity?:
      | CommercetoolsDiscountedLineItemPriceForQuantity[]
      | undefined,
    locale?: Locale,
    defaultLocale?: string,
  ) => {
      const discounts: Discount[] = [];

      if (clientType === ClientType.BO) {
        commercetoolsDiscountedLineItemPricesForQuantity?.forEach(
          (commercetoolsDiscountedLineItemPriceForQuantity) => {
            commercetoolsDiscountedLineItemPriceForQuantity.discountedPrice.includedDiscounts.forEach(
              (commercetoolsDiscountedLineItemPortion) => {
                discounts.push(
                  CartMapper.commercetoolsDiscountedLineItemPortionToDiscount(
                    commercetoolsDiscountedLineItemPortion,
                    clientType,
                  ),
                );
              },
            );
          },
        );
      }

      if (clientType === ClientType.WEB && locale) {
        commercetoolsDiscountedLineItemPricesForQuantity?.forEach(
          (commercetoolsDiscountedLineItemPriceForQuantity) => {
            commercetoolsDiscountedLineItemPriceForQuantity.discountedPrice.includedDiscounts.forEach(
              (commercetoolsDiscountedLineItemPortion) => {
                discounts.push(
                  CartMapper.commercetoolsDiscountedLineItemPortionToDiscount(
                    commercetoolsDiscountedLineItemPortion,
                    clientType,
                    locale,
                    defaultLocale,
                  ),
                );
              },
            );
          },
        );
      }

      return discounts;
    };

  static commercetoolsDiscountedPricesPerQuantityToDiscountedPricePerCount(
    commercetoolsDiscountedLineItemPricesForQuantity:
      | CommercetoolsDiscountedLineItemPriceForQuantity[]
      | undefined,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ): DiscountedPricePerCount[] {
    return commercetoolsDiscountedLineItemPricesForQuantity
      ? commercetoolsDiscountedLineItemPricesForQuantity.map(
        (commercetoolsDiscountedLineItemPriceForQuantity) => {
          return {
            count: commercetoolsDiscountedLineItemPriceForQuantity.quantity,
            discounts:
              commercetoolsDiscountedLineItemPriceForQuantity.discountedPrice.includedDiscounts.map(
                (commercetoolsDiscountedLineItemPortion) =>
                  this.commercetoolsDiscountedLineItemPortionToDiscount(
                    commercetoolsDiscountedLineItemPortion,
                    clientType,
                    locale,
                    defaultLocale,
                  ),
              ),
          };
        },
      )
      : [];
  }

  static commercetoolsDiscountedLineItemPortionToDiscount = (
    commercetoolsDiscountedLineItemPortion: CommercetoolsDiscountedLineItemPortion,
    clientType: ClientType,
    locale?: Locale,
    defaultLocale?: string,
  ): Discount => {
    let discount: Discount = {
      discountedAmount: ProductMapper.commercetoolsMoneyToMoney(
        commercetoolsDiscountedLineItemPortion.discountedAmount,
      ),
    };

    if (
      this.isCartDiscountReference(
        commercetoolsDiscountedLineItemPortion.discount,
      )
    ) {
      const commercetoolsCartDiscount =
        commercetoolsDiscountedLineItemPortion.discount.obj;

      if (clientType === ClientType.BO) {
        discount = {
          ...discount,
          discountId: commercetoolsCartDiscount?.id,
          name: commercetoolsCartDiscount?.name || '',
          description: commercetoolsCartDiscount?.description || '',
          discountedAmount: ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsDiscountedLineItemPortion.discountedAmount,
          ),
          validFrom: commercetoolsCartDiscount?.validFrom,
          validUntil: commercetoolsCartDiscount?.validUntil,
        };
      }

      if (locale && defaultLocale) {
        discount = {
          ...discount,
          discountId: commercetoolsCartDiscount?.id,
          name:
            LocalizedValue.getLocalizedValue(
              locale,
              defaultLocale,
              commercetoolsCartDiscount?.name,
            ) ?? undefined,
          description:
            LocalizedValue.getLocalizedValue(
              locale,
              defaultLocale,
              commercetoolsCartDiscount?.description,
            ) ?? undefined,
        };
      }
    }

    return discount;
  };

  static commercetoolsTaxedPriceToTaxed: (
    commercetoolsTaxedPrice: CommercetoolsTaxedPrice | undefined,
    locale?: Locale,
  ) => Tax | undefined = (
    commercetoolsTaxedPrice: CommercetoolsTaxedPrice | undefined,
    locale?: Locale,
  ) => {
      if (commercetoolsTaxedPrice === undefined) {
        return undefined;
      }

      return {
        netAmount: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsTaxedPrice.totalNet,
        ),
        grossAmount: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsTaxedPrice.totalGross,
        ),
        taxAmount: commercetoolsTaxedPrice.totalTax
          ? ProductMapper.commercetoolsMoneyToMoney(
            commercetoolsTaxedPrice.totalTax,
          )
          : undefined,
        taxPortions: commercetoolsTaxedPrice.taxPortions.map(
          (commercetoolsTaxPortion) => {
            const taxPortion: TaxPortion = {
              amount: ProductMapper.commercetoolsMoneyToMoney(
                commercetoolsTaxPortion.amount,
              ),
              name: commercetoolsTaxPortion.name,
              rate: commercetoolsTaxPortion.rate,
            };

            return taxPortion;
          },
        ),
      };
    };

  static commercetoolsTaxedItemPriceToTaxed(
    commercetoolsTaxedPrice: CommercetoolsTaxedItemPrice | undefined,
  ): Tax | undefined {
    if (commercetoolsTaxedPrice === undefined) {
      return undefined;
    }

    return {
      netAmount: ProductMapper.commercetoolsMoneyToMoney(
        commercetoolsTaxedPrice.totalNet,
      ),
      grossAmount: ProductMapper.commercetoolsMoneyToMoney(
        commercetoolsTaxedPrice.totalGross,
      ),
      taxAmount: commercetoolsTaxedPrice.totalTax
        ? ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsTaxedPrice.totalTax,
        )
        : undefined,
    };
  }

  static commercetoolsTaxRateToTaxRate(
    commercetoolsTaxRate: CommercetoolsTaxRate | undefined,
  ): TaxRate | undefined {
    if (commercetoolsTaxRate === undefined) {
      return undefined;
    }

    return {
      taxRateId: commercetoolsTaxRate?.id,
      taxRateKey: commercetoolsTaxRate?.key,
      name: commercetoolsTaxRate?.name,
      amount: commercetoolsTaxRate?.amount,
      includedInPrice: commercetoolsTaxRate?.includedInPrice,
      country: commercetoolsTaxRate?.country,
      state: commercetoolsTaxRate?.state,
    };
  }

  static commercetoolsCartOriginToCartOrigin(
    commercetoolsCartOrigin: CommercetoolsCartOrigin,
  ): CartOrigin {
    let cartOrigin: CartOrigin;

    switch (true) {
      case commercetoolsCartOrigin === 'Merchant':
        cartOrigin = 'Merchant';
        break;
      case commercetoolsCartOrigin === 'Customer':
      default:
        cartOrigin = 'Customer';
        break;
    }

    return cartOrigin;
  }

  static commercetoolsCartStateToCartState(
    commercetoolsCartState: CommercetoolsCartState,
  ): CartState {
    let cartState: CartState;

    switch (true) {
      case commercetoolsCartState === 'Frozen':
        cartState = 'Frozen';
        break;
      case commercetoolsCartState === 'Merged':
        cartState = 'Merged';
        break;
      case commercetoolsCartState === 'Ordered':
        cartState = 'Ordered';
        break;
      case commercetoolsCartState === 'Active':
      default:
        cartState = 'Active';
        break;
    }

    return cartState;
  }

  static commercetoolsOrderStateToOrderState(
    commercetoolsOrderState: CommercetoolsOrderState,
  ): OrderState {
    let orderState: OrderState;

    switch (true) {
      case commercetoolsOrderState === 'Cancelled':
        orderState = 'Cancelled';
        break;
      case commercetoolsOrderState === 'Complete':
        orderState = 'Complete';
        break;
      case commercetoolsOrderState === 'Confirmed':
        orderState = 'Confirmed';
        break;
      case commercetoolsOrderState === 'Open':
      default:
        orderState = 'Open';
        break;
    }

    return orderState;
  }

  static commercetoolsReturnInfoToReturnInfo(
    commercetoolsReturnInfo: CommercetoolsReturnInfo[],
  ): ReturnInfo[] {
    return commercetoolsReturnInfo.map((returnInfo) => ({
      returnDate: returnInfo.returnDate
        ? new Date(returnInfo.returnDate)
        : undefined,
      returnTrackingId: returnInfo.returnTrackingId,
      lineItems: returnInfo.items.map((returnItem) => ({
        returnLineItemId: returnItem.id,
        count: returnItem.quantity,
        lineItemId: (returnItem as LineItemReturnItem)?.lineItemId,
        comment: returnItem.comment,
        createdAt: new Date(returnItem.createdAt),
      })),
    }));
  }

  static returnLineItemToCommercetoolsReturnItemDraft(
    returnItem: ReturnLineItem[],
  ): ReturnItemDraft[] {
    return returnItem.map((item) => ({
      quantity: item.count,
      lineItemId: item.lineItemId,
      shipmentState: 'Returned', //Initial state for Return Items that are refundable.
      comment: item?.comment,
    }));
  }

  static isCartDiscountReference(
    reference: Reference,
  ): reference is CartDiscountReference {
    return (reference as CartDiscountReference).obj !== undefined;
  }

  static commercetoolsDeliveryToDelivery = (
    commercetoolsDelivery: CommercetoolsDelivery,
    clientType: ClientType,
    locale?: Locale,
  ): Delivery | undefined => {
    if (!commercetoolsDelivery) {
      return undefined;
    }

    return {
      id: commercetoolsDelivery.id,
      createdAt: commercetoolsDelivery.createdAt,
      items: commercetoolsDelivery.items
        ?.map((item) =>
          this.commercetoolsDeliveryItemToDeliveryItem(
            item,
            clientType,
            locale,
          ),
        )
        .filter((item): item is DeliveryItem => item !== undefined),
      parcels: commercetoolsDelivery.parcels
        ?.map((parcel) =>
          this.commercetoolsParcelToParcel(parcel, clientType, locale),
        )
        .filter((parcel): parcel is Parcel => parcel !== undefined),
      address: commercetoolsDelivery.address
        ? CartMapper.commercetoolsAddressToAddress(
          commercetoolsDelivery.address,
        )
        : undefined,
    };
  };

  static commercetoolsDeliveryItemToDeliveryItem = (
    commercetoolsDeliveryItem: CommercetoolsDeliveryItem,
    clientType: ClientType,
    locale?: Locale,
  ): DeliveryItem | undefined => {
    if (!commercetoolsDeliveryItem) {
      return undefined;
    }

    return {
      id: commercetoolsDeliveryItem.id,
      quantity: commercetoolsDeliveryItem.quantity,
    };
  };

  static commercetoolsParcelToParcel = (
    commercetoolsParcel: CommercetoolsParcel,
    clientType: ClientType,
    locale?: Locale,
  ): Parcel | undefined => {
    if (!commercetoolsParcel) {
      return undefined;
    }

    return {
      id: commercetoolsParcel.id,
      createdAt: commercetoolsParcel.createdAt,
      measurements: commercetoolsParcel.measurements,
      trackingData: commercetoolsParcel.trackingData,
      items: commercetoolsParcel.items
        ?.map((parcelItem) =>
          this.commercetoolsDeliveryItemToDeliveryItem(
            parcelItem,
            clientType,
            locale,
          ),
        )
        .filter((item): item is DeliveryItem => item !== undefined),
    };
  };

  static commercetoolsOrdersToOrders(responseBody: any): {
    limit: number;
    offset: number;
    count: number;
    total: number;
    orders: Order[];
  } {
    const orders = responseBody.results.map((commercetoolsOrder: any) => ({
      id: commercetoolsOrder.id,
      key: commercetoolsOrder?.key,
      version: commercetoolsOrder.version.toString(),
      orderNumber: commercetoolsOrder.orderNumber,
      orderState: this.commercetoolsOrderStateToOrderState(
        commercetoolsOrder.orderState,
      ),
      paymentState: commercetoolsOrder.paymentState,
      shipmentState: CartMapper.commercetoolsShipmentStateToShipmentState(
        commercetoolsOrder.shipmentState,
      ),
      totalPrice: ProductMapper.commercetoolsMoneyToMoney(
        commercetoolsOrder.totalPrice,
      ),
      createdAt: new Date(commercetoolsOrder.createdAt),
    }));

    return {
      limit: responseBody.limit ?? 0,
      offset: responseBody.offset ?? 0,
      count: responseBody.count ?? 0,
      total: responseBody.total ?? 0,
      orders,
    };
  }
}
