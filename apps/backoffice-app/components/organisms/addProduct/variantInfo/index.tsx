"use client"

import AppDrawer from '@/components/atoms/AppDrawer';
import CustomButton from '@/components/atoms/Button';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddVariant from './addVariant';
import DataTable from '@/components/atoms/DataTable';
import { variantColumns } from './column';
import EditVariantComponent from './editVariant';
import { useProducts } from 'context/product';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import useTranslate from 'hooks/useTranslate';
import { usePermissions } from 'context/permissions.context';
import { eProductPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/productPermissions.type";


const AddVariantInfo = () => {

	const { isEditMode, mappedProductData: { masterVariant, variants }, onClickToolbarAction } = useProducts();
	const { translate } = useTranslate();
	const { hasPermission } = usePermissions();
	const [openVariantModal, setVariantModal] = useState(false);
	const [editVariantId, setEditVariantId] = useState(0)
	const [variantList, setVariantList] = useState<Array<any>>([]);

	useEffect(() => {
		if (!masterVariant && !variants.length) return;
		setVariantList([
			masterVariant,
			...variants
		])
	}, [masterVariant, variants.length])

	const onRowClick = ({ row }: any) => {
		if (!hasPermission(eProductPermissions.EDIT_VARIANTS)) return;
		setEditVariantId(row.id);
	}

	return (
		<Box className="pl-[5%] pr-[20px] pt-8">
			<Box className="flex flex-row ">
				<Box className="flex flex-col w-[80%]">
					<Typography>{translate("product.addProductVariantsAndManageAttributeInformation")}.</Typography>
					<Typography>{translate("product.allProductsRequireAtLeastOneVariant")}.</Typography>
				</Box>
				<Box className="flex justify-end w-full">
					{hasPermission(eProductPermissions.ADD_VARIANTS) &&
						<CustomButton.Add
							className='h-[40px] normal-case'
							title='Add variant'
							onClick={() => setVariantModal(true)}
						/>
					}
				</Box>
			</Box>

			<Box className="mt-12">
				<DataTable
					rows={variantList || []}
					columns={variantColumns}
					getRowId={(item) => `${item.sku}${item.key}`}
					onRowClick={onRowClick}
				/>
			</Box>

			<AppDrawer open={openVariantModal} onClose={() => setVariantModal(false)} >
				<AddVariant
					closeDrawer={() => setVariantModal(false)}
					setVariantList={setVariantList}
				/>
			</AppDrawer>

			<AppDrawer open={!!editVariantId} onClose={() => setEditVariantId(0)} >
				<EditVariantComponent variantId={editVariantId} closeDrawer={() => setEditVariantId(0)} />
			</AppDrawer>

			{!isEditMode && !openVariantModal && !editVariantId &&
				<SaveToolbar
					onClickAction={onClickToolbarAction}
					isVisible={true}
					showNext={true}
					showBack={true}
				/>
			}
		</Box>
	)
}

export default AddVariantInfo;