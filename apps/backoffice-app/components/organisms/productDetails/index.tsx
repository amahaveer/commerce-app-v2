'use client';

import { Box, Typography, IconButton } from '@mui/material';
import TabsComponent from '@/components/atoms/tabs';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import useTranslate from 'hooks/useTranslate';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import IconTextLink from '@/components/atoms/IconTextLink';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useProducts } from 'context/product';
import { getPublishStatusOptions } from 'utils';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useLanguage } from 'context/language.context';
import { tabConfigurations } from './tabConfig';
import { usePermissions } from 'context/permissions.context';

const ProductDetailsComponent = () => {

  const { translate } = useTranslate();
  const { hasPermission } = usePermissions();
  const { locale } = useLanguage();
  const { mappedProductData } = useProducts();
  const publishStatusOptions = getPublishStatusOptions();

  const tabsData = tabConfigurations
    .filter(tab => !tab.permission || hasPermission(tab.permission))
    .map(tab => ({
      label: translate(tab.label), // Assuming translate is used for labels
      path: tab.path,
      content: <tab.component />,
    }));

  const getTabsChildren = (): React.ReactNode => {
    return (
      <Box className="ml-auto pr-4 flex flex-row pb-2">
        <SelectDropdown
          className='w-[8.345rem] h-[2.5rem]'
          options={publishStatusOptions}
          defaultValue={publishStatusOptions[0].value}
          chipMode={true}
        />
        <Box className="border-l ml-2">
          <IconButton>
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>

      </Box>
    )
  }

  return (
    <Box className="flex flex-col pt-4">
      <IconTextLink
        wrapperClass='text-customBlue-periwinkle pl-10'
        textClass='text-[0.875rem]'
        text={translate("product.toProductList")}
        icon={<ListOutlinedIcon className='w-[1rem] h-[1rem]' />}
      />
      <Box className="flex flex-row px-10 items-center mt-2">
        <Box>
          <Typography className="text-2xl mb-2 mt-2 font-medium">
            {mappedProductData.generalInfo?.productName?.[locale]}
          </Typography>
        </Box>
        <Box className="ml-auto">
          <SelectDropdown
            options={[]}
            className='w-[21.375rem]'
            placeholder={translate("product.selectStore")}
            prefixIcon={<BusinessOutlinedIcon className='text-customGray mr-2' />}
            placeholderStyle='not-italic text-customGray'
          />
        </Box>
      </Box>

      <Box className='mt-4'>
        <TabsComponent
          tabs={tabsData}
          tabsWrapperClass='px-6'
          contentClass='h-[65vh] overflow-y-auto'
          tabsChildren={getTabsChildren()}
        />
      </Box>
    </Box>
  );
};

export default ProductDetailsComponent;
