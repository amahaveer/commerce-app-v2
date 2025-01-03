import { Account } from '../account';
import { Associate } from '../business-unit';
import { LocalizedString } from '../LocalizedString';
import { Money } from '../product/Money';

export interface Discount {
  discountId?: string;
  code?: string;
  state?: string;
  name?: string | LocalizedString | undefined;
  description?: string | LocalizedString | undefined;

  /**
   * Amount discounted.
   *
   * On Cart, the amount discounted in the cart.
   * On LineItem, the amount discounted per single line item.
   */
  discountedAmount?: Money;
  validFrom?: string;
  validUntil?: string;
}

export interface DiscountedPricePerCount {
  count?: number;
  discounts?: Discount[];
}
