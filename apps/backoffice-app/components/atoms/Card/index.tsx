import { Card, CardContent, Typography, Box } from '@mui/material';
import { ICardProps, ICardTitleProps } from './type';
import React from 'react';

const CardComponent = (props: ICardProps) => {
	const { children, shadow } = props;

	return (
		<Card sx={{ boxShadow: shadow, p: 2 }}>
			<CardContent>
				{children}
			</CardContent>
		</Card>
	)
}

const CardTitle = (props: ICardTitleProps) => {
	const { text, children, className } = props;
	
	return (
		<Box className={className}>
			<Typography
				sx={{color: "#1A1A1A"}}
				className='font-inter font-semibold'
				variant="h1"
				component="div"
				fontSize={"1.5rem"}
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				lineHeight={"2.125rem"}
			>
				{text}
			</Typography>
			 {children && children}
		</Box>

	)
};

CardComponent.Title = CardTitle;

export default CardComponent;
