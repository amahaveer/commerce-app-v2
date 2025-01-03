"use client"
import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from '@mui/material';
import SelectDropdown from "@/components/atoms/SelectDropdown";
import { getPaymentStateOptions, getShipmentStateOptions } from "utils/order";
import { ITranslateFunc } from "types/global";
import IconTextLink from "@/components/atoms/IconTextLink";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export const getOrderReturnListColumns = (translate: ITranslateFunc, payload: any={}): GridColDef[] => [
    {
        field: 'no',
        headerName: '',
        width: 60,
        renderCell: (params) => {
            return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
        },
    },
    {
        field: 'item',
        headerName: 'Item',
        width: 160,
        flex: 1,
        renderCell: ({ row, field }) => {
            return (
                <Box className="flex flex-col">
                    <Typography className="text-[1rem] leading-[1.625rem] text-commerceBlack">Dummy Product</Typography>
                    <Typography className="text-[0.875rem]  text-customGray">SKU: op-red</Typography>
                </Box>
            )
        },
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 160,
        flex: 1,
    },
    {
        field: 'comment',
        headerName: 'Comment',
        width: 160,
        flex: 1,
        renderCell: ({ row, field }) => {
            const value = row[field]
            return (
                <Typography className="text-wrap text-[1rem] leading-[1.625rem] text-customGray">{value}</Typography>
            )
        },
    },
    {
        field: 'shipmentState',
        headerName: 'Shipment state',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
            const value = row.shipmentState;
            const options = getShipmentStateOptions(translate);
            return (
                <Box className="pt-1">
                    <SelectDropdown
                        options={options}
                        defaultValue={value}
                    />
                </Box>
            )
        },
    },
    {
        field: 'paymentState',
        headerName: 'Payment state',
        width: 160,
        flex: 1,
        renderCell: ({ row }) => {
            const value = row.paymentState;
            const options = getPaymentStateOptions(translate);
            return (
                <Box className="pt-1">
                    <SelectDropdown
                        options={options}
                        defaultValue={value}
                    />
                </Box>
            )
        },
    },
    {
        field: 'itemDetails',
        headerName: 'Item details',
        width: 160,
        flex: 1,
        renderCell: ({ api, id, row }) => {
            const index= api.getRowIndexRelativeToVisibleRows(id) + 1;
            return (
                <IconTextLink
                    onClick={() => payload.onClickItemDetails(row, index)}
                    textClass="text-customBlue-periwinkle text-[0.875rem] font-medium" 
                    text={translate("orders.openItemDetails")} 
                    icon={<VisibilityOutlinedIcon className="text-customBlue-periwinkle w-4 h-4"/>} 
                />
            )
        }
    },
]