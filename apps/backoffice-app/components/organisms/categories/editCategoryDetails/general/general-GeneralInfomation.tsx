import { useCategories } from 'context/categories';
import useTranslate from 'hooks/useTranslate';
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {
  categoryGeneralInformationSchema,
  companyInfoSchema,
} from '../../addCategory/categoryInformation/schema';
import { useForm } from 'react-hook-form';
import AccordianUnControlled from '@/components/atoms/Accordian';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import IconTextLink from '@/components/atoms/IconTextLink';
import { ManageSearchOutlined } from '@mui/icons-material';
import { formatDateTime } from 'utils';
import { TranslationKeys } from 'types/global';
import CustomButton from '@/components/atoms/Button';
import SelectDropdown from '@/components/atoms/SelectDropdown';

const GeneralInfomation = () => {
  const { translate } = useTranslate();

  const { mappedCategoryData, onToolbarAction } = useCategories();
  const categoryGeneralInformationForm =
    categoryGeneralInformationSchema(translate);
  const companyInfoForm = companyInfoSchema(translate);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    unregister,
  } = useForm({
    defaultValues: mappedCategoryData.generalInfo || {},
  });

  const displayText = (label: TranslationKeys, value: string) => {
    return (
      <Box className="flex flex-row">
        <Typography className="font-normal w-28 text-[0.875rem] text-customGray ">
          {translate(label)}
        </Typography>
        <Typography className="font-normal text-[0.875rem] text-customGray ">
          {value}
        </Typography>
      </Box>
    );
  };

  const getDropDown = (): React.ReactNode => {
    return (
      <Box className="flex justify-between items-center ">
        <SelectDropdown
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          placeholder={'Select...'}
          className="w-[15.125rem]"
        />
      </Box>
    );
  };

  return (
    <Box className="flex flex-row mt-10">
      <Box>
        <Box className="flex">
          <AccordianUnControlled
            className="border-0"
            labelClass="text-[1.25rem]"
            title={'categories.generalInformation'}
          >
            <Box className="flex flex-col px-4">
              <Box className="flex flex-col pl-4 mt-6 space-y-6" gap={2}>
                <CustomFieldMapper
                  formFields={categoryGeneralInformationForm}
                  formData={mappedCategoryData.generalInfo || {}}
                  register={register}
                  errors={errors}
                />
              </Box>
            </Box>
          </AccordianUnControlled>
          <Box className="pl-16">
            <Box className="flex flex-col">
              {displayText(
                'common.dateCreated',
                formatDateTime('mappedCategoryData'),
              )}
              {displayText(
                'common.dateModified',
                formatDateTime('mappedCategoryData'),
              )}

              <IconTextLink
                wrapperClass="mt-2"
                textClass="text-[0.875rem]"
                text={translate('common.openChangeHistory')}
                icon={<ManageSearchOutlined />}
              />
              <CustomButton
                type="button"
                className="bg-white normal-case mt-5"
                title="Move Category"
              />
            </Box>
          </Box>
        </Box>

        <AccordianUnControlled
          className="border-0 mt-6 w-[50.688rem]"
          labelClass="text-[1.25rem]"
          title={'categories.categorygeneralInformationCustomFields'}
          inLineNode={getDropDown()}
        >
          <Box className="flex flex-col px-4">
            <Box className="flex flex-col pl-8" gap={2}>
              <Typography>
                {translate(
                  'categories.categorygeneralInformationNoCustomFields',
                )}
              </Typography>
            </Box>
          </Box>
        </AccordianUnControlled>
        <SaveToolbar
          isVisible={true}
          showNext
          onClickAction={onToolbarAction}
        />
      </Box>
    </Box>
  );
};

export default GeneralInfomation;
