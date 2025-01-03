import { IFormFieldMapper, ITranslateFunc } from "types/global";

export const profileSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("common.firstName"),
        field: `firstName`,
        required: true,
        type: "text",
        wrapperClass: 'w-full'
    },
    {
        title: translate("common.lastName"),
        field: `lastName`,
        required: true,
        type: "text",
        wrapperClass: 'w-full'
    },
    {
        title: translate("common.email"),
        field: `email`,
        required: true,
        type: "text",
        disabled: true
    },
    {
        title: translate("account.businessRole"),
        field: `businessRole`,
        required: true,
        type: "select",
        options: []
    },
]