"use client"

import React from "react";
import AccordianComponent from "../../atoms/Accordian";
import RadioButtonsGroup from "../../atoms/RadioGroup";
import { eFieldType } from "types/global";
import SelectDropdown from "../../atoms/SelectDropdown";
import { Box, } from '@mui/material';
import CheckboxComponent from "../../atoms/Checkbox";
import { IFilterFormGeneratorProps } from "./type";


const FilterFormGenerator = (props: IFilterFormGeneratorProps) => {
	
	const { filterData, onSelectFilterHandler } = props;

	const renderRadioGroup = (item: any) => {
		return (
			<RadioButtonsGroup title="" options={item.options} onSelect={(e) => onSelectFilterHandler(item, e)} />
		)
	}

	const renderDropdown = (item: any) => {
		return (
			<SelectDropdown 
				options={item.options} 
				placeholder={item.placeholder} 
				fullWidth={true} 
				onSelect={(e) => onSelectFilterHandler(item, e)}
			/>
		)
	}

	const renderCheckbox = (item: any) => {
		return (
			<CheckboxComponent options={item.options} />
		)
	}

	const renderComponents = (item: any) => {

		switch (item.type) {
			case eFieldType.RADIO: {
				return renderRadioGroup(item);
			}
			case eFieldType.DROPDOWN: {
				return renderDropdown(item);
			}
			case eFieldType.CHECKBOX: {
				return renderCheckbox(item);
			}
		}
	}

	/* TODO: Fix the filter schema because accordian only accept translation keys */
	return (
		<React.Fragment>
			{filterData.map((item: any, index: number) => (
				<AccordianComponent key={index} title={item.label} boxshadow={0}>
					<Box className="flex flex-col mt-[-20px]">
						{item.components.map((component: any, index: number) => (
							<Box key={index} className="ml-2">
								{renderComponents(component)}
							</Box>
						))}
					</Box>
				</AccordianComponent>
			))}
		</React.Fragment>
	)
}

export default FilterFormGenerator;