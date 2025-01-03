import AccordianUnControlled from '@/components/atoms/Accordian';
import CustomButton from '@/components/atoms/Button';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { Box } from '@mui/material';
import { useCustomers } from 'context/customers';
import useTranslate from 'hooks/useTranslate';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomFieldMapper from '../../customFieldMapper';
import ListTemplate from '../../ListTemplate';
import { companyInfoSchema, customerGeneralSchema } from './schema';

const AddNewAddress = () => {
   const { translate } = useTranslate();
   const customerInfoGeneralForm = customerGeneralSchema(translate);
   const { mappedCustomerData } = useCustomers();
   const [openToolbar, setOpenToolbar] = useState(false);
   const companyInfoForm = companyInfoSchema(translate);
    const {
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
      unregister
    } = useForm({
      defaultValues: mappedCustomerData.addresses || {}
    });
     useEffect(() => {
       if (mappedCustomerData) {
         reset(mappedCustomerData.addresses);
       }
     }, [mappedCustomerData, reset]);

     const onClickToolbar = (action: string) => {
       if (action === eToolbarButtonActions.SAVE) {
       }
       if (action === eToolbarButtonActions.CANCEL) {
         setOpenToolbar(false);
       }
     };

  return (
    <Box className="flex flex-col mt-10 w-full">
      <Box className="flex items-center gap-2 w-full">
        <Box className="flex items-center w-[50%]">
          <ListTemplate.Header title={translate('common.createAddress')} />
        </Box>

        <Box className="flex items-center w-[50%] gap-2 mt-2">
          <Box className="flex items-center">
            <CustomButton.ReceiptLong
              title={translate('common.defaultBilingAddress')}
            />
          </Box>
          <Box className="flex items-center ">
            <CustomButton.LocalShipping
              title={translate('common.defaultShippingAddress')}
            />
          </Box>
          <Box className="flex items-center ">
            <CustomButton title={translate('common.cancel')} />
          </Box>
          <Box className="flex items-center ">
            <CustomButton title={translate('common.save')} disabled />
          </Box>
        </Box>
      </Box>
      <Box className="border-b w-100 mt-6 "></Box>

      <Box className="flex flex-row px-[30px] w-100 mt-10">
        <Box className="w-[60%] ml-32">
          <AccordianUnControlled
            className="border-0 mt-6"
            labelClass="text-[1.25rem]"
            title={'common.addressDetails'}
          >
            <Box className="flex flex-col px-4">
              <Box className="flex flex-col pl-8 mt-4" gap={2}>
                <CustomFieldMapper
                  formFields={customerInfoGeneralForm.slice(0, 1)}
                  formData={{}}
                  register={register}
                  errors={errors}
                />
              </Box>
              <Box className="flex flex-row gap-2 pl-8 mt-4">
                <CustomFieldMapper
                  formFields={customerInfoGeneralForm.slice(1, 2)}
                  formData={{}}
                  register={register}
                  errors={errors}
                />
                <CustomFieldMapper
                  formFields={customerInfoGeneralForm.slice(2, 3)}
                  formData={{}}
                  register={register}
                  errors={errors}
                />
              </Box>

              <Box className="flex flex-col pl-8 mt-4" gap={2}>
                <CustomFieldMapper
                  formFields={customerInfoGeneralForm.slice(3)}
                  formData={{}}
                  register={register}
                  errors={errors}
                />
              </Box>
            </Box>
          </AccordianUnControlled>
          <AccordianUnControlled
            className="border-0 mt-6"
            labelClass="text-[1.25rem]"
            title={'common.constactDetails'}
          >
            <Box className="flex flex-col px-4">
              <Box className="flex flex-col pl-8 mt-4 mb-4" gap={2}>
                <CustomFieldMapper formFields={companyInfoForm} formData={{}} />
              </Box>
            </Box>
          </AccordianUnControlled>
          <AccordianUnControlled
            className="border-0 mt-6"
            labelClass="text-[1.25rem]"
            title={'common.customFields'}
          >
            <Box className="flex flex-col pl-8">
              <Box className="mb-4">
                {translate('customers.customfieldText')}
              </Box>
            </Box>
          </AccordianUnControlled>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewAddress;
