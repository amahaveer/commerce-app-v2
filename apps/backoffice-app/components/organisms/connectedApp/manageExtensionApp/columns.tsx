"use client"
import { GridColDef } from "@mui/x-data-grid";
import { Box, TextField, Typography } from '@mui/material';
import { formatDateTime } from "utils";
import CustomButton from "@/components/atoms/Button";
import ChipComponent from "@/components/atoms/Chip";

export const getManageConnectorColumns = (payload:any={}): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Connector',
        width: 160,
        flex: 1,
    },
    {
        field: 'project.name',
        headerName: 'Project name',
        width: 160,
        flex: 1,
        renderCell: ({row}) => {
            return row.project.name
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
        flex: 1,
        renderCell: ({}) => {
            return (
                <ChipComponent
                    label="Installed"
                    type="success"
                />
            )
        }
    },
    {
        field: 'createdAt',
        headerName: 'Date installed',
        width: 160,
        flex: 1,
        renderCell: ({ row, field }) => {
            return formatDateTime(row.createdAt)
        },
    },
    {
        field: '',
        headerName: 'Action',
        width: 160,
        flex: 1,
        renderCell: ({row}) => {
            return (
                <CustomButton
                    title="Uninstall"
                    onClick={() => payload.onUninstall(row)}
                />
            )
        }
    },
]