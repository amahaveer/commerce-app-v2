'use client';

import DataTable from '@/components/atoms/DataTable';
import { Box, Typography } from '@mui/material';
import { getProductTypeColumns } from './column';
import { useEffect, useState } from 'react';
import { getProductTypes } from 'app/api/productType.api';
import { useProducts } from 'context/product';
import SearchBar from '@/components/atoms/SearchBar';
import useTranslate from 'hooks/useTranslate';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { useStepper } from 'context/stepper';

const AddProductType = () => {
  const { translate } = useTranslate();
  const { activeStep, stepList } = useStepper();
  const { mappedProductData, setMappedProductData, onClickToolbarAction } =
    useProducts();
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const data = await getProductTypes();
      setProductTypes(data);
    } catch (error) {
      return;
    }
  };

  const onSelectProductType = (id: string) => {
    setMappedProductData((prevState) => ({
      ...prevState,
      selectedProductType: id
    }));
  };

  const colParams = {
    onSelectProductType,
    selectedType: mappedProductData.selectedProductType
  };
  const productTypeColumns = getProductTypeColumns(colParams);

  return (
    <Box className="p-10">
      <Box className="flex items-center">
        <Typography className="text-[1rem] font-semibold leading-[1.3rem] text-[#1a1a1a]">
          {translate('product.selectProductType')}
        </Typography>
        <Box className="font-inter text-customGray ml-4 mt-1">
          {`${productTypes.length} ${translate('common.results')}`}
        </Box>
      </Box>
      <Box className="mt-4">
        <SearchBar
          className="w-[46.375rem]"
          placeholder={translate('common.searchByName')}
          onClickSearch={() => {}}
        />
      </Box>
      <Box className="mt-4">
        <DataTable
          rows={productTypes}
          columns={productTypeColumns}
          sx={{ border: 0, textAlign: 'center' }}
          disableRowSelectionOnClick
        />
      </Box>

      {mappedProductData.selectedProductType && (
        <SaveToolbar
          onClickAction={onClickToolbarAction}
          isVisible={!!mappedProductData.selectedProductType}
          showNext={activeStep !== stepList.length - 1}
          showBack={activeStep > 0}
          showSave={activeStep === stepList.length - 1}
        />
      )}
    </Box>
  );
};

export default AddProductType;
