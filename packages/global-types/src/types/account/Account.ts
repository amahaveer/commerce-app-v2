import { Address } from './Address';
import { AccountToken } from './AccountToken';
import { CustomerGroup } from './CustomerGroup';

export interface Account {
  accountId?: string;
  version?: string;
  key?: string;
  customerNumber?: string;
  email: string;
  password?: string; // TODO: should we use hash the password or use plain password?
  salutation?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  middleName?: string;
  title?: string;
  birthday?: Date;
  vatId?: string;
  confirmationToken?: AccountToken;
  confirmed?: boolean;
  addresses?: Address[];
  apiToken?: string;
  externalId?: string;
  isGuest?: boolean;
  customerGroup?: CustomerGroup;
  locale?: string;
  stores?: string[];
  authenticationMode?: string;
  custom?: any;
  createdAt?: string;
  lastModifiedAt?: string;
}
