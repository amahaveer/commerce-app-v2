import { Account } from '../account';
import { LocalizedString } from '../LocalizedString';
import { Money } from '../product/Money';

export enum PaymentStatuses {
  INIT = 'init',
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export interface Payment {
  id: string;
  paymentProvider: string;
  paymentId: string;
  amountPlanned: Money;
  debug?: string;
  paymentStatus: string;
  version?: number;
  paymentMethod: string;
  paymentDetails?: [];
  createdAt?: string;
  lastModifiedAt?: string;
  customer?: Account;
  anonymousId?: string;
  interfaceId?: string;
  paymentMethodInfo?: PaymentMethodInfo;
  transactions?: Transaction[];
  interfaceInteractions?: any;
  custom?: any;
  key?: string;
}

export interface PaymentMethodInfo {
  paymentInterface?: string;
  method?: string;
  name?: LocalizedString;
}

export interface Transaction {
  id?: string;
  timestamp?: string;
  type?: string;
  amount?: Money;
  interactionId?: string;
  state?: string;
  custom?: any;
}
