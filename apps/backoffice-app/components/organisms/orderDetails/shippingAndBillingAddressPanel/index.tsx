import IconTextLink from '@/components/atoms/IconTextLink';
import { HomeOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { IAddressPanelProps } from './type';


const addressFieldBox = (label: string, value: string) => {
	if (!value) return;
	return (
		<Box className="flex flex-row">
			<Typography className='text-customGray font-normal w-[13rem]'>{label}</Typography>
			<Typography className="text-commerceBlack text-[1rem]" >{value || '--'}</Typography>
		</Box>
	)
}

const AdressPanel = (props: IAddressPanelProps ) => {

	const { address, titleClass, title, hideTitle } = props;
	if (!address) return;

	return (
		<Box className="flex flex-col gap-4">
			{!hideTitle &&
				<IconTextLink textClass={titleClass} linkStyle={false} text={title} icon={<HomeOutlined />} />
			}
			<Box className="flex flex-col gap-1">
				{addressFieldBox("Name:", address?.name)}
				{addressFieldBox("Address:", address?.streetName)}
				{addressFieldBox("Additional street info:", address?.additionalStreetInfo)}
				{addressFieldBox("Apartment / Suite:", address?.apartment)}
				{addressFieldBox("City:", address?.city)}
				{addressFieldBox("Postal Code:", address?.postalCode)}
				{addressFieldBox("Region:", address?.region)}
				{addressFieldBox("State / Province:", address?.state)}
				{addressFieldBox("Country:", address?.country)}
				{addressFieldBox("Company Name:", address?.company)}
			</Box>
		</Box>
	)
}

export default AdressPanel; 