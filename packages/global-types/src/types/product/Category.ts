import { LocalizedString } from '../LocalizedString';

export interface Category {
  categoryId?: string;
  name?: string | LocalizedString;
  version?: number;
  depth?: number;
  _url?: string;
  externalId?: string;
  slug?: string | LocalizedString;
  description?: string | LocalizedString;
  parentId?: string;
  subCategories?: Category[];
  childCount?: number;
  stagedProductCount?: number;
  createdAt?: string;
  orderHint?: string;
  lastModifiedAt?: string;
  // ancestors?: Category[];
  key?: string;
}
