import { Address, CustomerGroup } from '../account';
import { BusinessUnit } from '../business-unit';
import { Inventory } from '../product';
import { Quote } from '../quote';
import { Store } from '../store';
import { Cart } from './Cart';
import { Discount } from './Discount';
import { Payment } from './Payment';
import { ShippingInfo } from './ShippingInfo';
import { ShippingRate } from './ShippingRate';
import { Tax } from './Tax';

export interface ReturnLineItem {
  returnLineItemId?: string;
  lineItemId: string;
  count: number;
  comment?: string;
  createdAt?: Date;
}

export interface ReturnInfo {
  lineItems: ReturnLineItem[];
  returnDate?: Date;
  returnTrackingId?: string;
}

export type OrderState = 'Cancelled' | 'Complete' | 'Confirmed' | 'Open';

export enum ShipmentState {
  BACKORDER = 'Backorder',
  DELAYED = 'Delayed',
  DELIVERED = 'Delivered',
  PARTIAL = 'Partial',
  PENDING = 'Pending',
  READY = 'Ready',
  SHIPPED = 'Shipped',
}

export interface Order extends Cart {
  orderId?: string;
  orderVersion?: string;
  orderNumber?: string;
  orderState?: string;
  createdAt?: Date;
  returnInfo?: ReturnInfo[];
  purchaseOrderNumber?: string;
  shipmentState?: ShipmentState;
  customerId?: string;
  customerEmail?: string;
  customerGroup?: CustomerGroup;
  business?: BusinessUnit;
  store?: Store;
  taxedPrice?: Tax;
  taxedShippingPrice?: Tax;
  discountOnTotalPrice?: Discount;
  taxMode?: Tax;
  billingAddress?: Address;
  shippingAddress?: Address;
  shippingKey?: string;
  shippingInfo?: ShippingInfo;
  shippingRateInput?: ShippingRate;
  shippingCustomFields?: any;
  shipping?: ShippingInfo[];
  itemShippingAddresses?: Address[];
  discountCodes?: Discount[];
  paymentInfo?: Payment;
  country?: string;
  locale?: string;
  cart?: Cart;
  quote?: Quote;
  paymentState?: string;
  custom?: any;
  lastModifiedAt?: string;
}
