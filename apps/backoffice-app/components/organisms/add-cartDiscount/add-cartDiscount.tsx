'use client';
import React, { useState } from 'react';
import { Box, FormControlLabel, Radio, Typography } from '@mui/material';
import IconTextLink from '@/components/atoms/IconTextLink';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import useTranslate from 'hooks/useTranslate';
import AccordianUnControlled from '@/components/atoms/Accordian';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { useProducts } from 'context/product';
import CustomFieldMapper from '../customFieldMapper';
import { generaCartDiscountSchema } from './schema';
import CartCondition from './component/cartCondition';
import DiscountEffects from './component/discountEffects';

const AddCartDiscount = () => {
  const { translate } = useTranslate();
  const { onClickToolbarAction } = useProducts();
  const [isAmountOff, setIsAmountOff] = useState(false);
  const generaCartDiscountForm = generaCartDiscountSchema(translate);

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
          {/* <Box className="ml-5 text-slate-500 pb-4">
            <Typography>
              {translate('product.saveProductSelectMessage')}
            </Typography>
          </Box> */}

          <Box className="ml-8">
            <Typography className="font-medium">Cart discount type</Typography>
            <Box>
              <FormControlLabel
                control={<Radio checked={isAmountOff} color="primary" />}
                label={translate('common.amountOff')}
              />
              <FormControlLabel
                control={<Radio checked={isAmountOff} color="primary" />}
                label={translate('common.amountOff')}
              />
            </Box>
          </Box>
          <Box className="flex flex-col gap-10 pb-32">
            <AccordianUnControlled
              title="common.generalInformation"
              className="border-0"
              labelClass="text-[1.25rem]"
            >
              <Box className="flex flex-col mt-4 pl-8" gap={2}>
                <CustomFieldMapper
                  formFields={generaCartDiscountForm}
                  formData={{}}
                />
              </Box>
            </AccordianUnControlled>
            <CartCondition />
            <DiscountEffects />
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

export default AddCartDiscount;
