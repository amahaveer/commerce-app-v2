import { Address } from '../../../../global-types/src/types/account';
import { Delivery } from '../../../../global-types/src/types/cart';

type AddCartItemPayload = {
  variant: {
    sku: string;
    count: number;
  };
};

type RemoveCartItemPayload = {
  lineItem: {
    id: string;
  };
};

type UpdateCartItemPayload = {
  lineItem: {
    id: string;
    count: number;
  };
};

type UpdateCartPayload = {
  account?: {
    email: string;
  };
  shipping?: Address;
  billing?: Address;
};

type GetCartShippingMethodsPayload = {
  query: {
    onlyMatching: boolean;
  };
};

type SetCartShippingMethodPayload = {
  shippingMethod: {
    id: string;
  };
};

type RedeemDiscountCodePayload = {
  code: string;
};

type RemoveDiscountCodePayload = {
  discountId: string;
};

type AddOrderDeliveryPayload = {
  orderId: string,
  deliveryDraft: {
    items: [{
      id: string;
      quantity: number;
    }],
    parcels?: Delivery['parcels'],
    address?: Address,
    custom?: any,
  },
}

export {
  type AddCartItemPayload,
  type RemoveCartItemPayload,
  type UpdateCartItemPayload,
  type UpdateCartPayload,
  type GetCartShippingMethodsPayload,
  type SetCartShippingMethodPayload,
  type RedeemDiscountCodePayload,
  type RemoveDiscountCodePayload,
  type AddOrderDeliveryPayload,
};
