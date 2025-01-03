"use client"

import CustomButton from '@/components/atoms/Button';
import CustomDropzone from '@/components/atoms/Dropzone';
import { Box, Typography } from '@mui/material';
import { addProductVariantImage } from 'app/api/product.api';
import { useProducts } from 'context/product';
import useTranslate from 'hooks/useTranslate';
import { Dispatch, SetStateAction, useState } from 'react';
import { getBase64ImageDimensions } from 'utils';
interface IPropsType {
	variantId: number;
	closeDrawer: Dispatch<SetStateAction<boolean>>;
}

const AddVariantImages = (props: IPropsType) => {

	const { closeDrawer, variantId } = props;
	const { translate } = useTranslate();
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const { setMappedProductData, mappedProductData, product } = useProducts();

	const variantIndex = mappedProductData.variants.findIndex((variant) => variant.id === variantId);

	const processUploadedImages = async (uploadedImages: string[]) => {
		const images = await Promise.all(
			uploadedImages.map(async (item: string) => {
				const dimensions = await getBase64ImageDimensions(item);
				return {
					url: item,
					dimensions: {
						w: dimensions.width,
						h: dimensions.height,
					},
					label: ""
				};
			})
		);
	
		return images;
	};

	const onUploadImage = async () => {
		
		const images: any = await processUploadedImages(uploadedImages)
		console.log("uploadedImagesimages===>", images)
		if (variantId === 1) {
			setMappedProductData((prev: any) => ({
				...prev,
				masterVariant: {
					...prev.masterVariant,
					images: [	
						...prev.masterVariant?.images, 
						...images
					],
				},
			}));
		} else {
			const prevImages = mappedProductData.variants[variantIndex].images;
			setMappedProductData((prev: any) => ({
				...prev,
				variants: [
					...prev.variants,
					prev.variants[variantIndex].images = [
						...prevImages,
						...images
					]
				]
			}));
		}

		/* INFO: call api */
		addProductVariantImage({
			body: { image: images, variantID: variantId },
			query: `id=${product.id}&version=${product.version}`
		})
		onCancel()
	}

	const onCancel = () => {
		setUploadedImages([])
		closeDrawer(false)
	}

	return (
		<Box className="flex flex-col">
			
			<Box className="flex flex-col border-b pb-4">
				<Typography className="text-2xl mb-2 mt-2 font-medium">{translate("common.addANewImage")}</Typography>
				<Box className="flex flex-row justify-between items-center">
					<Typography className='text-customGray text-[1rem] font-normal'>{
						translate("common.supportedImageFileFormatsInfo")}
					</Typography>
					<Box className="flex" gap={1}>
						<CustomButton title={translate("common.cancel")} onClick={onCancel} />
						<CustomButton 
							title={translate("common.upload")} 
							disabled={!uploadedImages.length} 
							onClick={onUploadImage}
						/>
					</Box>
				</Box>
			</Box>

			<Box className="pt-10">
				<CustomDropzone uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
			</Box>

		</Box>
	)
}

export default AddVariantImages;