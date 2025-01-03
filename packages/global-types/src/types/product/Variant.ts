import { Attributes } from './Attributes';
import { LocalizedString } from '../LocalizedString';
import { Money } from './Money';
import { Price } from './Price';
import { Image } from './Image';

export interface DiscountValue {
  type: 'absolute' | 'relative' | 'external';
  description?: string | LocalizedString;
  value?: number | Money;
  permyriad?: number;
}
export interface Variant {
  id?: number;
  sku?: string;
  groupId?: string;
  price?: Money;
  prices?: Price[];
  discountedPrice?: Money; // Discounted price
  discounts?: DiscountValue[];
  attributes?: Attributes;
  images?: Image[];
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
  isMatchingVariant?: boolean;
  isAvailable?: boolean;
  key?: string;
}
