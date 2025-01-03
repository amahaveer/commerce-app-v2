import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AccordianUnControlled from '@/components/atoms/Accordian';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import useTranslate from 'hooks/useTranslate';
import { categoryExternalInformationSchema } from './schema';
import { useCustomers } from 'context/customers';
import { useForm } from 'react-hook-form';
import { useCategories } from 'context/categories';
import SaveToolbar from '@/components/molecules/SaveToolBar';

const ExternalInformation = () => {
  const { translate } = useTranslate();
  const categoryExternalInformationForm =
    categoryExternalInformationSchema(translate);

  const { mappedCategoryData, onToolbarAction } = useCategories();

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: mappedCategoryData.generalInfo || {}
  });
  return (
    <Box>
      <AccordianUnControlled
        className="border-0"
        labelClass="text-[1.25rem]"
        title={'categories.categoryExternalInfromationAccordianName'}
      >
        <Box className="flex flex-col px-4">
          <Box className="flex flex-col pl-4 mt-6 space-y-6 w-[41rem]" gap={2}>
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
      <SaveToolbar
        isVisible={true}
        showNext
        showBack
        onClickAction={onToolbarAction}
      />
    </Box>
  );
};

export default ExternalInformation;
