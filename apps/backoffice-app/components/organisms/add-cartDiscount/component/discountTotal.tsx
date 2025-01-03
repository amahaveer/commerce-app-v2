import { Box, Typography } from '@mui/material';
import React from 'react';
import useTranslate from 'hooks/useTranslate';
import DiscountType from './discountType';

const DiscountTotal = () => {
  const { translate } = useTranslate();
  return (
    <Box>
      <Typography>{translate('common.discountTotalInfo')}</Typography>
      <DiscountType />
    </Box>
  );
};

export default DiscountTotal;
