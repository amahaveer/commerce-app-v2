"use client"

import AccordianUnControlled from '@/components/atoms/Accordian';
import { Box, Typography } from '@mui/material';
import CustomButton from '@/components/atoms/Button';
import SearchBar from '@/components/atoms/SearchBar';
import DataTable from '@/components/atoms/DataTable';
import { categoryColumns } from './columns';
import { useEffect, useState } from 'react';
import { getCategories } from 'app/api/categories.api';
import { useProducts } from 'context/product';
import useTranslate from 'hooks/useTranslate';
import ChipComponent from '@/components/atoms/Chip';
import { useLanguage } from 'context/language.context';

const AddProductCategories = (props: any) => {

	const { translate } = useTranslate();
	const { locale } = useLanguage();
	const { mappedProductData, setMappedProductData } = useProducts();
	const [categories, setCategories] = useState<Array<any>>([]);
	const { onDeleteCategory } = props;

	const { categories: selectedCategories } = mappedProductData.generalInfo;

	useEffect(() => {
		getCategoriesHandler();
	}, [])

	const getCategoriesHandler = async () => {
		try {
			const data = await getCategories();
			setCategories(data.results);
		} catch (error) {
			return;
		}
	}

	const handleRowSelection = (newSelection: any) => {
		const selectedCategories = newSelection.map((id: string) => categories.find((item: any) => item.id === id));
		setMappedProductData(prevState => ({
			...prevState,
			generalInfo: {
				...prevState.generalInfo,
				categories: selectedCategories
			}
		}));
	};


	const getCategoryLabelById = (item: any) => {
		// const name = categories.find((item: any) => item.id === id)?.name?.[locale] 
		return item?.name?.[locale] || '--';
	}

	return (
		<Box className="flex flex-col">
			<Typography className='text-[1.5rem] leading-[2.125rem] font-semibold'>{translate("common.addCategories")}</Typography>
			<br />

			<Box className="border-b w-100 mt-4 ">
				<Typography className="relative -bottom-[4px] pb-[1px] underline text-primary-common text-[1.12rem] font-medium	">
					{translate("common.searchAndFilter")}
				</Typography>
			</Box>

			<Box className="h-[64vh] overflow-y-auto">
				<Box className="">
					<AccordianUnControlled className='border-0 mt-6' labelClass='text-[1rem] text-commerceBlack' title='categories.selectedCategories'>
						<Box className="pl-6 mt-[-20px] flex flex-wrap gap-1">
							{!selectedCategories?.length &&
								<Typography>{translate("categories.noCategoriesSelected")}</Typography>
							}
							<Box className="flex gap-1 mt-4">
								{selectedCategories?.length && selectedCategories?.map((item, index) => (
									<ChipComponent
										key={index}
										className="bg-lavender border border-solid border-lavender-light flex items-center"
										label={getCategoryLabelById(item)}
										showDeleteIcon={true}
										onDelete={() => onDeleteCategory(index)}
									/>
								))}
							</Box>
						</Box>
					</AccordianUnControlled>
				</Box>


				<Box className=" h-[50vh] flex flex-col mt-8  w-[80vw]  overflow-x-auto">
					<Box className="flex ">
						<CustomButton.Filter title='Filter' />
						<SearchBar className='w-[27.625rem]' onClickSearch={() => { }} />
					</Box>
					<Box className=" mt-6 overflow-x-auto">
						<DataTable
							rows={categories}
							columns={categoryColumns}
							className="min-w-[800px]"
							checkboxSelection
							// getRowId={(row) => row.categoryName}
							onRowSelectionModelChange={handleRowSelection}
							// rowSelectionModel={selectedCategories ? selectedCategories?.map((item) => item.categoryName) : []}
						/>
					</Box>
				</Box>
			</Box>

		</Box>
	)
}

export default AddProductCategories;