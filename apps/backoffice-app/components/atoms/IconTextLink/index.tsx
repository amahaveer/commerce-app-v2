import { Box, Typography } from '@mui/material';
import React from 'react';
import { IconTextLinkProps } from './type';
import { Language } from '@mui/icons-material';

const IconTextLink = (props: IconTextLinkProps) => {
	const { icon, text, textClass, wrapperClass, linkStyle=true, onClick } = props;
	
	const defaultColor =  linkStyle ? "text-primary-common" : "";

	return (
		<Box className={`flex ${defaultColor} items-center cursor-pointer ${wrapperClass}`} onClick={onClick}>
			{icon && icon}
			<Typography
				className={`hover:text-opacity-80 transition duration-200 ease-in-out ml-2 ${textClass}`}
				fontWeight={500}
			>
				{text}
			</Typography>
		</Box>
	);
};

IconTextLink.Language = (props: Omit<IconTextLinkProps, 'icon'>) => {
	return (
		<IconTextLink {...props} icon={<Language sx={{ fontSize: '14px', width: '14px', height: '14px' }} />}  />
	)
}

export default IconTextLink;