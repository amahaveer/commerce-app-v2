import { LocalizedString } from '../LocalizedString';
import { ShippingRate } from './ShippingRate';
import { TaxCategory } from './TaxCategory';

export interface ShippingMethod {
  shippingMethodId: string;
  name?: string | LocalizedString;
  description?: string | LocalizedString;
  rates?: ShippingRate[]; // TODO: should we get rid of rates?
  version?: number;
  createdAt?: string | undefined;
  lastModifiedAt?: string | undefined;
  key?: string | undefined;
  taxCategory?: TaxCategory;
  active?: boolean | undefined;
  isDefault?: boolean | undefined;
  predicate?: string | undefined;
  custom?: any
}
