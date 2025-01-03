import React, { useState } from 'react';
import { FormControl, Box, Select, MenuItem, Chip, SelectChangeEvent } from '@mui/material';
import { ISelectDropdownProps } from './type';

const SelectDropdown = (props: ISelectDropdownProps) => {

  const { className, prefixIcon, options, placeholder, fullWidth, labelAlias, valueAlias, 
    defaultValue, multiple, onSelect, placeholderStyle, chipMode, disabled, inputForm
  } = props;
  const LABEL = labelAlias || "label";
  const VALUE = valueAlias || "value";

  const initSelectedValue = multiple ? [] : "";
  const [selectedValue, setSelectedValue] = useState<any>(defaultValue || initSelectedValue);

  const handleChange = (e:  SelectChangeEvent<any>) => {
    // setSelectedValue(e.target.value);
    onSelect && onSelect(e.target.value);
    // if (inputForm?.onChange) inputForm.onChange(e.target.value);
  };

  const getChip = (selectedOption: any) => {
      return (
        <Chip
          className={`font-inter p-0 m-0 rounded-[0.5rem] w-full `}
          label={selectedOption[LABEL]}
          sx={{ color: selectedOption.color, background: selectedOption.bgColor }}
        />
      )
  }

  return (
    <FormControl fullWidth={fullWidth} variant="outlined" size='small'>
      <Select
        className={`font-inter ${className}`}
        {...(!inputForm && {
          value: defaultValue,
          onChange: handleChange,
        })}
        displayEmpty
        multiple={multiple}
        disabled={disabled}
        // readOnly={true}
        sx={{ background: "white", ...props.sx }}
        {...inputForm}
        renderValue={(selected: any) => {
          if (!selected || (multiple && selected.length === 0)) return (
            <Box display="flex" alignItems="center">
              {prefixIcon}
              <em className={`text-customGray-placeholder ${placeholderStyle}`}>{placeholder || ""}</em>
            </Box>
          );

          // If multi dropdown
          if (multiple) {
            const selectedLabels = selected.map((value: any) => {
              const selectedOption = options.find(option => option.value === value);
              return selectedOption ? selectedOption.label : value;
            });
            return selectedLabels.join(', ');
          }
          // if single dropdown
          const selectedOption = options.find(option => option.value === selected);
          return (
            <Box display="flex" alignItems="center">
              {prefixIcon}
              {chipMode ? 
                getChip(selectedOption) : 
                selectedOption ? selectedOption[LABEL] : selected || ""
              }
            </Box>
          );
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option?.[VALUE]}>{option?.[LABEL]}</MenuItem>
        ))}

      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
