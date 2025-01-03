import { LocalizedString } from '../product';

export interface ProductSelection {
  id?: string;
  version?: string;
  key?: string;
  name?: string | LocalizedString;
  productCount?: number;
  mode?: string;
  custom?: any;
  createdAt?: string;
  lastModifiedAt?: string;
  active?: boolean;
}
