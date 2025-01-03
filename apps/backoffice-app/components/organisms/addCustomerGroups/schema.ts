import { IFormFieldMapper, ITranslateFunc } from "types/global";



export const customerGroupGeneralSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
     {
        title: translate("customers.customerGroupName"),
        field: "customerGroupName",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: true,
        type: "text",
    },
    {
        title: translate("common.key"),
        field: "customerGroupKey",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: false,
        type: "text",
    },
]

export const CustomFieldsSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
        
]

// customer password and confirm password
export const customerSecuritySchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
    {
        title: translate("common.customerPassword"),
        field: "customerPassword",
        info: translate("customers.passwordInfo"),
        description: { text: "", icon: "" },
        multiLocale: false,
        required: true,
        type: "password",
    },
    {
        title: translate("common.confirmPassword"),
        field: "confirmPassword",
        description: { text: "", icon: "" },
        multiLocale: false,
        required: true,
        type: "password",
    },
]



    