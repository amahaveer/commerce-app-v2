'use client';
import AddCustomerGroupForm from '@/components/organisms/addCustomerGroups';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';

function AddCustomerGroup() {
  const { translate } = useTranslate();

  return (
    <Box className="flex flex-col w-full h-[75vh] overflow-y-auto">
      <Box className="py-6 border-b border-gray-300 ">
        <Typography className='text-[1.5rem] font-semibold leading-[2.25rem] text-[#1a1a1a] pl-10'>
          {translate('customers.addACustomerGroup')}
        </Typography>
      </Box>
      <Box className="mx-auto w-3/5 py-10">
        <AddCustomerGroupForm />
      </Box>
    </Box>
  );
}

export default AddCustomerGroup;
