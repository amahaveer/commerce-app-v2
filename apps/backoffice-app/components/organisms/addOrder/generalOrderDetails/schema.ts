import { IFormFieldMapper, ITranslateFunc } from "types/global";

export const generalformSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("common.store"),
        field: `store`,
        required: true,
        type: "auto_complete",
        options: [],
        placeholder: { text: translate("common.selectOrTypeStorekey") }
    },
    {
        title: translate("common.currency"),
        field: `Currency`,
        required: true,
        type: "select",
        placeholder: { text: `${translate("common.select")}...`, className: "not-italic" }
    },    
    {
        title: translate("orders.inventoryTracking"),
        field: `inventory `,
        required: true,
        type: "radio",
        description: { text: translate("orders.inventoryTrackingRequiredTrackingOptions") },
        className: "font-semibold text-[1rem] text-commerceBlack w-auto",
        options: [
            { value: "None", label: translate("common.none"), description: translate("orders.noInventoryTracking") },
            { value: "Track only", label: translate("orders.trackOnly"), description: translate("orders.ordersAreTrackedOnInventory") },
            { value: "Reserve on order", label: translate("orders.reserveOnOrder"), description: translate("orders.orderTrackingOnInventoryInfo") },
        ]
    },
    
]