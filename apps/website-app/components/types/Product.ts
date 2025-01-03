interface CreatedBy {
  isPlatformClient: boolean;
}

interface ProductType {
  typeId: string;
  id: string;
}

interface TaxCategory {
  typeId: string;
  id: string;
}

interface MasterData {
  current: any; // You can replace `any` with the specific type if known
  staged: any;  // Replace `any` with the specific type if known
  published: boolean;
  hasStagedChanges: boolean;
}

export interface Product {
  createdAt: string; // ISO 8601 format date string
  createdBy: CreatedBy;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string; // ISO 8601 format date string
  lastModifiedBy: CreatedBy;
  lastVariantId: number;
  staged: any;
  priceMode: string;
  productType: ProductType;
  taxCategory: TaxCategory;
  version: number;
  versionModifiedAt: string; // ISO 8601 format date string
}

export interface orderData{
  
  invoiceId: string;
  orderDate: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: {
      id: number;
      name: string;
      quantity: number;
      price: number;
  }[];
  paymentMethod: string;
  shippingCost: number;
  discount: number;
  totalAmount: number;
}



