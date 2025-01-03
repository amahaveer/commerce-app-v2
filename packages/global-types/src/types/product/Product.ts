import { Variant } from './Variant';
import { Category } from './Category';
import { LocalizedString } from '../LocalizedString';
import { ReviewRatingStatistics } from './ReviewRatingStatistics';
import { ProductType } from './ProductType';

export interface Product {
  productId?: string;
  productKey?: string;
  productRef?: string;
  productType?: ProductType;
  changed?: Date;
  version?: string;
  name?: string | LocalizedString;
  slug?: string | LocalizedString;
  description?: string | LocalizedString;
  categories?: Category[];
  variants: Variant[];
  _url?: string;
  status?: ProductStatus;
  taxCategory?: string;
  reviewRatingStatistics?: ReviewRatingStatistics | undefined;
  priceMode?: string | undefined;
  createdAt?: string;
  lastModifiedAt?: string;
}

export enum ProductStatus {
  Published = 'published',
  Modified = 'modified',
  Unpublished = 'unpublished',
}
