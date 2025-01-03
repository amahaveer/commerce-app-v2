import React, { useState } from 'react';
import { Box, FormControlLabel, Radio, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import {
  getEligibilityConditionOptions,
  getEligibilityCriteriaOptions
} from 'utils/discount';

const EligibilityCriteria = () => {
  const { translate } = useTranslate();
  const specificCartOptions = getEligibilityCriteriaOptions(translate);
  const conditionOptions = getEligibilityConditionOptions(translate);
  const [isSpecificCart, setIsSpecificCart] = useState(false);
  const [isAllCart, setIsAllCart] = useState(true);
  const handleCartType = (type: any) => {
    setIsSpecificCart(type === 'specificCart');
    setIsAllCart(type === 'allCart');
  };
  const [selectedValue, setSelectedValue] = useState('option1');
  const [conditionValue, setConditionValue] = useState('option1');

  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
  };
  const handleConditionChange = (value: any) => {
    setConditionValue(value);
  };

  return (
    <Box>
      <Box className="flex mt-5 ml-3 ">
        <FormControlLabel
          control={
            <Radio
              checked={isSpecificCart}
              onChange={() => handleCartType('specificCart')}
              color="primary"
            />
          }
          label={translate('common.applySpecific')}
        />
        <FormControlLabel
          control={
            <Radio
              checked={isAllCart}
              onChange={() => handleCartType('allCart')}
              color="primary"
            />
          }
          label={translate('common.applyAll')}
        />
      </Box>
      {isSpecificCart && (
        <Box>
          <Box className="flex gap-2 items-baseline">
            <Typography>{translate('common.where')}</Typography>
            <SelectDropdown
              onSelect={handleSelectChange}
              defaultValue={selectedValue}
              className="font-semibold"
              options={specificCartOptions}
            />
          </Box>
          <SelectDropdown
            onSelect={handleConditionChange}
            defaultValue={conditionValue}
            options={conditionOptions}
          />
        </Box>
      )}
    </Box>
  );
};

export default EligibilityCriteria;
