'use client';
import AccordianUnControlled from '@/components/atoms/Accordian';
import IconTextLink from '@/components/atoms/IconTextLink';
import { Box, Typography } from '@mui/material';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import React from 'react';
import useTranslate from 'hooks/useTranslate';
import CustomFieldMapper from '../customFieldMapper';
import { generalProductSelectSchema } from './schema';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { useProducts } from 'context/product';

const AddProductSelection = () => {
  const { translate } = useTranslate();
  const { onClickToolbarAction } = useProducts();
  const generalProductSelectForm = generalProductSelectSchema(translate);

  return (
    <Box>
      <Box className=" w-full mt-10">
        <Box className="ml-10">
          <IconTextLink
            wrapperClass="text-customBlue-periwinkle"
            textClass="text-[0.875rem]"
            text={translate('product.toProductSelection')}
            icon={<ListOutlinedIcon className="w-[1rem] h-[1rem]" />}
          />
        </Box>
        <Box className="border-b pb-6 border-gray-300  mb-2 mt-2">
          <Typography className="text-2xl ml-10 font-medium">
            {translate('product.addProductSelection')}
          </Typography>
        </Box>
      </Box>
      <Box className="flex flex-row w-full h-[75vh] overflow-y-auto ">
        <Box className="ml-14 w-3/5 mt-10">
          <Box className="ml-5 text-slate-500 pb-4">
            <Typography>
              {translate('product.saveProductSelectMessage')}
            </Typography>
          </Box>
          <Box className="flex flex-col gap-10 pb-32">
            <AccordianUnControlled
              title="common.generalInformation"
              className="border-0"
              labelClass="text-[1.25rem]"
            >
              <Box className="flex flex-col mt-4 pl-8" gap={2}>
                <CustomFieldMapper
                  formFields={generalProductSelectForm}
                  formData={{}}
                />
              </Box>
            </AccordianUnControlled>
            <AccordianUnControlled
              title="common.customFields"
              className="border-0"
              labelClass="text-[1.25rem]"
            >
              <Box className="flex flex-col mt-4 pl-8" gap={2}>
                <Typography>
                  There are no custom types defined. To extend the information,
                  create custom types through the API first.
                </Typography>
              </Box>
            </AccordianUnControlled>
          </Box>
        </Box>
      </Box>
      <SaveToolbar
        isVisible={true}
        showSave
        onClickAction={onClickToolbarAction}
      />
    </Box>
  );
};

export default AddProductSelection;
