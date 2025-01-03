import { IFormFieldMapper, ITranslateFunc } from "types/global";

export const createUserSchema = (params: any={}): IFormFieldMapper[] => [
    {
        title: "First name",
        field: `firstName`,
        required: true,
        type: "text",
        wrapperClass: 'w-full'
    },
    {
        title: "Last name",
        field: `lastName`,
        required: true,
        type: "text",
        wrapperClass: 'w-full'
    },
    {
        title: "Email",
        field: `email`,
        required: true,
        type: "text",
        disabled: true
    },
    {
        title: "Password",
        field: `password`,
        required: true,
        type: "text",
    },
    {
        title: "Confirm password",
        field: `confirmPassword`,
        required: true,
        type: "text",
    },
]