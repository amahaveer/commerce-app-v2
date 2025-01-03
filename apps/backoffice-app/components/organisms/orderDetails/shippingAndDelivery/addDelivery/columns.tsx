"use client"
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";

export const getAddDeliveriesColumns = (translate: ITranslateFunc): GridColDef[] => [
    {
        field: 'items',
		headerName: 'Items',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
			return "";
        },
    },
    {
        field: 'qty',
		headerName: 'Quantity',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
			return row.items.length;
        },
    },
    {
        field: 'qtyIn',
		headerName: 'Quantity in previous deliveries',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
			return row.items.length;
        },
    },
    {
        field: 'qtyIn1',
		headerName: 'Quantity for delivery',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
			return row.items.length;
        },
    },
    
]