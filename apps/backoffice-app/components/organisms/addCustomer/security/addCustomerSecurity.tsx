import AccordianUnControlled from '@/components/atoms/Accordian';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { Box, Switch, Typography } from '@mui/material';
import { useCustomers } from 'context/customers';
import useTranslate from 'hooks/useTranslate';
import { useForm } from 'react-hook-form';
import CustomFieldMapper from '../../customFieldMapper';
import { customerSecuritySchema } from '../general/schema';

function AddCustomerSecurity() {
  const { translate } = useTranslate();
  const customerSecurityForm = customerSecuritySchema(translate);
  const { mappedCustomerData, onToolbarAction } = useCustomers();
  const {
    register,

    formState: { errors }
  } = useForm({
    defaultValues: mappedCustomerData.generalInfo || {}
  });

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <Box className="flex flex-row mt-10">
      <Box className="w-full">
        <AccordianUnControlled
          className="border-0 mt-6"
          labelClass="text-[1.25rem]"
          title={'common.authentication'}
        >
          <Box className="flex flex-col pl-8">
            <Box className="mb-4 mt-2 w-full">
              <Typography className="font-medium">
                {translate('common.authmode')}
              </Typography>
              <Box display="flex" alignItems="center">
                <Switch {...label} disabled />
                <Typography className="text-sm font-medium">
                  {translate('common.useExternal')}
                </Typography>
              </Box>
              <Box className="flex flex-col px-4">
                <Box className="flex flex-col mt-10 space-y-6" gap={2}>
                  <CustomFieldMapper
                    formFields={customerSecurityForm}
                    formData={mappedCustomerData.generalInfo || {}}
                    register={register}
                    errors={errors}
                  />
                </Box>
              </Box>
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
    </Box>
  );
}

export default AddCustomerSecurity;
