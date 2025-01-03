"use client"
import CustomButton from "@/components/atoms/Button";
import { GridColDef } from "@mui/x-data-grid";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';


export const getProductTypeColumns = (colParams: any): GridColDef[] => [
	{
		field: 'action',
		headerName: '',
		width: 120,
		renderCell: (params) => {
			const { id } = params;
			const { onSelectProductType, selectedType } = colParams;
			const isSelected = selectedType === id;

			return (
				<CustomButton
					onClick={() => onSelectProductType(id)}
					className={`${isSelected && 'bg-customBlue-moderate'} w-[4.713rem] px-4 py-2 rounded-md `}
					icon={
						isSelected && (
							<CheckOutlinedIcon className="text-white ml-2" /> // MUI Check Icon
						) 
					}
					title={!isSelected ? "Select" : ""}
				/>
			)
		}
	},
	{
		field: 'name',
		headerName: 'Product type name',
		width: 160,
		flex: 1,
		renderCell: (params) => {
			return params.row.name
		}
	},
	{
		field: 'description',
		headerName: 'Description',
		flex: 1,
		renderCell: (params) => {
			return params.row.description
		}
	},

	{
		field: 'productkey',
		headerName: 'Key',
		flex: 1,
		renderCell: (params) => {
			return params.row.key
		}
	},
	{
		field: 'attributes',
		headerName: 'Attributes',
		flex: 1,
		renderCell: (params: any) => {
			const { row } = params;
			const value = row.attributes.length;
			return value
		}
	},
];
