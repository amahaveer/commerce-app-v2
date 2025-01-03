import Chip from '@mui/material/Chip';
import { IChipProps } from './type';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';

const ChipComponent = (props: IChipProps) => {

	const { label, type = "none", color, bgColor, className, showDeleteIcon, onDelete } = props;

	const defaultValues: any = {
		success: { color: "#067446", background: "#dbfae6" },
		secondary: { color: "#545978", background: "#545978" },
		none: { color: color, background: bgColor }
	}

	return (
		<Chip
			className={`font-inter px-2 rounded-[20px] h-[24px] ${className}`}
			label={label}
			onDelete={onDelete}
			deleteIcon={
				showDeleteIcon ?
					<IconButton className="p-0  hover:bg-transparent " aria-label="Remove">
						<CloseOutlinedIcon className="text-hsl(243,100%,93%) text-[1rem] ml-4" />
					</IconButton> :
					<></>
			}
			sx={{
				...defaultValues[type],
				padding: "0px",
				'& .MuiChip-label': {
					padding: "0px",
				},

			}}
		/>
	)
}

export default ChipComponent;