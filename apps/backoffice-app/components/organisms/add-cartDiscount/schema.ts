import { IFormFieldMapper, ITranslateFunc } from "types/global";

export const generaCartDiscountSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
    {
        title: translate("common.cartDiscountName"),
        field: "cartDiscountName",
        description: { text: "", icon: "" },
        multiLocale: true,
        required: true,
        type: "text",
    }, {
        title: translate("common.cartDiscountDesc"),
        field: "cartDiscountDesc",
        description: { text: "", icon: "" },
        multiLocale: true,
        required: false,
        type: "text",
    }, {
        title: translate("common.cartDiscountKey"),
        field: "cartDiscountKey",
        info: translate("common.fieldWarning"),
        multiLocale: false,
        required: true,
        type: "text",
    }, {
        title: translate("common.store"),
        field: "store",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: false,
        type: "text",
    }, {
        title: translate("common.rank"),
        field: "rank",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: true,
        type: "number",
    }, {
        title: translate("common.discountCode"),
        field: "discountCode",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: false,
        type: "text",
    }, {
        title: translate("common.discountCode"),
        field: "discountCode",
        multiLocale: false,
        required: true,
        type: "radio",
        options: [
            { value: "Required", label: translate("common.required"), },
            { value: "Not required", label: translate("common.notRequired"), },
        ]
    }, {
        title: translate("common.validFrom"),
        field: "validFrom",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: false,
        type: "text",
    },
    {
        title: translate("common.validUntil"),
        field: "validUntil",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: false,
        type: "text",
    },
]

export const percentageOffSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
    {
        title: translate("common.discountValue"),
        field: "cartDiscountName",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: true,
        type: "number",
    }
]

export const amountOffSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
    {
        title: translate("common.discountValue"),
        field: "cartDiscountName",
        description: { text: "", icon: "" },
        multiLocale: true,
        required: true,
        type: "text",
    }
]

export const fixedPriceSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
    {
        title: translate("common.discountValue"),
        field: "cartDiscountName",
        description: { text: "This field supports high precision prices", icon: "" },
        multiLocale: true,
        required: true,
        type: "text",
    }
]
