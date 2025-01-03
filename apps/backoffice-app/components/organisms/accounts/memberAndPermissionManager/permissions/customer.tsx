import { Box, Checkbox, IconButton, Tooltip, Typography } from '@mui/material';
import {  InfoIcon, } from 'lucide-react';
import { customerPermissionFields,  } from './def';
import AccordianUnControlled from '@/components/atoms/Accordian';

interface IPropType {
	projectPermissions: string[]
	selectedPermissions: string[];
	setSelectedPermissions: (data: any) => void;
}
interface IPermissionField {
	value: string;
	label: 'view' | 'edit' | 'add'
}

const CustomerPermissions = (props: IPropType) => {

	const { selectedPermissions, setSelectedPermissions } = props;

	const isChecked = (permission: any): boolean => {
		if (selectedPermissions.includes(permission.value)) return true;
		return false;
	}

	const onChangePermission = (isChecked: boolean, current: IPermissionField, currentList: IPermissionField[]) => {
		const value = current.value;
		const autoSelectValues: Array<string> = [];
		const allValues: any = currentList.map((item) => item.value)

		if (isChecked && current.label === 'edit') {
			const viewValue: any = currentList.find((item) => item.label === 'view')
			autoSelectValues.push(viewValue?.value)
		}

		setSelectedPermissions((prevPermissions: any) => {
			if (isChecked && !prevPermissions.includes(value)) {
				return [...prevPermissions, value, ...autoSelectValues];

			} else if (!isChecked && current.label === 'view') {
				return prevPermissions.filter((permission: string) => !allValues.includes(permission));

			} else {
				return prevPermissions.filter((permission: string) => permission !== value);
			}
		});
	}

	return (
		<AccordianUnControlled title={"customers.customer"} className='border-0' labelClass='text-[1.25rem]'>
			<Box className="grid gap-0 px-6" sx={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
				{customerPermissionFields.map((item: any, index) => (
					<Box key={index} className="flex flex-row items-center gap-0">
						<Box className="flex flex-row items-center w-[14rem] ">
							{item.tooltip &&
								<Tooltip title={item.tooltip} placement='top'>
									<IconButton><InfoIcon className='w-4 h-4' /></IconButton>
								</Tooltip>
							}
							<Typography className='text-customGray font-medium'>{item.label}</Typography>
						</Box>
                        <Box className="flex flex-row gap-3 items-center">
						{item.permission.map((permission: any, index2: number) => (
							<Box key={`${index}${index2}`} className="flex flex-row items-center">
								<Checkbox
									size='small'
									checked={isChecked(permission)}
									onChange={(e) => onChangePermission(e.target.checked, permission, item.permission)}
								/>
								<Typography>{permission.label}</Typography>
							</Box>
						))}
                        </Box>
					</Box>
				))}
			</Box>
		</AccordianUnControlled>
	)
}

export default CustomerPermissions;