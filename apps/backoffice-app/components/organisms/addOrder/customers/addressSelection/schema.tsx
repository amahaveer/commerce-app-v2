
import { IFormFieldMapper, ITranslateFunc } from "types/global";


export const getAddressEditSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("orders.inventoryTracking"),
        field: params.field,
        required: true,
        type: "radio",
        description: { text: translate("orders.inventoryTrackingRequiredTrackingOptions") },
        className: "font-semibold text-[1rem] text-commerceBlack w-auto",
        options: params.options
    },
]

export const getAddressFormSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("common.firstName"),
        field: `firstName`,
        type: "text",
        wrapperClass:'w-[50%]',
        disabled: params.disabled,
    },
    {
        title: translate("common.lastName"),
        field: `lastName`,
        type: "text",
        wrapperClass:'w-[50%]',
        disabled: params.disabled,
    },
    {
        title: translate("common.phone"),
        field: `phone`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("common.email"),
        field: `email`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("common.companyName"),
        field: `companyName`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("customers.streetName"),
        field: `streetName`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("common.houseNumber"),
        field: `houseNumber`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("common.apartmentSuite"),
        field: `Apartment / Suite`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("customers.city"),
        field: `city`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("customers.postalCode"),
        field: `postalCode`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("customers.region"),
        field: `region`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("common.state"),
        field: `state`,
        type: "text",
        disabled: params.disabled,
    },
    {
        title: translate("common.country"),
        field: `country`,
        type: "select",
        disabled: true,
        options: []
    },
]