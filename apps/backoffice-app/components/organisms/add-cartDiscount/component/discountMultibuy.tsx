import { Box, Typography } from '@mui/material';
import React from 'react';
import DiscountType from './discountType';
import useTranslate from 'hooks/useTranslate';

const DiscountMultibuy = () => {
  const { translate } = useTranslate();
  return (
    <Box>
      <Typography>{translate('common.lineItemInfo')}</Typography>
      <Typography>{translate('common.targetCustom')}</Typography>
      <DiscountType />
    </Box>
  );
};

export default DiscountMultibuy;
