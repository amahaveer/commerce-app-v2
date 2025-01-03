import { IFormFieldMapper, ITranslateFunc } from "types/global";

export const projectSelectionSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("account.selectProject"),
        field: `project`,
        required: true,
        type: "select",
        options: []
    },
]