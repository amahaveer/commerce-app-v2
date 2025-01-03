import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ICheckboxProps } from './type';

export default function CheckboxComponent(props: ICheckboxProps) {
	
	const { options } = props;
	
	return (
		<FormGroup >
			{options.map((item, index) => (
				<FormControlLabel  key={index} control={<Checkbox />} label={item.label} />
			))}
		</FormGroup>
	);
}
