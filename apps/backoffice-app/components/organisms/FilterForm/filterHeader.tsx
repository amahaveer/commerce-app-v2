"use client"

import React from "react";
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowForward, } from '@mui/icons-material';
import RadioButtonsGroup from "@/components/atoms/RadioGroup";
import EditIcon from '@mui/icons-material/Edit';
import { useAppContext } from "context/application.context";
import SelectDropdown from "@/components/atoms/SelectDropdown";
import { getFilterOperatorOptions } from "utils";
import useTranslate from "hooks/useTranslate";


const FilterHeader = (props: any) => {

	const { editFilter, setEditFilter, setOpenFilterDrawer, } = useAppContext();
	const { children, filterList } = props;
	const { translate } = useTranslate()

	if (editFilter) {
		return (
			<Box className="flex flex-col h-[130px] bg-gray-100 pl-6 pr-6" boxShadow={"0 2px 5px -3px #878cab"}>
					<Box className="mt-4">
						<Typography>Add Filters</Typography>
						<SelectDropdown options={filterList || []} valueAlias="field" placeholder="" fullWidth={true} />
					</Box>
			</Box>
		)
	}

	return (
		<Box className="flex flex-col h-[200px] bg-gray-100 pl-6 pr-6" boxShadow={"0 2px 5px -3px #878cab"}>
			<Box className="flex justify-end ">
				<IconButton onClick={() => setOpenFilterDrawer(false)} aria-label="Close Drawer">
					<ArrowForward />
				</IconButton>
			</Box>
			<Box>
				{children}
				<Typography fontWeight={500} className="font-inter text-sm text-commerceBlack mb-2 mt-2">Combine all filters by</Typography>
				<Box className="flex">
					<RadioButtonsGroup row={true} options={getFilterOperatorOptions(translate)} />
					<Box className="flex items-center ml-auto">
						<EditIcon className="mr-2 text-primary-common hover:text-opacity-80 transition duration-200 ease-in-out" fontSize="small" />
						<Typography 
							className="font-inter text-primary-common hover:text-opacity-80 transition duration-200 ease-in-out cursor-pointer"
							fontWeight={500} 
							onClick={() => setEditFilter(true)}
						>
							Edit Filter
						</Typography>
					</Box>
				</Box>
			</Box>

		</Box>
	)
}

export default FilterHeader;