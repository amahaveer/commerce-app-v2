import AccordianUnControlled from '@/components/atoms/Accordian';
import CustomButton from '@/components/atoms/Button';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { Box, Typography, IconButton } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import {
  priceConstraintSchema,
  priceInformationForm,
  priceTierSchema
} from './schema';
import { useEffect, useState } from 'react';
import { Delete } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useAppContext } from 'context/application.context';
import { convertToLabelValuePairs } from 'utils';

const AddVariantPrice = (props: any) => {
  const { initialPriceData } = props;

  const { translate } = useTranslate();
  const { countries } = useAppContext();
  /* Field Forms */
  const params = {
    countriesOptions: convertToLabelValuePairs(countries)
  };
  const priceInfoForm = priceInformationForm(translate);
  const priceConstraintForm = priceConstraintSchema(translate, params);

  /*States */
  const [priceTiers, setPriceTiers] = useState<Array<Array<any>>>([]);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    unregister
  } = useForm({
    defaultValues: initialPriceData || {}
  });

  useEffect(() => {
    if (initialPriceData) {
      reset(initialPriceData);
    }
  }, [initialPriceData, reset]);

  const onAddPriceTier = () => {
    const currency = getValues('currencyCode');
    const priceParams = { index: priceTiers.length, prefix: currency };
    const priceTierForm = priceTierSchema(translate, priceParams);
    setPriceTiers((prev: any) => [...prev, priceTierForm]);
  };

  const onDeletePriceTierRow = (index: number) => {
    const updatedPriceTiers = priceTiers.filter((_, i) => i !== index);
    setPriceTiers(updatedPriceTiers);
    // delete from form hook
    unregister(`priceTier.${index}`);
  };

  const onSubmit = (data: any) => {
    console.log('data====>', data);
  };

  return (
    <Box
      className="flex flex-col"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Header Section */}
      <Box className="flex flex-col border-b pb-4">
        <Box className="flex flex-row justify-between items-center">
          <Typography className="text-2xl mb-2 mt-2 font-medium">
            {translate('product.addEmbeddedPrice')}
          </Typography>
          <Box className="flex" gap={1}>
            <CustomButton type="button" title={translate('common.cancel')} />
            <CustomButton
              type="submit"
              className="text-white"
              title={translate('common.save')}
              variant="contained"
            />
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <Box className="flex flex-col justify-start items-center h-[63vh] overflow-y-auto">
        {/* Price Information Accordion */}
        <AccordianUnControlled
          labelClass="text-[1.125rem] text-commerceBlack"
          className="border-0 w-[46.375rem]"
          title="product.priceInformation"
        >
          <Box className="flex flex-col px-4">
            <Box className="flex flex-col pl-8" gap={2}>
              <CustomFieldMapper
                formFields={priceInfoForm}
                formData={initialPriceData}
                register={register}
                errors={errors}
              />
            </Box>

            <Typography className="text-customGray text-[1rem] font-medium ml-7 mt-5">
              {translate('product.priceConstraints')}
            </Typography>

            <Box className="flex flex-col pl-8 mt-4" gap={2}>
              <CustomFieldMapper
                formFields={priceConstraintForm}
                formData={initialPriceData}
                register={register}
                errors={errors}
              />
            </Box>
          </Box>
        </AccordianUnControlled>

        {/* Custom Field Accordion */}
        <AccordianUnControlled
          labelClass="text-[1.125rem] text-commerceBlack"
          className="border-0 w-[46.375rem] mt-4  "
          title="common.customFields"
        >
          <Box className="px-4">
            <Typography className="text-commerceBlack font-normal text-[1rem]">
              {translate('product.noCustomFieldsForPricesInfo')}
            </Typography>
          </Box>
        </AccordianUnControlled>

        {/* Price tiers Accordion */}
        <AccordianUnControlled
          labelClass="text-[1.125rem] text-commerceBlack"
          className="border-0 w-[46.375rem] mt-4  "
          title="product.priceTiers"
        >
          <Box className="px-4">
            <Typography className="text-commerceBlack font-normal text-[1rem]">
              {translate('product.priceTierSelectionInsteadBasePriceInfo')}
            </Typography>

            <Box className="flex flex-col pl-0 mt-4" gap={2}>
              {priceTiers.map(
                (row: Array<any>, index) =>
                  row.length > 0 && (
                    <Box
                      key={index}
                      className="flex flex-row w-full items-center justify-between"
                      gap={2}
                    >
                      <CustomFieldMapper
                        formFields={row}
                        formData={{}}
                        register={register}
                        errors={errors}
                      />
                      <Box className="flex items-center mt-6">
                        <IconButton onClick={() => onDeletePriceTierRow(index)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  )
              )}
            </Box>

            <Box className="pt-4">
              <CustomButton.Add
                title={translate('product.addPriceTier')}
                onClick={onAddPriceTier}
              />
            </Box>
          </Box>
        </AccordianUnControlled>
      </Box>
    </Box>
  );
};

export default AddVariantPrice;
