import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { categoryExternalInformationSchema } from '../../addCategory/externalInformation/schema';
import { useCategories } from 'context/categories';
import { useForm } from 'react-hook-form';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import AccordianUnControlled from '@/components/atoms/Accordian';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { TranslationKeys } from 'types/global';
import { formatDateTime } from 'utils';
import IconTextLink from '@/components/atoms/IconTextLink';
import { ManageSearchOutlined } from '@mui/icons-material';

const ExternalSearchEngine = () => {
  const { translate } = useTranslate();
  const categoryExternalInformationForm =
    categoryExternalInformationSchema(translate);

  const { mappedCategoryData, onToolbarAction } = useCategories();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    unregister
  } = useForm({
    defaultValues: mappedCategoryData.generalInfo || {}
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
  return (
    <Box>
      <Box className="flex">
        <AccordianUnControlled
          className="border-0 w-[50.688rem]"
          labelClass="text-[1.25rem]"
          title={'categories.categoryExternalInfromationAccordianName'}
        >
          <Box className="flex flex-col px-4">
            <Box
              className="flex flex-col pl-4 mt-6 space-y-6 w-[41rem]"
              gap={2}
            >
              <Typography>
                {translate('categories.categoryExternalInfromationDesc')}
              </Typography>
              <CustomFieldMapper
                formFields={categoryExternalInformationForm}
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
              formatDateTime('mappedCategoryData')
            )}
            {displayText(
              'common.dateModified',
              formatDateTime('mappedCategoryData')
            )}
          </Box>
        </Box>
      </Box>

      <SaveToolbar
        isVisible={true}
        showNext
        showBack
        onClickAction={onToolbarAction}
      />
    </Box>
  );
};

export default ExternalSearchEngine;
