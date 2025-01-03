
"use client"
import RadioButtonsGroup from '@/components/atoms/RadioGroup';
import SearchBar from '@/components/atoms/SearchBar';
import { SearchOutlined } from '@mui/icons-material';
import { getFilterAttributeFieldOptions } from 'utils';
import { Box, Typography, IconButton } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { IFilterAttributeseBar } from './type';


const FilterAttributeseBar = (props: IFilterAttributeseBar) => {

	const { translate } = useTranslate();
	const { disabled } = props;
	
	return (
		<Box>
			<Box className="flex items-center ml-[-0.5625rem]">
				<IconButton className='text-commerceBlack' aria-label="Info">
					<SearchOutlined />
				</IconButton>
				<Typography>{translate("product.filterAttributeFields")}</Typography>
			</Box>
			<Box className="flex flex-col">
				<RadioButtonsGroup row={true} options={getFilterAttributeFieldOptions(translate)} />
				<SearchBar className='w-[23.625rem]' disabled={disabled} onClickSearch={() => { }} />
			</Box>
		</Box>
	)
}

export default FilterAttributeseBar;