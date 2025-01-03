"use client"
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";

export const getTeamsColumns = (translate: ITranslateFunc, payload: any={}): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Name',
        width: 60,
        flex: 1,
    },
    {
        field: 'teamMembers',
        headerName: 'Members',
        width: 60,
        flex: 1,
        renderCell: ({row, field}) => {
            return `${row[field].length} member`
        },
    },
]