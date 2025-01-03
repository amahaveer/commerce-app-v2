import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { ISearchBarProps } from './type';

const SearchBar = (props: ISearchBarProps) => {

  const { className, inputClass, disabled, placeholder, fullWidth, inputForm, mode="search",  onClickSearch } = props;
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <TextField
      type={mode}
      fullWidth={fullWidth}
      className={`m-0  ${className}`}
      disabled={disabled}
      size="small"
      {...(!inputForm && {
        value: searchText,
        onChange: (e) => setSearchText(e.target.value),
      })}
      {...inputForm}
      placeholder={placeholder}
      InputProps={{
        classes: {
          root: inputClass,
        },
        startAdornment: (
          mode === "search" && <InputAdornment position="start">
            <IconButton className="text-customGray p-0" onClick={() => onClickSearch(searchText)}>
              <SearchIcon className="hover:text-primary-common" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: searchText && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear}>
              <CancelIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
