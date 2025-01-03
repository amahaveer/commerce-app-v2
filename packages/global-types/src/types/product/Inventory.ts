import { Channel } from './Channel';

export interface Inventory {
  id?: string;
  version?: string;
  key?: string;
  sku?: string;
  supplyChannel?: Channel | undefined;
  quantityOnStock?: number;
  availableQuantity?: number;
  restockableInDays?: number;
  expectedDelivery: string;
  custom?: any;
  createdAt?: string;
  lastModifiedAt?: string;
}
