import { Box, FormControlLabel, Radio, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomFieldMapper from '../../customFieldMapper';
import useTranslate from 'hooks/useTranslate';
import {
  amountOffSchema,
  fixedPriceSchema,
  percentageOffSchema
} from '../schema';

const DiscountType = () => {
  const { translate } = useTranslate();
  const [selectedDiscountType, setSelectedDiscountType] = useState<
    'percentageOff' | 'amountOff' | 'fixedPrice'
  >('percentageOff');
  const percentageOffForm = percentageOffSchema(translate);
  const amountOffForm = amountOffSchema(translate);
  const fixedPriceForm = fixedPriceSchema(translate);

  const handleDiscountType = (
    type: 'percentageOff' | 'amountOff' | 'fixedPrice'
  ) => {
    setSelectedDiscountType(type);
  };

  return (
    <Box className="mt-5 mb-3">
      <Typography className="font-medium">
        {translate('common.discountType')}
      </Typography>
      <Box className="flex">
        <FormControlLabel
          control={
            <Radio
              checked={selectedDiscountType === 'percentageOff'}
              onChange={() => handleDiscountType('percentageOff')}
              color="primary"
            />
          }
          label={translate('common.percentageOff')}
        />
        <FormControlLabel
          control={
            <Radio
              checked={selectedDiscountType === 'amountOff'}
              onChange={() => handleDiscountType('amountOff')}
              color="primary"
            />
          }
          label={translate('common.amountOff')}
        />
        <FormControlLabel
          control={
            <Radio
              checked={selectedDiscountType === 'fixedPrice'}
              onChange={() => handleDiscountType('fixedPrice')}
              color="primary"
            />
          }
          label={translate('common.fixedPrice')}
        />
      </Box>
      {selectedDiscountType === 'percentageOff' && (
        <CustomFieldMapper formData={{}} formFields={percentageOffForm} />
      )}
      {selectedDiscountType === 'amountOff' && (
        <CustomFieldMapper formData={{}} formFields={amountOffForm} />
      )}
      {selectedDiscountType === 'fixedPrice' && (
        <CustomFieldMapper formData={{}} formFields={fixedPriceForm} />
      )}
    </Box>
  );
};

export default DiscountType;
