"use client"
import { GridColDef } from "@mui/x-data-grid";


export const variantColumns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'Variant ID',
		width: 160,
		flex: 1,
        renderCell: (params) => {
			return params.row.id
        },
	},
	{
		field: 'sku',
		headerName: 'SKU',
		flex: 1,
	},
	{
		field: 'key',
		headerName: 'Key',
		flex: 1,
	},
	{
		field: 'images',
		headerName: 'Images',
		flex: 1,
		renderCell: (params) => {
			const { row, field } = params;
			return params.row[field]?.length || "--"
        },
	},
	{
		field: 'prices',
		headerName: 'Pricing from',
		flex: 1,
		renderCell: (params) => {
			const { row, field } = params;
			const data = row[field]
			if (!data || !data.length) return "--"
			console.log("Data pricing====>", data)
			const centAmounts = data.map((price: any) => price.centAmount);
			const minCentAmount = Math.min(...centAmounts);
			const minDollarAmount = minCentAmount / 100;
			return minDollarAmount
        },
	},
	{
		field: 'inventory',
		headerName: 'Inventory: Quantity (Channel)',
		flex: 1,
	},
    {
		field: 'attributes',
		headerName: 'Attributes',
		flex: 1,
		renderCell: (params) => {
			const { row, field } = params;
			const data = row[field]
			return data?.length || 0;
        },
	},
];
