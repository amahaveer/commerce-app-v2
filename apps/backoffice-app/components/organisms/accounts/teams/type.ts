import { Dispatch, SetStateAction } from "react";

export interface IAddTeamProps {
    open: boolean;
    onSave: (orgName: string) => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
}