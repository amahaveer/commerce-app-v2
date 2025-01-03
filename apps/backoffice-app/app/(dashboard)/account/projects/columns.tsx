"use client"
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";
import { formatDateTime } from "utils";


export const getProjectColumns = (translate: ITranslateFunc, payload: any={}): GridColDef[] => [
    {
        field: 'no',
        headerName: '',
        width: 60,
        renderCell: (params) => {
            return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
        },
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 60,
        flex: 1,
    },
    {
        field: 'key',
        headerName: 'Key',
        width: 60,
        flex: 1,
    },
    {
        field: 'inProduction',
        headerName: 'In production',
        width: 60,
        flex: 1,
    },
    {
        field: 'organization',
        headerName: 'Organization',
        width: 60,
        flex: 1,
        renderCell: ({row}) => {
            return row.organization?.name;
        },
    },
    {
        field: 'Date created',
        headerName: 'Date created',
        width: 60,
        flex: 1,
        renderCell: ({row}) => {
            return formatDateTime(row.createdAt);
        },
    },
]