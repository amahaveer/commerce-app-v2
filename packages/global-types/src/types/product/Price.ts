import { Money } from './Money';

export interface Price {
  id: string;
  key?: string;
  value: Money;
  country?: string;
  customerGroupId?: string;
  channelId?: string;
  validFrom?: string;
  validUntil?: string;
  discounted?: any;
  tiers?: any[];
  custom?: any;
}
