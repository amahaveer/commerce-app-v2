import AccordianUnControlled from '@/components/atoms/Accordian';
import PrefixInputBase from '@/components/atoms/PrefixInputBase';
import FilterAttributeseBar from '@/components/molecules/FilterAttributeBar';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { Box, Typography, } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { generalAndAttributesForm } from './schema';
import { useProducts } from 'context/product';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IVariant } from 'types/product.type';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';

interface IPropsType {
	selectedVariant: IVariant, 
	closeDrawer: () => void;
}

const GeneralAndAttributes = (props: IPropsType) => {

	const { selectedVariant, closeDrawer } = props;
	const { mappedProductData: {variants, masterVariant}, isEditMode, setMappedProductData } = useProducts();
	const { translate } = useTranslate();
	const [openSaveToolbar, setOpenSaveToolbar] = useState<boolean>(false);

	const { register, handleSubmit, getValues, reset, formState: { errors }, unregister, watch } = useForm({
		defaultValues: selectedVariant || {}
	});
	const generalAtrributesFields = generalAndAttributesForm(translate);
	const watchedFields: any = watch();

	useEffect(() => {
		if (selectedVariant) {
			reset(selectedVariant);
		}
	}, [selectedVariant, reset]);

	useEffect(() => {
		checkForChanges()
	}, [watchedFields])

	const checkForChanges = () => {
		const currentValues: any = getValues();
		const hasChanged = Object.keys(currentValues).some((key) => {
			if (!currentValues[key] && !selectedVariant?.[key as keyof IVariant]) {
				return false;
			}
			if (currentValues[key] !== selectedVariant?.[key as keyof IVariant]) {
				return true;
			}
		});
		/* INFO: if value changed and toolbar is not open already then open toolbar */
		if (hasChanged && !openSaveToolbar) {
			setOpenSaveToolbar(true)
		}
		return hasChanged;
	};

	const onSubmit = (data: any) => {
		if (selectedVariant.id === 1) {
			setMappedProductData((prev: any) => ({
				...prev,
				masterVariant: { ...prev, sku: data.sku, key: data.key },
			}))
		} else {
			const variantIndex = variants.findIndex((item) => item.id === selectedVariant.id);
			const updatedVariants = [...variants];
			updatedVariants[variantIndex] = { ...variants[variantIndex], sku: data.sku, key: data.key }
			setMappedProductData((prev) => ({
				...prev,
				variants: updatedVariants
			}))
		}
		/* INFO: if it's edit mode then instantly call the save api, because in add product we call api at last */
		if (isEditMode) {
			
		}
	}

	const onToolbarAction = (action: string) => {
		if (action === eToolbarButtonActions.CANCEL) {
			closeDrawer()
		}
	}

	return (
		<Box className="flex flex-row w-full px-10 pt-5" component="form" onSubmit={handleSubmit(onSubmit)}>

			<Box className="flex w-[60%] flex-col">
				{/* General Information */}
				<AccordianUnControlled
					labelClass='text-[1.125rem] text-commerceBlack'
					className='border-0 w-full'
					title='common.generalInformation'
				>
					<Box className="flex flex-col" gap={2}>
						<CustomFieldMapper
							formFields={generalAtrributesFields}
							formData={selectedVariant}
							register={register}
							errors={errors}
						/>
					</Box>
				</AccordianUnControlled>

				{/* Variant Attributes */}
				<AccordianUnControlled
					labelClass='text-[1.125rem] text-commerceBlack'
					className='border-0 w-full'
					title='product.variantAttributes'
				>
					<Box className="flex flex-col pl-10" gap={1}>
						<Typography className='text-[0.875rem] font-medium' >color</Typography>
						<PrefixInputBase disabled prefix={null} onChange={() => { }} />
					</Box>

					<Box className="flex flex-col pl-10 mt-4" gap={1}>
						<Typography className='text-[0.875rem] font-medium' >size</Typography>
						<PrefixInputBase prefix={null} onChange={() => { }} />
					</Box>
				</AccordianUnControlled>
			</Box>

			<Box className="w-[30%] fixed left-[68%] flex flex-col">
				<FilterAttributeseBar disabled={false} />
			</Box>

			<SaveToolbar isVisible={openSaveToolbar} onClickAction={onToolbarAction} showSave />
		</Box>
	)
}

export default GeneralAndAttributes;