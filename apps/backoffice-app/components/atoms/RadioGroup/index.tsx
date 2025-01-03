'use client';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { IRadioGroupProps } from './type';
import { Box, Typography } from '@mui/material';

export default function RadioButtonsGroup(props: IRadioGroupProps) {
  const { options, labelClass, title, row, wrapperClass, value, onSelect } =
    props;

  const onChangeValue = (e: any) => {
    onSelect && onSelect(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel
        className="text-commerceBlack"
        id="row-radio-buttons-group-label"
      >
        {title}
      </FormLabel>
      <RadioGroup
        row={row}
        value={value}
        aria-labelledby="row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChangeValue}
        className={wrapperClass}
      >
        {options.map((item: any, index: number) => (
          <FormControlLabel
            key={index}
            value={item.value || item}
            control={
              <Radio
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: '18px'
                  }
                }}
              />
            }
            label={
              <Box className="flex flex-row gap-2 h-">
                <Typography
                  className={`${labelClass} ${item.className} whitespace-nowrap`}
                >
                  {item.label || item}
                </Typography>
                {item.description && (
                  <Typography className="text-[0.875rem] text-commerceBlack mt-[2px]">
                    {item.description}
                  </Typography>
                )}
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
