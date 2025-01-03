import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../../atoms/Button';
import { useAppContext } from 'context/application.context';


const EditFilterComponent = (props: any) => {

	const { filterList, setFilterList } = props;
	const { setEditFilter } = useAppContext();

	const onRemove = (index: number) => {
		const updatedFilterList = [
			...filterList.slice(0, index), 
			...filterList.slice(index + 1)
		];
		setFilterList(updatedFilterList);
	}

	return (
		<Box className="flex flex-col">
			{filterList.map((item: any, index: number) => (
				<Box key={index} className="flex items-center p-5 border-b">
					<Typography className="font-semibold text-base w-[80%]">{item.label}</Typography>
					<Tooltip title="Remove entire filter">
						<IconButton onClick={() => onRemove(index)} aria-label="Delete filter">
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Box>
			))}
			<Box className="flex justify-end mt-5 p-4">
				<CustomButton title='Cancel' className='normal-case ml-auto font-gray' onClick={() => setEditFilter(false)}  />
			</Box>
		</Box>
	)
}

export default EditFilterComponent;