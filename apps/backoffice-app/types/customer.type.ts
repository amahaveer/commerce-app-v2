import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { Dispatch, SetStateAction } from 'react';

export interface AddCustomerForm {
  generalInfo: {
    id: string;
    salutation: string;
    middlename: string;
    customerkey: string;
    title: string;
    customerName: { 'en-US': string };
    customerLastName: string;
    email: string;
    externalId: string;
    customerGroup: string;
    createdAt: string;
    modifiedAt: string;
  };
  addresses: {
    id: string;
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
  };
  companyInfo: {
    vatId: any;
    compnayName: any;
  };
}
export interface IProductTableProps {
  columns: Array<any>;
}

export interface IExposeCutomer {
  customers: Array<any>;
  customerDetail: any;
  customerOrders: Array<any>;
  openDrawer: boolean;
  addCustomerForm: any;
  setAddCustomerForm: Dispatch<SetStateAction<AddCustomerForm>>;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setMappedCustomerData: Dispatch<SetStateAction<AddCustomerForm>>;
  mappedCustomerData: AddCustomerForm;
  onToolbarAction: (action: eToolbarButtonActions) => void;
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
