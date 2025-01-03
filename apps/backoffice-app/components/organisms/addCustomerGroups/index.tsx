import AccordianUnControlled from '@/components/atoms/Accordian';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { Box } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import CustomFieldMapper from '../customFieldMapper';
import { customerGroupGeneralSchema, CustomFieldsSchema } from './schema';

function AddCustomerGroupForm() {
  const { translate } = useTranslate();

  const customerGroupInfoGeneralForm = customerGroupGeneralSchema(translate);
  const customFieldsForm = CustomFieldsSchema(translate);

  return (
    <Box className="flex flex-row">
      <Box className="w-full">
        <AccordianUnControlled
          className="border-0 "
          labelClass="text-[1.25rem]"
          title={'common.generalInformation'}
        >
          <Box className="flex flex-col px-4">
            <Box className="flex flex-col pl-4 mt-6 space-y-6 " gap={2}>
              <CustomFieldMapper
                formFields={customerGroupInfoGeneralForm}
                formData={{}}
                errors={{}}
              />
            </Box>
          </Box>
        </AccordianUnControlled>
        <AccordianUnControlled
          className="border-0 mt-6"
          labelClass="text-[1.25rem]"
          title={'common.customFields'}
        >
          <Box className="flex flex-col px-4">
            <Box className="flex flex-col pl-8" gap={2}>
              <CustomFieldMapper formFields={customFieldsForm}
                formData={{}}
                emptyMessage="There are no custom types defined. To extend the information, create custom types through the API first."
              />
            </Box>
          </Box>
        </AccordianUnControlled>
        <SaveToolbar
          isVisible={true}
          showSave
          onClickAction={() => { }}
        />
      </Box>
    </Box>
  );
}

export default AddCustomerGroupForm;
