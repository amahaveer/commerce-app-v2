"use client"
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";
import { Box, Typography } from '@mui/material';

export const getProductReviewColumns = (translate: ITranslateFunc): GridColDef[] => [
    {
        field: 'item',
        headerName: 'Item',
        width: 160,
        flex: 1,
        renderCell: () => {
            return (
                <Box className="flex flex-col">
                    <Typography className="text-[1rem] leading-[1.625rem] text-commerceBlack">Dummy Product</Typography>
                    <Typography className="text-[0.875rem]  text-customGray">SKU: op-red</Typography>
                </Box>
            )
        },
    },
    {
        field: 'originalUnitPrice',
        headerName: translate("common.originalUnitPrice"),
        width: 160,
        flex: 1,
        renderCell: () => {
            return "$18.69"
        },
    },
    {
        field: 'unitPrice',
        headerName:  translate("common.unitPrice"),
        width: 160,
        flex: 1,
        renderCell: () => {
            return "$18.69"
        },
    },
    {
        field: 'quantity',
        headerName: translate("common.qty"),
        width: 160,
        flex: 1,
        renderCell: () => {
            return "1"
        },
    },
    {
        field: 'subtotal',
        headerName: translate("common.subtotal"),
        width: 160,
        flex: 1,
        renderCell: () => {
            return "$18.69"
        },
    },
    {
        field: 'tax',
        headerName: translate("common.tax"),
        width: 160,
        flex: 1,
        renderCell: () => {
            return "$18.69"
        },
    },
]