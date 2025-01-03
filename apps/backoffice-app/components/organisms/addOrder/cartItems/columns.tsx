"use client"
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";
import { Box, Typography } from '@mui/material';
import SelectDropdown from "@/components/atoms/SelectDropdown";
import PrefixInputBase from "@/components/atoms/PrefixInputBase";
import CustomButton from "@/components/atoms/Button";

export const getLineItemColumns = (translate: ITranslateFunc, locale: string): GridColDef[] => [
    {
        field: 'item',
        headerName: 'Item',
        width: 260,
        renderCell: ({ row, field }) => {   
            const data = row[field];
            return (
                <Box className="flex flex-col">
                    <Typography className="text-[1rem] leading-[1.625rem] text-commerceBlack">{data.name}</Typography>
                    <Typography className="text-[0.875rem] text-customGray">{data.sku}</Typography>
                </Box>
            )
        },
    },
    {
        field: 'unitPrice',
		headerName: translate("common.unitPrice"),
        width: 260,
        renderCell: (params) => {
			return (
                <SelectDropdown
                    className="w-[15.125rem] h-[2.5rem]"
                    options={[]}
                />
            )
        },
    },
    {
        field: 'quantity',
		headerName: translate("common.quantity"),
        width: 160,
        flex: 1,
        renderCell: (params) => {
			return (
                <PrefixInputBase 
                    type="number" 
                    prefix={null} 
                />
            )
        },
    },
    {
        field: 'subtotal',
		headerName: translate("common.subtotal"),
        width: 160,
        flex: 1,
        renderCell: (params) => {
			return params.row.name;
        },
    },
    {
        field: 'action',
		headerName: '',
        width: 110,
        renderCell: () => {
			return (
                <CustomButton 
                    className="w-[3.69rem] h-[2.5rem] bg-primary-common text-white" 
                    title={translate("common.add")}  
                />
            )
        },
    },
]