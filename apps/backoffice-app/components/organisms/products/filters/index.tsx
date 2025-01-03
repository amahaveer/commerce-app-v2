"use client"
import React, { useState } from "react";
import { Box, Typography } from '@mui/material';
import { useAppContext } from "context/application.context";
import SelectDropdown from "@/components/atoms/SelectDropdown";
import FilterFormGenerator from "@/components/organisms/FilterForm";
import { defaultFilters } from "./defaultSchema";
import FilterHeader from "@/components/organisms/FilterForm/filterHeader";
import EditFilterComponent from "@/components/organisms/FilterForm/editFilter";

const ProductFilters = () => {

	const [filterList, setFilterList] = useState<any>(defaultFilters);
	const { editFilter } = useAppContext();
	// const { setSelectedFilters } = useProducts();

	const onSelectFilterHandler = (item: any, value: string) => {
		console.log("item=>", item)
	}

	return (
		<Box role="presentation" className=" flex flex-col">
			
			<FilterHeader filterList={filterList} >
				<Box>
					<Typography fontWeight={500} className="font-inter text-sm text-commerceBlack mb-2">Add sidebar filters</Typography>
					<SelectDropdown options={[]} placeholder="" fullWidth={true} />
				</Box>
			</FilterHeader>

			<Box className="mt-2">
				{editFilter ?
					<EditFilterComponent filterList={filterList} setFilterList={setFilterList} /> :
					<FilterFormGenerator filterData={filterList} onSelectFilterHandler={onSelectFilterHandler} />
				}
			</Box>
		</Box>
	)
}

export default ProductFilters;