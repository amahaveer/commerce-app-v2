"use client"
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";
import { formatDateTime } from "utils";


export const getOrganizationListColumns = (translate: ITranslateFunc, payload: any={}): GridColDef[] => [
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
        field: 'teamsAndPermission',
        headerName: 'Teams and permissions',
        width: 60,
        flex: 1,
        renderCell: ({row}) => {
            return `${row.noOfTeams} Team`
        },
    },
    {
        field: 'createdAt',
        headerName: 'Date created',
        width: 60,
        flex: 1,
        renderCell: ({row, field}) => {
            return formatDateTime(row[field])
        },
    },
    {
        field: 'updatedAt',
        headerName: 'Date change',
        width: 60,
        flex: 1,
        renderCell: ({row, field}) => {
            return formatDateTime(row[field])
        },
    }
]