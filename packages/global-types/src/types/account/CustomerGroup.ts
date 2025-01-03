import { LocalizedString } from '../LocalizedString';

export interface CustomerGroup {
  typeId?: 'customer-group';
  id?: string;
  version?: number;
  key?: string;
  name?: string;
  custom?: any;
  createdAt?: string;
  lastModifiedAt?: string;
}
