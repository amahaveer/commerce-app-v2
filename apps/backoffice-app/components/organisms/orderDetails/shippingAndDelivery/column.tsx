"use client"
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";
import { formatDateTime } from "utils";

export const getDeliveriesColumns = (translate: ITranslateFunc): GridColDef[] => [
    {
        field: 'no',
		headerName: 'No.',
        width: 160,
        flex: 1,
        renderCell: (params) => {
            return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
        },
    },
    {
        field: 'createdAt',
		headerName: 'Date',
        width: 160,
        flex: 1,
        renderCell: ({ row, field }) => {
			return formatDateTime(row[field]);
        },
    },
    {
        field: 'parcels',
		headerName: 'No. of parcels',
        width: 160,
        flex: 1,
        renderCell: ({ row, field }) => {
			return row[field]?.length
        },
    },
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
		headerName: 'Qty',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
			return row.items.length;
        },
    },
]