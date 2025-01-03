import { Box, Typography } from '@mui/material';
import React from 'react';
import DiscountType from './discountType';
import useTranslate from 'hooks/useTranslate';
import EligibilityCriteria from './eligibilityCriteria';

const DiscountItem = () => {
  const { translate } = useTranslate();
  return (
    <Box>
      <Box className="flex flex-col gap-3 ml-3">
        <Typography>{translate('common.lineItemInfo')}</Typography>
        <Typography>{translate('common.targetCustom')}</Typography>
      </Box>
      <EligibilityCriteria />
      <DiscountType />
    </Box>
  );
};

export default DiscountItem;
