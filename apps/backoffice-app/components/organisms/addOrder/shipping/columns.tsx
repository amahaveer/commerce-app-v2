"use client"
import RadioButtonsGroup from "@/components/atoms/RadioGroup";
import { GridColDef } from "@mui/x-data-grid";
import { ITranslateFunc } from "types/global";

export const getShippingMethodColumns = (translate: ITranslateFunc): GridColDef[] => [
    {
        field: 'radio',
        headerName: '',
        width: 80,
        renderCell: ({row}) => {
            return (
                <RadioButtonsGroup
                    wrapperClass="mt-2"
                    options={[{ value: row.id, label: " " }]}
                />
            )
        }
    },
    {
        field: 'name',
        headerName: translate("common.name"),
        width: 260,
    },
    {
        field: 'shippingRate',
		headerName: translate("orders.shippingRate"),
        width: 160,
        flex: 1,
    },
    {
        field: 'taxCategory',
		headerName: translate("product.taxCategory"),
        width: 160,
        flex: 1,
    },
    {
        field: 'freeAbove',
		headerName: translate("common.freeAbove"),
        width: 160,
        flex: 1,
    },
    {
        field: 'default',
		headerName: translate("common.default"),
        width: 160,
        flex: 1,
    },
    {
        field: 'description',
		headerName: translate("common.description"),
        width: 160,
        flex: 1,
    },
]