import { IFormFieldMapper, ITranslateFunc } from "types/global";


export const priceInformationForm = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("common.priceKey"),
        field: "priceKey",
        description: { text: translate("product.provideUniquePriceKeyToHelpIdentifyThePrice"), icon: "" },
        multiLocale: true,
        type: "text",
    },
    {
        title: translate("common.price"),
        field: "centAmount",
        className: "w-[90%]",
        selector: { className: "w-[5rem]", mode: 'number' },
        description: { text: translate("product.thisFieldSupportsHighPrecisionPrices"), icon: "" },
        multiLocale: true,
        type: "currency_selector",
        required: true,
    },
    {
        title: translate("product.discountedPrice"),
        field: "discountedPrice",
        description: { text: translate("product.thisFieldSupportsHighPrecisionPrices"), icon: "" },
        multiLocale: true,
        type: "text",
        disabled: true,
        placeholder: { text: translate("product.noProductDiscountAppliedForThisPrice") }
    },
]

export const priceConstraintSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("common.country"),
        field: "country",
        options: params.countriesOptions,
        placeholder: { text: "Not restricted to any country", className: "not-italic" },
        type: "select",
    },
    {
        title: translate("product.customerGroup"),
        field: "customerGroup",
        options: [],
        placeholder: { text: "Not restricted to any customer group", className: "not-italic" },
        type: "select",
    },
    {
        title: translate("common.channel"),
        field: "customerChannel",
        options: [],
        placeholder: { text: "Not restricted to any customer channel", className: "not-italic" },
        type: "select",
    },
]

export const priceTierSchema = (translate: ITranslateFunc, params?: any): IFormFieldMapper[] => [
    {
        title: translate("common.price"),
        field: `priceTier.${params.index}.price`,
        type: "text",
        prefix: params.prefix,
        required: true,
        wrapperClass: "w-[50%]"
    },
    {
        title: translate("common.minQuantity"),
        field: `priceTier.${params.index}.qty`,
        type: "number",
        required: true,
        wrapperClass: "w-[45%]"
    },
]