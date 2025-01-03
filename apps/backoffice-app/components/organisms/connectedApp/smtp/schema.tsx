import { IFormFieldMapper, ITranslateFunc } from "types/global";


export const smtpExtensionSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("projectConfig.host"),
        field: `host`,
        required: true,
        type: "text",
    },
    {
        title: translate("projectConfig.port"),
        field: `port`,
        required: true,
        type: "text",
    },
    {
        title: translate("projectConfig.encryption"),
        field: `encryption`,
        required: true,
        type: "text",
    },
    {
        title: translate("projectConfig.user"),
        field: `user`,
        required: true,
        type: "text",
    },
    {
        title: translate("projectConfig.password"),
        field: `password`,
        required: true,
        type: "text",
    },
    {
        title: translate("projectConfig.sender"),
        field: `sender`,
        required: true,
        type: "text",
    },
    {
        title: translate("projectConfig.clientHost"),
        field: `clientHost`,
        required: true,
        type: "text",
    },
]