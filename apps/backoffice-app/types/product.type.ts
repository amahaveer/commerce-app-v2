import { Dispatch, SetStateAction } from 'react';
import { TranslationKeys } from './global';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';

export interface IProductSelectionVariants {
  selection: { type: string; key: string; label: string };
  variantOption: 'all' | 'includeOnly' | 'includeAllExcept';
  skus: Array<string>;
}

export interface IVariant {
  id: number;
  sku: string;
  key: string;
  images: Array<any>;
  externalId: string;
  prices: Array<any>;
}

export interface IMappedProductForm {
  selectedProductType: string;
  generalInfo: {
    productName: any;
    productDescription: any;
    productKey: string;
    productPriceMode: string;
    taxCategory: string;
    categories?: Array<any>;
  };
  productSelections: Array<IProductSelectionVariants>;
  masterVariant: IVariant | null;
  variants: Array<IVariant>;
}
export interface IProductTableProps {
  columns: Array<any>;
}

export interface IExposeProduct {
  products: Array<any>;
  productInventory?: Array<any>;
  openDrawer: boolean;
  mappedProductData: IMappedProductForm;
  isEditMode: boolean;
  product: any;
  slug: string;
  productPagination?: { total: number; limit: number; offset: number };
  revertProductChanges: () => void;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setMappedProductData: Dispatch<SetStateAction<IMappedProductForm>>;
  onClickToolbarAction: (action: eToolbarButtonActions) => void;
}

export interface IExposeProductDetail {
  product: Array<any>;
  openDrawer: boolean;
  mappedProductData: IMappedProductForm;
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  setMappedProductData: Dispatch<SetStateAction<IMappedProductForm>>;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

export enum eAttributesType {
  TEXT = 'text',
  SET = 'set',
  BOOLEAN = 'boolean',
  DATE = 'date',
  REFERENCE = 'reference',
  MONEY = 'money',
  NUMBER = 'number'
}

export interface ICreateVariantExternalImage {
  variantID: number;
  image: {
    url: string;
    dimensions: {
      w: number;
      h: number;
    };
    label: string;
  };
}
