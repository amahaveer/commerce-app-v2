"use client"

import { eAttributesType } from "types/product.type";
import { Box, Typography } from '@mui/material';
import PrefixInputBase from "@/components/atoms/PrefixInputBase";
import DatePickerField from "@/components/atoms/DateField";
import SelectDropdown from "@/components/atoms/SelectDropdown";
import { extractSetAtrributeOptions, getBooleanOptions, getCurrencyOptions } from "utils";
import AutoCompleteDropdown from "@/components/atoms/AutoCompleteDropdown";
import SearchBar from "@/components/atoms/SearchBar";

const AttributesListing = (props: any) => {

	const { constraintType, attributes } = props;

	const getTextField = (item: any) => {
		return (
			<PrefixInputBase prefix={null} onChange={() => { }} />
		)
	}

	const getDateFeild = (item: any) => {
		return (
			<DatePickerField fieldName="date" />
		)
	}

	const getMultiSelectionDropdown = (item: any) => {
		const options = extractSetAtrributeOptions(item)
		return (
			<AutoCompleteDropdown
				multiple
				limitTags={4}
				options={options}
				onSelect={(value) => console.log(value)}
			/>
		)
	}

	const getReferenceField = () => {
		return (
			<SearchBar fullWidth={true} onClickSearch={() => { }} placeholder="Search" />
		)
	}

	const getPriceField = () => {
		const options = getCurrencyOptions()
		return (
			<Box className="flex flex-row items-center ">
				<SelectDropdown className="w-24" defaultValue={options[0].value} options={options} />
				<PrefixInputBase wrapperClass="w-[85%]" type="number" prefix={null} onChange={() => { }} />
			</Box>
		)
	}

	const getNumberField = () => {
		return (
			<PrefixInputBase type="number" prefix={null} onChange={() => { }} />
		)
	}

	const displayBooleanField = () => {
		const options = getBooleanOptions();
		return (
			<SelectDropdown fullWidth defaultValue={options[0].value} options={options} />
		)
	}

	const displayFields = (item: any) => {
		const actions: any = {
			[eAttributesType.TEXT]: getTextField,
			[eAttributesType.DATE]: getDateFeild,
			[eAttributesType.SET]: getMultiSelectionDropdown,
			[eAttributesType.REFERENCE]: getReferenceField,
			[eAttributesType.MONEY]: getPriceField,
			[eAttributesType.BOOLEAN]: displayBooleanField,
			[eAttributesType.NUMBER]: getNumberField,
		};
		return actions[item.type.name] ? actions[item.type.name](item) : null
	}

	const getTitle = (item: any) => {
		const locale = "en-US"
		const label = item.label[locale];
		return label;
	}

	const getDescription = (item: any) => {
		const locale = "en-US"
		const label = item.label[locale];
		return label || "";
	}

	return (
		<Box>
			{attributes?.length && attributes.map((item: any, index: number) => (
				item.attributeConstraint === constraintType &&
				<Box key={index} className="mt-2">
					<Typography className="text-[0.875rem] font-medium text-commerceBlack">{getTitle(item)}</Typography>
					<Typography className="text-[0.875rem] font-normal text-customGray">{getDescription(item)}</Typography>
					{displayFields(item)}
				</Box>
			))}
		</Box>
	)
}

export default AttributesListing