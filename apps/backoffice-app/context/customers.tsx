'use client';
import {
  getCustomerDetail,
  getCustomerOrders,
  getCustomers
} from 'app/api/customer.api';
import { initialAddCustomerValues } from 'constants/customer.constant';

import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { createContext, useContext, useEffect, useState } from 'react';
import { AddCustomerForm, IExposeCutomer } from 'types/customer.type';
import { useStepper } from './stepper';

export const CustomerContext = createContext<IExposeCutomer>({
  customers: [],
  openDrawer: false,
  addCustomerForm: {},
  setAddCustomerForm: () => {},
  setOpenDrawer: () => {},
  setMappedCustomerData: () => {},
  mappedCustomerData: initialAddCustomerValues,
  onToolbarAction: () => {},
  customerDetail: [],
  customerOrders: []
});

export const CustomerProvider = ({ children, customerId }: any) => {
  const { onNext, onBack } = useStepper();
  const [customers, setCustomers] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [customerDetail, setCustomerdetail] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);

  const [addCustomerForm, setAddCustomerForm] = useState<any>(
    initialAddCustomerValues
  );
  const [mappedCustomerData, setMappedCustomerData] = useState(
    initialAddCustomerValues
  );
  const [selectedFilters, setSelectedFilters] = useState([
    { label: '', field: '', selectedValue: [], exact: true }
  ]);

  console.log('customerId', customerId);

  useEffect(() => {
    if (customerId) {
      getCustomerDetailHandler();
      getCustomerOrdersHandler();
    } else {
      getCustomersHandler();
    }
  }, [customerId]);

  const getCustomersHandler = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data || []);
      console.log('data', data);
    } catch (error) {
      return;
    }
  };

  console.log('customers from context', customers);
  const onToolbarAction = (actionType: eToolbarButtonActions) => {
    const actions = {
      cancel: null,
      save: null,
      next: onNext,
      back: onBack
    };
    actions[actionType]?.();
  };
  const expose: IExposeCutomer = {
    customers: customers,
    customerDetail: customerDetail,
    customerOrders: customerOrders,
    openDrawer,
    // selectedFilters,
    addCustomerForm,
    setAddCustomerForm,
    setOpenDrawer,
    setMappedCustomerData,
    mappedCustomerData,
    onToolbarAction
    // setSelectedFilters
  };

  const customerFormMapper = (customers?: any) => {
    console.log('sadsae2wqeewe', customers);
    const data = customers;
    console.log('sssssssssssssssss', data);
    const customerForm: AddCustomerForm = {
      generalInfo: {
        id: customers?.accountId,
        customerkey: customers?.key,
        title: customers?.title,
        salutation: customers?.salutation,
        middlename: customers?.middleName,
        email: customers?.email,
        customerName: customers?.firstName,
        customerLastName: customers?.lastName,
        externalId: customers?.externalId,
        customerGroup: customers?.customerGroup,
        createdAt: customers?.createdAt,
        modifiedAt: customers?.modifiedAt
      },
      addresses: {
        id: customers?.id,
        firstName: customers?.addresses?.firstname,
        lastName: customers?.addresses?.lastname,
        streetName: customers?.addresses?.streetName,
        streetNumber: customers?.addresses?.streetNumber,
        postalCode: customers?.addresses?.postalCode,
        city: customers?.addresses?.city,
        region: customers?.addresses?.region,
        country: customers?.addresses?.country
      },
      companyInfo: {
        compnayName: customers?.companyName,
        vatId: customers?.vatId
      }
    };
    setMappedCustomerData(customerForm);
  };

  const getCustomerDetailHandler = async () => {
    try {
      const data = await getCustomerDetail({ param: customerId });
      setCustomerdetail(data);
      customerFormMapper(data);
    } catch (error) {
      console.log('ERROR::', error);
      return;
    }
  };

  const getCustomerOrdersHandler = async () => {
    try {
      const data = await getCustomerOrders({ param: customerId });
      setCustomerOrders(data);
      // customerFormMapper(data);
    } catch (error) {
      console.log('ERROR::', error);
      return;
    }
  };

  return (
    <CustomerContext.Provider value={expose}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);

  if (context === undefined) {
    throw new Error('Component Must be used within a Product Provider');
  }

  return context;
};
