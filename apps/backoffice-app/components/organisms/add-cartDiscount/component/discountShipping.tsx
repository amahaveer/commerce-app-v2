import { Box, Typography } from '@mui/material';
import React from 'react';
import useTranslate from 'hooks/useTranslate';
import DiscountType from './discountType';

const DiscountShipping = () => {
  const { translate } = useTranslate();
  return (
    <Box>
      <Typography>{translate('common.shippingInfo')}</Typography>
      <DiscountType />
    </Box>
  );
};

export default DiscountShipping;
