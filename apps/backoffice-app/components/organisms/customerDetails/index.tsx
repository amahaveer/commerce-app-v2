'use client';
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import TabsComponent from '@/components/atoms/tabs';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import useTranslate from 'hooks/useTranslate';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import IconTextLink from '@/components/atoms/IconTextLink';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { getPublishStatusOptions } from 'utils';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import router from 'next/router';
import CustomerOrderInfo from '@/components/organisms/addCustomer/orders/orders/CustomerOrders';
import CustomerAddressInfo from '@/components/organisms/addCustomer/orders/addresses/customerAddress';
import CustomFields from '@/components/organisms/addCustomer/customFields';
import CustomerGeneral from '@/components/organisms/addCustomer/general/customerGeneral';
import CustomerSecurity from '@/components/organisms/addCustomer/security/security';
import { useCustomers } from 'context/customers';

function CustomerDetails() {
  const { translate } = useTranslate();
  const { customers, customerDetail } = useCustomers();
  const publishStatusOptions = getPublishStatusOptions();

  console.log('for name', customerDetail);
  const tabsData = [
    {
      label: 'General',
      content: <CustomerGeneral customerDetail={customerDetail} />
    },
    { label: 'Security', content: <CustomerSecurity /> },
    { label: 'Custom Fields', content: <CustomFields /> },
    { label: 'Addresses', content: <CustomerAddressInfo /> },
    { label: 'Orders', content: <CustomerOrderInfo /> },
    { label: 'Business units', content: '' }
  ];

  const getTabsChildren = (): React.ReactNode => {
    return (
      <Box className="ml-auto pr-4 flex flex-row pb-2">
        <Box>
          <IconButton>
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <Box className="flex flex-col pt-4">
      <IconTextLink
        wrapperClass=" text-customBlue-periwinkle pl-10"
        textClass="text-[0.875rem]"
        text={translate('customers.toCustomerList')}
        icon={<ListOutlinedIcon className="w-[1rem] h-[1rem]" />}
        onClick={() => {
          router.push(`/customers`);
        }}
      />
      <Box className="flex flex-row px-10 items-center mt-2">
        <Box>
          <Typography className="text-2xl mb-2 mt-2 font-medium">
            {customerDetail?.firstName + ' ' + customerDetail?.lastName}
          </Typography>
        </Box>
        <Box className="ml-auto">
          <SelectDropdown
            options={[]}
            className="w-[21.375rem]"
            placeholder={translate('product.selectStore')}
            prefixIcon={
              <BusinessOutlinedIcon className="text-customGray mr-2" />
            }
            placeholderStyle="not-italic text-customGray"
          />
        </Box>
      </Box>

      <Box className="mt-4">
        <TabsComponent
          tabs={tabsData}
          tabsWrapperClass="px-6"
          contentClass="h-[65vh] overflow-y-auto"
          tabsChildren={getTabsChildren()}
        />
      </Box>
    </Box>
  );
}

export default CustomerDetails;
