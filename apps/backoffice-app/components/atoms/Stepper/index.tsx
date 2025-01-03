import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useStepper } from 'context/stepper';
import { Divider, Typography, Box } from "@mui/material";

export default function StepperComponent(props: any) {
	const { children, title } = props;
	const { activeStep, stepList, disableNextBtn, setActiveStep }: any = useStepper();

	return (
		<Box className="flex flex-col font-inter">
			<Box className="pt-2">
				<Typography className='text-[1.5rem] font-semibold leading-[2.25rem] text-[#1a1a1a] pl-7'>{title}</Typography>
			</Box>
			<Box className="stepper-listing">
				<Stepper activeStep={activeStep} sx={{ padding: "20px" }} >
					{stepList.map((item: any) => {
						const stepProps: { completed?: boolean } = {};
						const labelProps: {
							optional?: React.ReactNode;
						} = {};

						return (
							<Step  key={item.label} {...stepProps}>
								<StepLabel {...labelProps}>{item.label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
			</Box>

			<Divider />
			<Box className="stepper-content">
				{children}
			</Box>
		</Box>
	);
}
