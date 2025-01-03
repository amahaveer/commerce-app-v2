import AppDrawer from '@/components/atoms/AppDrawer';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import CustomButton from '@/components/atoms/Button';
import { Undo2 } from 'lucide-react';
import DataTable from '@/components/atoms/DataTable';
import {
  manageStoreFrontColumns,
  manageStoreFrontRows,
  productDetailsRows,
  productDetailsTableColumns
} from './column';
import useTranslate from 'hooks/useTranslate';

const ManageStorefrontOrder = () => {
  const router = useRouter();
  const { translate } = useTranslate();

  return (
    <Box className="mt-4">
      <Box className=" border-b-2 pb-6">
        <Typography className="font-medium text-2xl">
          {translate('categories.categoryEditManageStoreFrontOrder')}
        </Typography>
        <Box className="flex justify-between  mt-3">
          <Typography className="text-[#545978] text-lg">
            {translate('categories.categoryEditManageStoreFrontOrderDesc')}
          </Typography>
          <Box className="flex gap-2 ">
            <CustomButton
              title={translate(
                'categories.categoryEditManageStoreFrontOrderRevertButton'
              )}
              disabled
              icon={<Undo2 />}
              className="w-[10.5rem] h-[2.5rem]"
            />
            <CustomButton
              title={translate(
                'categories.categoryEditManageStoreFrontOrderSaveButton'
              )}
              disabled
              className="w-[4rem] h-[2.5rem]"
            />
          </Box>
        </Box>
      </Box>
      <Box className="mx-10">
        <Box className="flex gap-3 items-baseline my-5 ">
          <Typography className="font-medium text-xl">
            {translate('categories.categoryEditManageStoreFrontOrderProducts')}
          </Typography>
          <Typography className="text-[#545978]"> 10 / 10 results</Typography>
        </Box>
        <DataTable
          columns={manageStoreFrontColumns}
          rows={manageStoreFrontRows}
        />
      </Box>
    </Box>
  );
};

export default ManageStorefrontOrder;
