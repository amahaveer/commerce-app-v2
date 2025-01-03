import { ShippingMethod } from './ShippingMethod';
import { Money } from '../product/Money';
import { Tax } from './Tax';
import { Discount } from './Discount';
import { ShippingRate } from './ShippingRate';
import { TaxRate } from './TaxRate';
import { TaxCategory } from './TaxCategory';
import { Delivery } from './Delivery';

export interface ShippingInfo extends ShippingMethod {
  price?: Money;
  taxed?: Tax;
  taxIncludedInPrice?: boolean;
  discounts?: Discount[];
  shippingMethodName?: string;
  shippingRate?: ShippingRate;
  taxRate?: TaxRate;
  taxCategory?: TaxCategory;
  shippingMethod?: ShippingMethod;
  deliveries?: Delivery[];
  shippingMethodState?: string | undefined;
}
