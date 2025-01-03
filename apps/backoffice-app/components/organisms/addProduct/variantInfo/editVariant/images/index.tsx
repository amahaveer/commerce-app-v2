
import AppDrawer from '@/components/atoms/AppDrawer';
import CustomButton from '@/components/atoms/Button';
import ImageDraggableComponent from '@/components/molecules/DragableImageContainer';
import { Box } from '@mui/material';
import { useState } from 'react';
import AddVariantImages from './addVariantImages';
import useTranslate from 'hooks/useTranslate';
import { useProducts } from 'context/product';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { IVariant } from 'types/product.type';

interface IPropsType {
	selectedVariant: IVariant, 
	closeDrawer: () => void;
}
const VariantImages = (props: IPropsType) => {

	const { selectedVariant } = props;
	const { translate } = useTranslate()
	const { mappedProductData, setMappedProductData, revertProductChanges } = useProducts();
	const [draggable, setDraggable] = useState(false);
	const [addImageDrawer, setAddImageDrawer] = useState(false);
	const [visibleToolbar, setVisibleToolbar] = useState(false);

	const variantId = selectedVariant.id;
	const variantIndex = mappedProductData.variants.findIndex((variant) => variant.id === variantId);

	const setImageList = (newList: Array<any>) => {
		if (variantId === 0) return;
		/* if id=1 then it is master variant */
		if (variantId === 1) {
			setMappedProductData((prev: any) => ({
				...prev,
				masterVariant: {
					...prev.masterVariant,
					images: newList,
				},
			}));

		} else {
			/* INFO: add the image in selected variant by id */
			setMappedProductData((prev) => ({
				...prev,
				variants: [
					...prev.variants,
					...prev.variants[variantIndex].images = newList
				]
			}));
		}

		setVisibleToolbar(true);
	}

	const onDeleteImage = (index: number) => {
		if (variantId === 1) {
			setMappedProductData((prev: any) => ({
				...prev,
				masterVariant: {
					...prev.masterVariant,
					images: prev.masterVariant.images.filter((_: any, i: number) => index !== i),
				}
			}))

		} else {
			const filteredImage = mappedProductData.variants[variantIndex].images.filter((_, i: number) => index !== i);
			setMappedProductData((prev) => ({
				...prev,
				variants: [
					...prev.variants,
					...prev.variants[variantIndex].images = filteredImage
				]
			}));
		}

		setVisibleToolbar(true);
	};

	const onToolbarAction = (action: eToolbarButtonActions) => {
		if (action === eToolbarButtonActions.CANCEL) {
			setVisibleToolbar(false);
			revertProductChanges()
		}

		if (action === eToolbarButtonActions.SAVE) {

		}
	}

	const getImageList = (): Array<any> => {
		if (variantId < 1) return [];
		if (variantId === 1) {
			return mappedProductData.masterVariant?.images || [];
		}

		return mappedProductData.variants[variantIndex]?.images;
	}

	return (
		<Box className="flex flex-col px-10 pt-8">
			<Box className="flex flex-row justify-between">
				<CustomButton.Height
					onClick={() => setDraggable(!draggable)}
					title={translate("common.reorder")}
				/>
				<CustomButton.Add
					title={translate("common.addImage")}
					onClick={() => setAddImageDrawer(true)}
				/>
			</Box>

			<Box className="flex">
				<ImageDraggableComponent
					draggable={draggable}
					imageList={getImageList()}
					onDeleteImage={onDeleteImage}
					setImageList={setImageList}
				/>
			</Box>

			<AppDrawer open={addImageDrawer} onClose={() => setAddImageDrawer(false)} >
				<AddVariantImages closeDrawer={setAddImageDrawer} variantId={variantId} />
			</AppDrawer>

			<SaveToolbar isVisible={visibleToolbar} onClickAction={onToolbarAction} showSave />
		</Box>
	)
}

export default VariantImages;