import AccordianUnControlled from '@/components/atoms/Accordian';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { Box } from '@mui/material';
import { useCustomers } from 'context/customers';
import useTranslate from 'hooks/useTranslate';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomFieldMapper from '../../customFieldMapper';
import { companyInfoSchema, customerGeneralSchema } from './schema';

interface IGeneralProps {
  customerDetail?: any;
}

function CustomerGeneral(props: IGeneralProps) {
  const { customerDetail } = props;
  const { translate } = useTranslate();
  const { mappedCustomerData, onToolbarAction } = useCustomers();
  const customerInfoGeneralForm = customerGeneralSchema(translate);
  const companyInfoForm = companyInfoSchema(translate);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    unregister
  } = useForm({
    defaultValues: mappedCustomerData.generalInfo || {}
  });

  useEffect(() => {
    if (mappedCustomerData.generalInfo) {
      reset(mappedCustomerData.generalInfo);
    }
  }, [mappedCustomerData.generalInfo, reset]);

  return (
    <Box className="flex flex-row mt-10">
      <Box className="">
        <AccordianUnControlled
          className="border-0"
          labelClass="text-[1.25rem]"
          title={'categories.generalInformation'}
        >
          <Box className="flex flex-col px-4">
            <Box className="flex flex-col pl-4 mt-6 space-y-6" gap={2}>
              <CustomFieldMapper
                formFields={customerInfoGeneralForm}
                formData={mappedCustomerData?.generalInfo || {}}
                register={register}
                errors={errors}
              />
            </Box>
          </Box>
        </AccordianUnControlled>
        <AccordianUnControlled
          className="border-0 mt-6"
          labelClass="text-[1.25rem]"
          title={'common.companyInfo'}
        >
          <Box className="flex flex-col px-4">
            <Box className="flex flex-col pl-8" gap={2}>
              <CustomFieldMapper
                formFields={companyInfoForm}
                formData={mappedCustomerData?.companyInfo || {}}
              />
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

export default CustomerGeneral;
