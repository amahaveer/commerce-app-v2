"use client"

import { Box } from '@mui/material';
import { useStepper } from 'context/stepper';


const AddNewProduct = () => {

	const { Component } = useStepper();

	return (
		<Box className="w-[100%] h-[67vh] overflow-y-auto">
			<Component/>
		</Box>
	)
}

export default AddNewProduct;