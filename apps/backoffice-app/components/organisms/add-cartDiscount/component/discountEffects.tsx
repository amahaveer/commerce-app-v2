import AccordianUnControlled from '@/components/atoms/Accordian';
import { Box, ButtonBase, Typography } from '@mui/material';
import React, { useState } from 'react';
import useTranslate from 'hooks/useTranslate';
import DiscountItem from './discountItem';
import DiscountShipping from './discountShipping';
import DiscountTotal from './discountTotal';
import DiscountMultibuy from './discountMultibuy';
import { CartLogo } from '@/components/cartIcon';
import { ItemDiscount } from '@/components/itemlogo';
import { MultibuyIcon } from '@/components/multibuyIcon';
import { ShippingInfo } from '@/components/shippingIcon';

const DiscountEffects = () => {
  const { translate } = useTranslate();
  const [selectedType, setSelectedType] = useState<
    'totalPrice' | 'itemDiscount' | 'multibuy' | 'shipping'
  >('totalPrice');

  const onClickCartLogo = (
    type: 'totalPrice' | 'itemDiscount' | 'multibuy' | 'shipping'
  ) => {
    setSelectedType(type);
  };

  return (
    <Box>
      <AccordianUnControlled
        title="common.discountEffect"
        className="border-0"
        labelClass="text-[1rem]"
      >
        <Box className="flex flex-row mt-4 pl-8 my-7" gap={2}>
          <Box
            className={`shadow-summaryCard border border-gray-300 w-40 h-40 flex flex-col items-center justify-center 
              ${selectedType === 'totalPrice' ? 'active-class' : ''}`}
            onClick={() => onClickCartLogo('totalPrice')}
          >
            <CartLogo width="125" height="125" />
            <Typography className="text-center">
              {translate('common.total')}
            </Typography>
          </Box>
          <Box
            className={`shadow-summaryCard border border-gray-300 w-40 h-40 flex flex-col items-center justify-center 
              ${selectedType === 'itemDiscount' ? 'active-class' : ''}`}
            onClick={() => onClickCartLogo('itemDiscount')}
          >
            <ItemDiscount width="125" height="125" />
            <Typography className="text-center">
              {translate('common.item')}
            </Typography>
          </Box>
          <Box
            className={`shadow-summaryCard border border-gray-300 w-40 h-40 flex flex-col items-center justify-center 
              ${selectedType === 'multibuy' ? 'active-class' : ''}`}
            onClick={() => onClickCartLogo('multibuy')}
          >
            <MultibuyIcon width="125" height="125" />
            <Typography className="text-center">
              {translate('common.multibuy')}
            </Typography>
          </Box>
          <Box
            className={`shadow-summaryCard border border-gray-300 w-40 h-40 flex flex-col items-center justify-center 
              ${selectedType === 'shipping' ? 'active-class' : ''}`}
            onClick={() => onClickCartLogo('shipping')}
          >
            <ShippingInfo width="125" height="125" />
            <Typography className="text-center">
              {translate('common.shipping')}
            </Typography>
          </Box>
        </Box>
        {selectedType === 'totalPrice' && <DiscountTotal />}
        {selectedType === 'itemDiscount' && <DiscountItem />}
        {selectedType === 'multibuy' && <DiscountMultibuy />}
        {selectedType === 'shipping' && <DiscountShipping />}
      </AccordianUnControlled>
    </Box>
  );
};

export default DiscountEffects;
