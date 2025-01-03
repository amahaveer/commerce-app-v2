'use client'
import React from 'react';
import { ISelectDropdownProps } from '@/components/atoms/SelectDropdown/type';
import { useLanguage } from 'context/language.context';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import { convertLocalesListToPairs } from 'utils/languages';
import LanguageIcon  from "@mui/icons-material/Language"; 

const Language = (props: ISelectDropdownProps) => {

  const { locale, languageList, switchLanguage } = useLanguage();

  const handleChange = (value: string) => {
    switchLanguage(value)
  };

  const pairOptions = convertLocalesListToPairs(languageList)

  return (
    <SelectDropdown 
      options={pairOptions} 
      defaultValue={locale}
      onSelect={handleChange}
      prefixIcon={<LanguageIcon sx={{ marginRight: '8px' }} />}
      sx={{
        background: 'white',
        border: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid blue'
        }
      }}
    />
  )

};

export default Language;
