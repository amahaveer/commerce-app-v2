import { IFormFieldMapper, ITranslateFunc } from "types/global";



export const generalAndAttributesForm = (translate: ITranslateFunc): IFormFieldMapper[] => [
    {
        title: translate("common.sku"),
        field: "sku",
        multiLocale: false,
        type: "text",
        disabled: true
    },
    {
        title: translate("product.variantKey"),
        field: "key",
        multiLocale: false,
        type: "text",
    },
]