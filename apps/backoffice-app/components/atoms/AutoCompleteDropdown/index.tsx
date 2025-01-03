import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress, TextField } from '@mui/material';
import { IMultiSelectProps } from './type';

const AutoCompleteDropdown = (props: IMultiSelectProps) => {

  const {  fullWidth, height, disabled, placeholder, renderOption, multiple, limitTags, labelAlias, 
    valueAlias, options, className, padding, inputValue, asyncSearch, onSelect, fetchData } = props;
  const [selectedValues, setSelectedValues] = useState(multiple ? (inputValue || []) : (inputValue || null))
  
  let debounceTimeout: NodeJS.Timeout | null = null;
  const [isLoading, setIsLoading] = useState(false);

  const label = labelAlias || "label";
  const value = valueAlias || "value";

  const handleChange = (event: any, newValue: any) => {
    setSelectedValues(newValue); 
    onSelect(newValue);
  };

  const handleInputChange = (event: any, newValue: string) => {

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      if (asyncSearch && newValue) {
        setIsLoading(true);
        fetchData && fetchData(newValue).then(() => {
          setIsLoading(false);
        });
      }
    }, 500);
  }

  return (
    <Autocomplete
      freeSolo
      className={`font-inter ${className}`}
      multiple={multiple}
      limitTags={limitTags}
      value={selectedValues}
      disabled={disabled}
      id="multiple-limit-tags" 
      options={options}
      getOptionLabel={(option) => option[label] || ""} 
      // getOptionKey={(option) => option[value]}
      isOptionEqualToValue={(option, val) => option[value] === val[value]}
      renderInput={(params) => (
        <TextField 
          {...params} 
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{                
        '& .MuiAutocomplete-inputRoot': {
          height: height,
          padding: padding
        },
      }}
      renderOption={renderOption}
      fullWidth={fullWidth}
      onInputChange={handleInputChange} 
      onChange={handleChange}
    />
  );
}

export default AutoCompleteDropdown;

