"use client"
import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from '@mui/material';
import PrefixInputBase from "@/components/atoms/PrefixInputBase";

export const getAddOrderReturnColumns = (): GridColDef[] => [
    {
        field: 'product',
        headerName: 'Product',
        width: 160,
        flex: 1,
        renderCell: ({ row, field }) => {
            const data = row[field];
            return (
                <Box className="flex flex-col">
                    <Typography className="text-[1rem] leading-[1.625rem] text-commerceBlack">{data.name}</Typography>
                    <Typography className="text-[0.875rem]  text-customGray">sku: {data.sku}</Typography>
                </Box>
            )
        },
    },
    {
        field: 'quantity',
        headerName: 'Ordered quantity',
        width: 160,
        flex: 1,
    },
    {
        field: 'quantityPreviousReturn',
        headerName: 'Quantity in previous returns',
        width: 160,
        flex: 1,
    },
    // {
    //     field: 'returnQuantity',
    //     headerName: 'Return quantity',
    //     width: 160,
    //     flex: 1,
    //     renderCell: (params) => {
    //         return params.row.name;
    //     },
    // },
    {
        field: 'comment',
        headerName: `Return quantity Comment`,
        width: 510,
        renderCell: ({ row, field }) => {
            const value = row[field];
            return (
                <Box className="flex flex-row gap-1">
                    <PrefixInputBase 
                        type="number"
                        prefix={null}
                        wrapperClass="w-[6.3rem]"
                    />
                    <PrefixInputBase
                        value={value}
                        wrapperClass="w-[18.375rem]"
                        prefix={null}
                    />
                </Box>
            )
        },
    }
]