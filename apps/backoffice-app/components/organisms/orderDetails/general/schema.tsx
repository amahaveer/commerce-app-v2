import { eOrderPermissions } from "@/shared-types/permissions/orderPermissions.type";
import { IFormFieldMapper, IFormSchemaParams, ITranslateFunc } from "types/global";
import { getOrderStatusOptions, getPaymentStatusOptions, getShipmentStatusOptions } from "utils/order";

export const generalformSchema = (translate: ITranslateFunc, params: IFormSchemaParams): IFormFieldMapper[] => [
    {
        title: translate("orders.orderWorkflowStatus"),
        field: "orderWorkflowStatus",
        type: "select",
        options: [],
        disabled: !params.hasPermission(eOrderPermissions.EDIT_GENERAL_INFO),
    },
    {
        title: translate("orders.orderStatus"),
        field: "orderState",
        options: getOrderStatusOptions(translate),
        type: "select",
        onChange: params.onChange,
        disabled: !params.hasPermission(eOrderPermissions.EDIT_GENERAL_INFO),
    },
    {
        title: translate("orders.paymentStatus"),
        field: "paymentState",
        options: getPaymentStatusOptions(translate),
        type: "select",
        onChange: params.onChange,
        disabled: !params.hasPermission(eOrderPermissions.EDIT_GENERAL_INFO),
    },
    {
        title: translate("orders.shipmentStatus"),
        field: "shipmentState",
        options: getShipmentStatusOptions(translate),
        type: "select",
        onChange: params.onChange,
        disabled: !params.hasPermission(eOrderPermissions.EDIT_GENERAL_INFO),
    },
]
