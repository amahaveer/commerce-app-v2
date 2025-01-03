import AccordianUnControlled from '@/components/atoms/Accordian';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { useForm } from 'react-hook-form';

import { categoryGeneralInformationSchema } from './schema';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import {
  companyInfoSchema,
  customerGeneralSchema
} from '@/components/organisms/addCustomer/general/schema';
import { useCategories } from 'context/categories';

function BasicCategoryInformation() {
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
    unregister
  } = useForm({
    defaultValues: mappedCategoryData.generalInfo || {}
  });

  return (
    <Box className="flex flex-row mt-10">
      <Box>
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
        <AccordianUnControlled
          className="border-0 mt-6"
          labelClass="text-[1.25rem]"
          title={'categories.categorygeneralInformationCustomFields'}
        >
          <Box className="flex flex-col px-4">
            <Box className="flex flex-col pl-8" gap={2}>
              <Typography>
                {translate(
                  'categories.categorygeneralInformationNoCustomFields'
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
}

export default BasicCategoryInformation;
