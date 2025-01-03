import { Box, Typography, TextField, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccordianUnControlled from '@/components/atoms/Accordian';
import PrefixInputBase from '@/components/atoms/PrefixInputBase';
import useTranslate from 'hooks/useTranslate';
import { useProducts } from 'context/product';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { useState } from 'react';
import { IVariant } from 'types/product.type';

const AddVariant = (props: any) => {

	const { closeDrawer, setVariantList } = props;
	const { translate } = useTranslate()
	const { mappedProductData, revertProductChanges, setMappedProductData } = useProducts();
	const [variantData, setVariantData] = useState<IVariant | null>(null);

	const onChange = (value: string, field: string) => {
		setVariantData((prev: any) => ({
			...prev,
			[field]: value
		}))
	}

	const onClickToolbar = (action: string) => {
		if (action === eToolbarButtonActions.CANCEL) {
			closeDrawer()
		}
	}

	const onSubmitForm = (e: any) => {
		e?.preventDefault()
		if (!variantData) return;

		/* INFO: For master variant id will always be 1 */
		if (!mappedProductData.masterVariant) {
			variantData.id = 1;
			setMappedProductData((prev: any) => ({
				...prev,
				masterVariant: variantData
			}));
		} else {
			variantData.id = mappedProductData.variants.length + 1;
			setMappedProductData((prev: any) => ({
				...prev,
				variants: [ ...prev.variants, variantData]
			}))
		}
		setVariantList((prev: any) => [
			...prev,
			variantData,
		])
		closeDrawer()
	}

	return (
		<Box className="flex flex-col" component="form" onSubmit={onSubmitForm} >
			<Box className="flex items-center gap-2 w-full">
				<Box className="flex items-center">
					<Typography className='mr-2' noWrap>{translate("common.sku")}</Typography>
					<TextField
						variant="outlined"
						size="small"
						className='w-[400px]'
						onChange={(e) => onChange(e.target.value, "sku")}
						required
					/>
				</Box>

				<Box className="flex items-center">
					<Typography noWrap className='mr-2 w-auto'>{translate("product.variantKey")}</Typography>
					<TextField
						className='w-[400px]'
						variant="outlined"
						size="small"
						onChange={(e) => onChange(e.target.value, "key")}
						required
					/>
				</Box>
			</Box>

			<Box className="mt-6">
				<Box className="border-b w-100 ">
					<Typography className="relative -bottom-[4px] pb-[1px] underline text-primary-common text-[1.12rem] font-medium	">General & Attributes</Typography>
				</Box>
			</Box>

			<Box className="flex flex-row px-[30px] w-100 mt-10">
				<Box className="w-[60%] ">
					<Box className="flex  ml-[-9px] flex-row items-center">
						<IconButton className='text-customBlue-sky' aria-label="Info">
							<InfoOutlinedIcon />
						</IconButton>
						<Typography className='text-[1rem] text-customGray' fontWeight={500}>
							{translate("product.imagesPricesInventoryAndStoreBasedAddedAfterSave")}
						</Typography>
					</Box>

					<AccordianUnControlled className='border-0 mt-6' labelClass='text-[1.25rem]' title={"product.variantAttributes"}>
						<Box className="flex flex-col pl-8">
							<Box className="mb-4">
								<Typography className='text-[0.87rem]' fontWeight={500}>ElectronicsPartno</Typography>
								<Typography className="text-[0.87rem] text-custom-gray">
									ElectronicsPartno (DE-DE)
								</Typography>
								<PrefixInputBase prefix={null} onChange={() => { }} />
							</Box>
						</Box>
					</AccordianUnControlled>
				</Box>
			</Box>

			<SaveToolbar
				onClickAction={onClickToolbar}
				isVisible={true}
				showSave={true}
			/>
		</Box>
	)
}

export default AddVariant;