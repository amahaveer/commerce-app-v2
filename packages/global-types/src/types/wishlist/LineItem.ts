import { Variant } from '.';
import { Money } from '../product';

export interface LineItem {
  lineItemId: string;
  productId?: string;
  name?: string;
  type?: string;
  addedAt?: Date;
  count?: number;
  variant?: Variant;
  _url?: string;
  totalPrice?: Money;
}
