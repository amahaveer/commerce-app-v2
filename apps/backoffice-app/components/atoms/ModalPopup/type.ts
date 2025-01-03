import { Dispatch, SetStateAction } from "react";

export interface ICustomModal {
    open: boolean;
    children: React.ReactNode;
    title: string;
    submitBtn?: { onClick: () => void, label: string }
    cancelBtn?: boolean;
    backBtn?: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onClickBack?: () => void;
}