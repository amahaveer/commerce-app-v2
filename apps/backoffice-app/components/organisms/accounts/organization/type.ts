import { Dispatch, SetStateAction } from "react";

export interface IAddOrganizationProps {
    open: boolean;
    onSave: (orgName: string) => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
}