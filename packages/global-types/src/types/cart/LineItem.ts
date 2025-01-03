import { Discount, DiscountedPricePerCount } from './Discount';
import { Variant } from '../product/Variant';
import { Money } from '../product/Money';
import { Tax } from './Tax';
import { TaxRate } from './TaxRate';
import { LocalizedString } from '../LocalizedString';
import { Channel } from '../product';
import { ShippingInfo } from './ShippingInfo';

export interface LineItem {
  lineItemId?: string;
  productId?: string;
  name?: string | LocalizedString;
  type?: string;
  count?: number;
  price?: Money; // Price of a single item
  discountedPrice?: Money; // Discounted price per item
  discountTexts?: string[]; // @deprecated use discountedPricePerCount instead
  discounts?: Discount[]; // @deprecated use discountedPricePerCount instead
  discountedPricePerCount?: DiscountedPricePerCount[];
  totalPrice?: Money;
  taxed?: Tax;
  taxRate?: TaxRate;
  variant?: Variant;
  isGift?: boolean;
  _url?: string;
  key?: string;
  productSlug?: string | LocalizedString;
  supplyChannel?: Channel;
  distributionChannel?: Channel;
  custom?: any
  priceMode?: string | undefined;
  lineItemMode?: string | undefined;
  inventoryMode?: string | undefined;
  createdAt?: string;
  lastModifiedAt?: string;
  perMethodTaxRate?: MethodTaxRate[] | undefined
}

export interface MethodTaxRate {
  shippingMethodKey: string;
  taxRate?: TaxRate;
}
