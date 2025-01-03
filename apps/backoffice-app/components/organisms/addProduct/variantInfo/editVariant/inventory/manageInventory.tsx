import AccordianUnControlled from '@/components/atoms/Accordian';
import CustomButton from '@/components/atoms/Button';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { addInventorySchema } from './schema';
import { useForm } from 'react-hook-form';

const ManageVariantInventory = (props: any) => {
  const { initialInventoryData } = props;

  const { translate } = useTranslate();
  const addInventoryForm = addInventorySchema(translate);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    unregister
  } = useForm({
    defaultValues: {}
  });

  const formData = {
    inventory_key: initialInventoryData?.supplyChannel?.key,
    channelName: initialInventoryData?.supplyChannel.name['en-US'],
    quantity: initialInventoryData?.quantityOnStock,
    averageRestockPeriodDays: initialInventoryData?.restockableInDays,
    restockDateRange: initialInventoryData?.expectedDelivery
  };

  return (
    <Box className="flex flex-col">
      <Box className="flex flex-col border-b pb-4">
        <Box className="flex flex-row justify-between items-center">
          <Typography className="text-2xl mb-2 mt-2 font-medium">
            {translate('product.addInventory')}
          </Typography>
          <Box className="flex" gap={1}>
            <CustomButton title={translate('common.cancel')} />
            <CustomButton title={translate('common.save')} disabled />
          </Box>
        </Box>
      </Box>

      <Box className="flex flex-col justify-start items-center h-[63vh] overflow-y-auto">
        <AccordianUnControlled
          labelClass="text-[1.125rem] text-commerceBlack"
          className="border-0 w-[46.375rem]"
          title="product.priceInformation"
        >
          <Box className="flex flex-col px-4">
            <Box className="flex flex-col pl-8" gap={2}>
              <CustomFieldMapper
                formFields={addInventoryForm}
                formData={formData}
                register={register}
                errors={errors}
              />
            </Box>

            <Typography className="text-customGray text-[1rem] font-medium ml-7 mt-5">
              {translate('product.priceConstraints')}
            </Typography>

            {/* <Box className="flex flex-col pl-8 mt-4" gap={2}>
                            <CustomFieldMapper formFields={priceConstraintForm} />
                        </Box> */}
          </Box>
        </AccordianUnControlled>
      </Box>
    </Box>
  );
};

export default ManageVariantInventory;
