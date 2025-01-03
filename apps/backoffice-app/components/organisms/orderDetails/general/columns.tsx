"use client"
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";
import { formatCurrency } from "utils";

export const orderItemColumns = (translate: ITranslateFunc, locale: string): GridColDef[] => [
    {
        field: 'product',
		headerName: 'Product',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
			return row.name[locale];
        },
    },
    {
        field: 'inventory',
		headerName: 'Inventory entry',
        width: 160,
        flex: 1,
    },
    {
        field: 'price',
		headerName: 'Unit price',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
			return formatCurrency(row.price.value);
        },
    },
    {
        field: 'quantity',
		headerName: 'Qty',
        flex: 1,
    },
    {
        field: 'Subtotal',
		headerName: 'Subtotal',
        flex: 1,
    },
]