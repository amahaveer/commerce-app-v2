'use client';

import DataTable from '@/components/atoms/DataTable';
import { Box, IconButton, Typography } from '@mui/material';
import CustomButton from '@/components/atoms/Button';
import { variantInventoryColumns } from './column';
import { InfoOutlined } from '@mui/icons-material';
import useTranslate from 'hooks/useTranslate';
import { useEffect, useState } from 'react';
import AppDrawer from '@/components/atoms/AppDrawer';
import ManageVariantInventory from './manageInventory';
import { getInventoryByQuery } from 'app/api/inventory.api';
import { useProducts } from 'context/product';
import { useLanguage } from 'context/language.context';
import { IVariant } from 'types/product.type';
import { getProductInventory } from 'app/api/product.api';

interface IPropsType {
  variantId?: any;
}

interface Variant {
  items: any[]; // Define the type of items based on your needs (e.g., `InventoryItem[]`)
}

const VariantInventory = (props: IPropsType) => {
  const { variantId } = props;
  const { translate } = useTranslate();
  const { locale } = useLanguage();
  const {
    mappedProductData: { variants }
  } = useProducts();
  const [openManageInventoryDrawer, setOpenManageInventoryDrawer] =
    useState(false);

  const [inventories, setInventories] = useState([]);
  const [initialInventoryData, setInitialInventoryData] = useState<any>(null);
  const [productInventory, setProductInventory] = useState<any>([]);

  const fetchInventories = async () => {
    const inventory = (await getProductInventory(variantId)) || {};
    setProductInventory(inventory?.results);
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  const onClickRow = ({ row }: any) => {
    setInitialInventoryData(row);
    setOpenManageInventoryDrawer(true);
  };

  return (
    <Box className="flex flex-col px-4 pt-10">
      <Box className="flex flex-row items-center">
        <Box className="flex w-[47rem]">
          <IconButton className="text-customBlue-sky" aria-label="Info">
            <InfoOutlined />
          </IconButton>
          <Typography>
            {translate('product.manageAddInventoryForVariantAndSku')}
          </Typography>
        </Box>

        <Box className="ml-auto">
          <CustomButton.Add
            title={translate('product.addInventory')}
            onClick={() => setOpenManageInventoryDrawer(true)}
          />
        </Box>
      </Box>

      <Box className="pt-10">
        <DataTable
          columns={variantInventoryColumns}
          rows={productInventory}
          getRowId={(row) => row.id}
          onRowClick={onClickRow}
        />
      </Box>

      <AppDrawer
        open={openManageInventoryDrawer}
        onClose={() => setOpenManageInventoryDrawer(false)}
      >
        <ManageVariantInventory initialInventoryData={initialInventoryData} />
      </AppDrawer>
    </Box>
  );
};

export default VariantInventory;
