import { IFormFieldMapper, ITranslateFunc } from "types/global";

export const getAddformSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("common.name"),
        field: `name`,
        required: true,
        type: "text",
        multiLocale: true,
    },
    {
        title: translate("common.price"),
        field: `price`,
        required: true,
        prefix: "EUR",
        type: "text",
    },
    {
        title: translate("common.quantity"),
        field: `quantity`,
        type: "number",
    },
    {
        title: translate("common.slug"),
        field: `slug`,
        required: true,
        type: "number",
    },
    {
        title: translate("product.taxCategory"),
        field: `select`,
        required: true,
        type: "select",
        options: [
            { value: "Standard Tax", label: "Standard Tax" }
        ]
    },
]