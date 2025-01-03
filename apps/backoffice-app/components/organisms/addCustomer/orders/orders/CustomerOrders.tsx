'use client';

import CustomButton from '@/components/atoms/Button';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import DataTable from '@/components/atoms/DataTable';
import { useStepper } from 'context/stepper';
import { orderColumns } from './column';
import SearchBar from '@/components/atoms/SearchBar';
import useTranslate from 'hooks/useTranslate';
import { useCustomers } from 'context/customers';

const dummyData = [
  {
    id: 'lifttech-solutions-es-from-quote-1',
    sku: 'canceled',
    key: 'failed',
    images: 'pending',
    pricing_from: '21600.00',
    inventory: '12/08/2024'
  },
  {
    id: 'lifttech-solutions-es-from-quote-2',
    sku: 'canceled',
    key: 'failed',
    images: 'pending',
    pricing_from: '21600.00',
    inventory: '12/08/2024'
  }
];

const CustomerOrderInfo = () => {
  const { customerOrders } = useCustomers();
  const [openOrderModal, setOrderModal] = useState(false);
  const [openEditOrderModal, setEditOrderModal] = useState(false);
  const { setActiveStep, activeStep } = useStepper();
  const { translate } = useTranslate();

  return (
    <Box className="pl-[5%] pr-[20px] pt-8">
      <Box className="flex flex-row ">
        <Box className="flex flex-col w-[70%]">
          <SearchBar
            className="w-[48rem]"
            onClickSearch={() => {}}
            placeholder={translate('common.searchByorder')}
          />
        </Box>
      </Box>

      <Box className="mt-4">
        <DataTable
          rows={customerOrders}
          columns={orderColumns}
          onRowClick={() => setEditOrderModal(true)}
        />
      </Box>
    </Box>
  );
};

export default CustomerOrderInfo;
