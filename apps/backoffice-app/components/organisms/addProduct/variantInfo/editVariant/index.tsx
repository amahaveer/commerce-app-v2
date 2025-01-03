import { Box, Typography } from '@mui/material';
import TabsComponent from '@/components/atoms/tabs';
import useTranslate from 'hooks/useTranslate';
import GeneralAndAttributes from './generalAndAttributes';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import VariantPrices from './price';
import VariantInventory from './inventory';
import VariantImages from './images/index';
import { useProducts } from 'context/product';
import { eProductPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/productPermissions.type";
import { getProductInventory } from 'app/api/product.api';
import { useEffect, useState } from 'react';

interface IPropsType {
  variantId: number;
  closeDrawer: () => void;
}

const EditVariantComponent = (props: IPropsType) => {
  const { variantId, closeDrawer } = props;
  const [productInventory, setProductInventory] = useState<any>([]);
  const { translate } = useTranslate();
  const {
    mappedProductData: { masterVariant, variants },
    isEditMode
  } = useProducts();

  const getSelectedVariant = () => {
    if (variantId === 1) return masterVariant;
    return variants.find((item) => item.id === variantId);
  };

  const selectedVariant: any = getSelectedVariant() || {};

  const tabProps = {
    selectedVariant,
    closeDrawer
  };
  const tabsData = [
    {
      label: translate('product.genetalAndAttributes'),
      content: <GeneralAndAttributes {...tabProps} />,
      permission: eProductPermissions.VIEW_VARIANT_ATTRIBUTES
    }
  ];
  if (isEditMode) {
    tabsData.push(
      {
        label: translate('common.images'),
        content: <VariantImages {...tabProps} />,
        permission: eProductPermissions.VIEW_VARIANT_IMAGES
      },
      {
        label: translate('common.prices'),
        content: <VariantPrices variantId={variantId} />,
        permission: eProductPermissions.VIEW_VARiANT_PRICES
      },
      {
        label: translate('common.Inventory'),
        content: <VariantInventory variantId={selectedVariant?.sku} />,
        permission: eProductPermissions.VIEW_VARIANT_INVENTORIES
      }
    );
  }

  return (
    <Box className="mt-2 flex flex-col">
      <Box className="flex flex-row pr-10 pl-5 items-center">
        <Box className="text-base text-commerceBlack  flex gap-2">
          <Typography className="font-medium">
            {translate('common.sku')}: {selectedVariant?.sku || '--'}
          </Typography>
          <Typography className="font-medium">
            {translate('common.key')}: {selectedVariant?.key || '--'}
          </Typography>
          <Typography className="font-medium">
            {translate('common.id')}: {selectedVariant?.id || '--'}
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

      <Box className="mt-8">
        <TabsComponent
          tabs={tabsData}
          tabsWrapperClass="px-6"
          contentClass="h-[65vh] overflow-y-auto"
        />
      </Box>
    </Box>
  );
};

export default EditVariantComponent;
