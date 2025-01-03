import * as React from 'react';
import { DataGrid,  DataGridProps } from '@mui/x-data-grid';
import { IDataTableProps } from './type';


const paginationModel = { page: 0, pageSize: 15 };

export default function DataTable(props: IDataTableProps) {
	const { rows, columns, initialState, padding, sx, ...otherProps } = props;

	return (
		<DataGrid
			rows={rows}
			columns={columns.map(column => ({
				...column,
				// headerClassName: 'font-inter custom-dataTable-header', 
			}))}
			initialState={{ pagination: { paginationModel } }}
			pageSizeOptions={[5, 10, 15]}
			className='font-inter'
			sx={{ 
				...sx,
				'& .MuiDataGrid-columnHeader': {
					textAlign: "center",
					background: "#f9f9fb",
					color: "#545978",
					fontSize: "0.75rem",
				},
				"& .MuiDataGrid-cell:focus": {
					outline: "none",
				},
				'& .MuiDataGrid-row:hover': {
					cursor: 'pointer',
				},
				'& .MuiDataGrid-cell': {
					padding: padding,
				},
			}}
			{...otherProps}
		/>
	);
}
