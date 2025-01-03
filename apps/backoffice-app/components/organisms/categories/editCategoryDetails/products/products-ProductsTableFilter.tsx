import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import CustomButton from '@/components/atoms/Button';
import HeightSharpIcon from '@mui/icons-material/HeightSharp';
import SearchBar from '@/components/atoms/SearchBar';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { size } from 'lodash';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import DataTable from '@/components/atoms/DataTable';
import { productDetailsRows, productDetailsTableColumns } from './column';
import AppDrawer from '@/components/atoms/AppDrawer';
import { useRouter } from 'next/navigation';
import ManageStorefrontOrder from './products-ManageStoreFrontOrder';

const ProductsTableFilter = () => {
  const [checked, setChecked] = useState(false);
  const { translate } = useTranslate();
  const [managaeStoreFront, setManagaeStoreFront] = useState(false);
  const router = useRouter();

  const handleChange = (event: { target: { checked: any } }) => {
    setChecked(event.target.checked);
  };
  return (
    <Box>
      <Box className="flex gap-3 items-baseline">
        <Typography className="font-medium text-xl">
          {translate('categories.categoryEditManageStoreFrontOrderProducts')}
        </Typography>
        <Typography className="text-[#545978]"> 10 results</Typography>
      </Box>
      <Box className="flex justify-between mt-3">
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              color="primary"
            />
          }
          // label={translate('categories.categorygeneralInformationNoCustomFields')}
          label={translate('categories.categoryEditProductsTableCheckBox')}
        />
        <CustomButton
          title={translate('categories.categoryEditManageStoreFrontOrder')}
          onClick={() => setManagaeStoreFront(!managaeStoreFront)}
          className="h-[2.5rem] w-[14.316rem]"
          icon={<HeightSharpIcon />}
        />
      </Box>
      <AppDrawer
        open={managaeStoreFront}
        onClose={() => setManagaeStoreFront(!managaeStoreFront)}
        breadcrumb={[' Go back', 'Manage storefront order']}
      >
        <ManageStorefrontOrder />
      </AppDrawer>
      <Box className="w-[84.25] h-[13.063rem] shadow-summaryCard border border-gray-300 my-6 p-4">
        <Box className="flex gap-5 items-center  border-b-2 pb-7 pt-4 mx-6">
          <Typography>Search</Typography>
          <SearchBar
            className="w-[46.375rem]  h-[2.5rem] rounded-sm"
            placeholder={'Search'}
            onClickSearch={() => {}}
          />

          <IconButton
            className="text-[#DA5A4E] text-sm font-medium"
            aria-label="Info"
          >
            <ClearIcon sx={{ fontSize: 18, fontWeight: 'bold' }} />
            <Typography className="font-medium">Clear all</Typography>
          </IconButton>
        </Box>

        <Box className="flex gap-5 items-center mx-6 pt-7">
          <Typography>Filters</Typography>
          <SelectDropdown
            options={[]}
            placeholder="Product Type"
            className="w-[15.125rem] h-[2.5rem]"
          />
          <SelectDropdown
            options={[]}
            placeholder="Status"
            className="w-[15.125rem] h-[2.5rem]"
          />
        </Box>
      </Box>
      <DataTable
        columns={productDetailsTableColumns}
        rows={productDetailsRows}
      />
    </Box>
  );
};

export default ProductsTableFilter;
