import { IFormFieldMapper, ITranslateFunc } from "types/global";

export const generalProductSelectSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
    {
        title: translate("product.productSelectionName"),
        field: "productSelectionName",
        description: { text: "", icon: "" },
        multiLocale: true,
        required: true,
        type: "text",
    }, {
        title: translate("product.productSelectionKey"),
        field: "productSelectionKey",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: false,
        type: "text",
    }, {
        title: translate("product.productSelectionType"),
        field: "productSelectionType",
        info: translate("common.fieldWarning"),
        multiLocale: false,
        required: true,
        type: "radio",
        options: [
            { value: "Track only", label: translate("common.inclusion"), className: "text-green-600 bg-green-200 px-2", description: translate("product.availableWhenActive") },
            { value: "None", label: translate("common.exclusion"), className: "text-red-600 bg-red-200 px-2", description: translate("product.discardWhenActive") },
        ]
    },
]