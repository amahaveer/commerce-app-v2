'use client';
import AutoCompleteDropdown from '@/components/atoms/AutoCompleteDropdown';
import DatePickerField from '@/components/atoms/DateField';
import IconTextLink from '@/components/atoms/IconTextLink';
import PasswordInput from '@/components/atoms/PasswordInput';
import PrefixInputBase from '@/components/atoms/PrefixInputBase';
import RadioButtonsGroup from '@/components/atoms/RadioGroup';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import InputSelectorField from '@/components/molecules/InputSelectorField';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, Typography } from '@mui/material';
import { useLanguage } from 'context/language.context';
import useTranslate from 'hooks/useTranslate';
import { useState } from 'react';
import { IFormFieldMapper } from 'types/global';
import { IFormFieldMapperProps } from './type';

const CustomFieldMapper = (props: IFormFieldMapperProps) => {
  const { formFields, formData, register, errors, control, emptyMessage } =
    props;

  console.log('formDataformDataformDataformData', formData);

  const { translate } = useTranslate();
  const { languageList, locale } = useLanguage();
  const [showAllLanguages, setShowAllLanguages] = useState<{
    [key: string]: boolean;
  }>({});

  if (!formFields?.length && emptyMessage) {
    return (
      <Typography className="text-[#1a1a1a] text-[1rem] font-normal">
        {emptyMessage}
      </Typography>
    );
  }

  if (!formFields || !formFields.length) return;

  const errorBorderStyle = (field: string) => {
    if (errors && errors[field]) {
      return 'border border-red-600';
    }
  };

  const toggleLanguageVisibility = (field: string) => {
    setShowAllLanguages((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  return formFields.map((item: IFormFieldMapper, index: number) => (
    <Box
      key={index}
      className={`flex flex-col  ${item.wrapperClass}`}
      gap={0.5}
    >
      <Typography className="text-sm font-medium capitalize">
        {item.title}
        {item.required && <span className="text-red-600"> *</span>}
      </Typography>

      {item.description && (
        <Typography className="text-sm text-customGray font-medium ">
          {item.description.text}
        </Typography>
      )}

      {item.info && (
        <Box className="flex items-center mt-1">
          <WarningAmberOutlinedIcon className="text-orange-500 mr-1 text-[16px]" />
          <Typography className="text-[0.875rem] font-normal text-[#1a1a1a]">
            {item.info}
          </Typography>
        </Box>
      )}

      {item.type === 'text' && !item.multiLocale && (
        <PrefixInputBase
          disabled={item.disabled}
          value={formData[item.field]}
          error={errors && !!errors[item.field]}
          // wrapperClass={`${errorBorderStyle(item.field)}`}
          prefix={item.prefix}
          placeholder={item.placeholder?.text}
          inputProps={
            register && { ...register(item.field, { required: item.required }) }
          }
        />
      )}

      {item.type === 'text' &&
        item.multiLocale &&
        languageList.map((language, langIndex) => {
          const showLanguageField =
            langIndex === 0 || showAllLanguages[item.field];
          const fieldName = showAllLanguages[item.field]
            ? `${item.field}.${language}`
            : `${item.field}.${locale}`;
          const mappedPrefix = showAllLanguages[item.field] ? language : locale;
          if (showLanguageField) {
            return (
              <PrefixInputBase
                disabled={item.disabled}
                key={langIndex}
                value={formData[fieldName]}
                error={errors && !!errors[item.field]}
                prefix={mappedPrefix}
                placeholder={item.placeholder?.text}
                inputProps={
                  register && {
                    ...register(fieldName, { required: item.required })
                  }
                }
              />
            );
          }
        })}

      {item.type === 'password' && (
        <PasswordInput
          disabled={item.disabled}
          value={formData[item.field]}
          error={errors && !!errors[item.field]}
          // wrapperClass={`${errorBorderStyle(item.field)}`}
          prefix={item.prefix}
          placeholder={item.placeholder?.text}
          inputProps={
            register && { ...register(item.field, { required: item.required }) }
          }
        />
      )}

      {item.type === 'number' && (
        <PrefixInputBase
          value={formData[item.field]}
          type="number"
          prefix={item.prefix}
          error={errors && !!errors[item.field]}
          placeholder={item.placeholder?.text}
          inputProps={
            register && { ...register(item.field, { required: item.required }) }
          }
        />
      )}

      {item.type === 'select' && (
        <SelectDropdown
          fullWidth
          options={item.options || []}
          defaultValue={formData[item.field]}
          onSelect={(value) =>
            item.onChange && item.onChange(value, item.field)
          }
          placeholder={item.placeholder?.text}
          placeholderStyle={item.placeholder?.className}
          disabled={item.disabled}
          inputForm={
            register && { ...register(item.field, { required: item.required }) }
          }
        />
      )}

      {item.type === 'auto_complete' && (
        <AutoCompleteDropdown
          fullWidth
          onSelect={() => {}}
          options={item.options || []}
          className=""
          height="2.5rem"
          placeholder={item.placeholder?.text}
          inputForm={
            register && { ...register(item.field, { required: item.required }) }
          }
        />
      )}

      {item.type === 'currency_selector' && (
        <InputSelectorField.Currency
          placeholder={item.placeholder?.text}
          onClickSearch={() => {}}
          wrapperClass={`${errorBorderStyle(item.field)}`}
          className={item.className}
          mode={item.selector?.mode}
          selector={{
            className: item.selector?.className,
            register: register && {
              ...register('currencyCode', { required: item.required })
            },
            options: []
          }}
          formRegister={
            register && { ...register(item.field, { required: item.required }) }
          }
        />
      )}

      {item.type === 'date_picker' && (
        <DatePickerField
          formRegister={register}
          control={control}
          fieldName={item.field}
        />
      )}

      {item.type === 'radio' && (
        <RadioButtonsGroup
          options={item.options || []}
          labelClass={item.className}
          wrapperClass={item.wrapperClass}
        />
      )}

      {errors && errors[item.field] && (
        <Box className="">
          <Typography className="text-red-600 text-sm">
            {translate('common.fieldIsRequired')}
          </Typography>
        </Box>
      )}

      {item.multiLocale && (
        <IconTextLink.Language
          wrapperClass="mt-2"
          textClass="text-sm"
          onClick={() => toggleLanguageVisibility(item.field)}
          text={
            showAllLanguages[item.field]
              ? `${translate('common.hideLanguages')} (${languageList.length})`
              : `${translate('common.showAllLanguage')} (${languageList.length})`
          }
        />
      )}
    </Box>
  ));
};

export default CustomFieldMapper;
