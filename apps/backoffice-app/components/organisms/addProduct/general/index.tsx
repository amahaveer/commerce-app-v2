"use client"

import { Box, Typography, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccordianUnControlled from '@/components/atoms/Accordian';
import IconTextLink from '@/components/atoms/IconTextLink';
import CustomButton from '@/components/atoms/Button';
import { generalformSchema } from './schema';
import AppDrawer from '@/components/atoms/AppDrawer';
import AddProductCategories from './addCategories';
import { useEffect, useState } from 'react';
import { getProductTypesById } from 'app/api/productType.api';
import { useProducts } from 'context/product';
import AttributesListing from '../../Attributes/listing';
import useTranslate from 'hooks/useTranslate';
import FilterAttributeseBar from '@/components/molecules/FilterAttributeBar';
import { TranslationKeys } from 'types/global';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import CustomFieldMapper from '../../customFieldMapper';
import { formatDateTime } from 'utils';
import ChipComponent from '@/components/atoms/Chip';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { useLanguage } from 'context/language.context';
import { useForm } from 'react-hook-form';
import { updateProduct } from 'app/api/product.api';
import { toast } from 'react-toastify';
import { useStepper } from 'context/stepper';
import { usePermissions } from 'context/permissions.context';
import { eProductPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/productPermissions.type";

const ProductGeneralInfo = () => {

	const { mappedProductData, isEditMode, product, setMappedProductData, onClickToolbarAction } = useProducts();
	const [openCategoryModal, setCategoryModal] = useState(false);
	const [attributes, setAttributes] = useState([]);
	const { hasPermission } = usePermissions();

	const { activeStep, stepList } = useStepper()
	const { translate } = useTranslate();
	const { locale } = useLanguage();
	const selectedCategories = mappedProductData.generalInfo?.categories;
	/* General form schema */
	const params = { locale, hasPermission }
	const generalForm = generalformSchema(translate, params)

	const [openToolbar, setOpenToolbar] = useState(false);
	const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
		defaultValues: mappedProductData.generalInfo
	});

	const watchedFields: any = watch();

	useEffect(() => {
		if (mappedProductData.generalInfo && isEditMode) {
			reset(mappedProductData.generalInfo);
		}
	}, [mappedProductData.generalInfo, reset]);


	/* INFO: Only Applicable when this component use to edit details */
	useEffect(() => {
		if (openToolbar || !isEditMode) return;
		const initialValues: any = mappedProductData.generalInfo;
		const hasChanges = Object.keys(watchedFields).some((key) => {
			// Handle arrays: Check if the length of the arrays differs
			if (Array.isArray(watchedFields[key])) {
				return watchedFields[key].length !== initialValues[key].length;
			}

			// Handle objects: Deep compare values of keys in the object
			if (typeof watchedFields[key] === 'object' && watchedFields[key] !== null) {
				const watchedKeys = Object.keys(watchedFields[key]);

				// Ensure both are objects, and compare their values
				return watchedKeys.some((subKey) => {
					if (!watchedFields[key][subKey] && !initialValues[key]?.[subKey]) return false;
					return watchedFields[key][subKey] !== initialValues[key]?.[subKey]
				});
			}

			// For primitive types, check direct equality
			if (watchedFields[key] !== initialValues[key]) {
				return true;
			}

			return false;
		});

		if (hasChanges) {
			if (isEditMode) setOpenToolbar(true);
		}
	}, [watchedFields, mappedProductData.generalInfo, setMappedProductData]);


	useEffect(() => {
		getAttributesHandler();
	}, [])


	const forwardOnClickToolbarAction = (action: any) => {
		/* INFO: checking form validation for required fields */
		if (!isValid) return;

		setMappedProductData((prev) => ({
			...prev,
			generalInfo: { ...watchedFields }
		}))
		onClickToolbarAction(action)
	}

	const onDeleteCategory = (index: number) => {
		if (!selectedCategories?.length) return;
		setOpenToolbar(true);
		const updatedItems: Array<string> = [...selectedCategories];
		updatedItems.splice(index, 1);
		setMappedProductData((prev) => (
			{ ...prev, generalInfo: { ...prev.generalInfo, categories: updatedItems } }
		))
	}

	const getAttributesHandler = async () => {
		try {
			const params = { id: mappedProductData.selectedProductType }
			const data = await getProductTypesById(params);
			setAttributes(data.attributes);
		} catch (error) {
			return
		}
	}

	const displayText = (label: TranslationKeys, value: string) => {
		return (
			<Box className="flex flex-row">
				<Typography className='font-normal w-28 text-[0.875rem] text-customGray '>{translate(label)}</Typography>
				<Typography className='font-normal text-[0.875rem] text-customGray '>{value}</Typography>
			</Box>
		)
	}

	const onClickToolbar = (action: string) => {
		if (action === eToolbarButtonActions.CANCEL) {
			setOpenToolbar(false)
			reset(mappedProductData.generalInfo)
		}
	}

	const onSubmit = async (data: any) => {
		try {
			if (!isEditMode) {
				return console.log("data====>", data)
			}
			await updateProduct({
				body: data,
				query: `id=${product.id}&version=${product.version}`,
				version: product.version
			});
			toast.success(`Product "${data.productName[locale]}" updated`)
		} catch (error: any) {
			toast.error(error.statusText);
			console.log(error.statusText, "ERROR",)
		}
	}

	return (
		<Box className="flex pl-[10%] pt-8" component="form" onSubmit={handleSubmit(onSubmit)}>
			<Box className="w-[50%]">
				<Typography>{translate("product.enterAndManageProductDetails")}</Typography>
				<Box className="flex items-center ml-[-0.5625rem]">
					<IconButton className='text-customBlue-sky' aria-label="Info">
						<InfoOutlinedIcon />
					</IconButton>
					<Typography >{translate("product.postCreationStoreValues")}</Typography>
				</Box>

				{/* General Information */}
				<AccordianUnControlled className='border-0' labelClass='text-[1.25rem]' title={"common.generalInformation"}>
					<Box className="flex flex-col pl-8" gap={2}>
						<CustomFieldMapper
							formFields={generalForm}
							formData={mappedProductData.generalInfo}
							register={register}
							errors={errors}
						/>
	
						{hasPermission(eProductPermissions.ADD_CATEGORIES) &&
							<Box>
								<Typography className='text-[0.87rem] font-medium'>{translate("product.productCategories")}</Typography>
								<CustomButton.Add className='normal-case mt-2' title={translate("common.addCategories")} onClick={() => setCategoryModal(true)} />
							</Box>
						}

						{selectedCategories && selectedCategories.length > 0 &&
							<Box>
								<Typography className='text-[0.87rem] font-medium'>{translate("categories.selectedCategories")}</Typography>
								<Box className="flex" gap={1}>
									{selectedCategories.map((item: any, index) => (
										<ChipComponent
											key={index}
											className="bg-lavender border border-solid text-[0.875rem] border-lavender-light flex items-center"
											label={`${item.name}`}
											showDeleteIcon={hasPermission(eProductPermissions.EDIT_PRODUCT_CATEGORIES)}
											onDelete={() => onDeleteCategory(index)}
										/>
									))}
								</Box>
							</Box>
						}

					</Box>
				</AccordianUnControlled>

				{/* Product Attributes */}
				<AccordianUnControlled className='border-0' labelClass='text-[1.25rem]' title={"common.productAttributes"}>
					<Box className="pl-8">
						<AttributesListing constraintType={"SameForAll"} attributes={attributes} />
					</Box>
				</AccordianUnControlled>
			</Box>

			<Box className="w-[40%] ml-auto fixed left-[64%] flex flex-col">
				{/* Product Detail */}
				{isEditMode &&
					<Box className="flex flex-col">
						{displayText("common.dateCreated", formatDateTime(product.createdAt))}
						{displayText("common.dateModified", formatDateTime(product.lastModifiedAt))}

						<Box className="flex flex-row mt-3">
							<Typography className='font-normal w-28 text-[0.875rem] text-customGray '>{translate('product.productType')}</Typography>
							<IconTextLink textClass='text-[0.875rem]' text={mappedProductData.selectedProductType} />
						</Box>
						<IconTextLink
							wrapperClass='mt-2'
							textClass='text-[0.875rem]'
							text={translate("common.openChangeHistory")}
							icon={<ManageSearchOutlinedIcon />}
						/>
					</Box>
				}
				<br />

				{/* Filter Atrributes Section  */}
				<FilterAttributeseBar disabled={!attributes.length} />
			</Box>

			{/* Add Categories Popup */}
			<AppDrawer open={openCategoryModal} onClose={() => setCategoryModal(false)} >
				<AddProductCategories onDeleteCategory={onDeleteCategory} />
			</AppDrawer>

			{isEditMode &&
				<SaveToolbar isVisible={openToolbar} showSave onClickAction={onClickToolbar} />
			}

			{!isEditMode &&
				<SaveToolbar
					onClickAction={forwardOnClickToolbarAction}
					isVisible={!!mappedProductData.selectedProductType}
					showNext={activeStep !== stepList.length - 1}
					showBack={activeStep > 0}
					showSave={activeStep === stepList.length - 1}
				/>
			}

		</Box >
	)
}

export default ProductGeneralInfo;