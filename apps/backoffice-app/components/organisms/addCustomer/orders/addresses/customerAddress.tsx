'use client';
import AppDrawer from '@/components/atoms/AppDrawer';
import CustomButton from '@/components/atoms/Button';
import DataTable from '@/components/atoms/DataTable';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { Box } from '@mui/material';
import { useCustomers } from 'context/customers';
import { useStepper } from 'context/stepper';
import useTranslate from 'hooks/useTranslate';
import router from 'next/router';
import { useState } from 'react';
import AddNewAddress from '../../addNewAddress/addNewAddress';
import { addressColumns } from './column';


const dummyData = [
  {
    id: 1,
    contact_name: 'sofia',
    company_name: '--',
    address: 'La Rambla 91',
    city: 'Barcelona',
    postal_code: '08002',
    state: '--',
    region: 'Catalunya',
    country: 'ES',
    addressType: '--',
  }
];

const CustomerAddressInfo = () => {
  const [openCustomerAddressModal, setCustomerAddressModal] = useState(false);
  const [openEditAddressModal, setEditAddressModal] = useState(false);
  const { translate } = useTranslate();
  const { setActiveStep, activeStep } = useStepper();
  const onClickAddCustomer = () => router.push('/customer');
  const { mappedCustomerData,onToolbarAction } = useCustomers();
  return (
    <Box className="flex flex-col mt-10 w-[80vw]">
      <Box className="flex flex-row justify-end">
        <Box className="flex flex-col w-[20%]">
          <CustomButton.Add
            title={translate('common.addAddress')}
            onClick={() => setCustomerAddressModal(true)}
          />
        </Box>
      </Box>
      <Box className="mt-4">
        <DataTable
          rows={dummyData}
          columns={addressColumns}
          onRowClick={() => setEditAddressModal(true)}
        />
      </Box>
      <AppDrawer
        open={openCustomerAddressModal}
        onClose={() => setCustomerAddressModal(false)}
      >
        <AddNewAddress />
      </AppDrawer>
      <SaveToolbar
          isVisible={true}
          showSave
          showBack
          onClickAction={onToolbarAction}
        />
    </Box>
  );
};

export default CustomerAddressInfo;
