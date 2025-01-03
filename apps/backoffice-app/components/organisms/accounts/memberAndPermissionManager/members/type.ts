import { Dispatch, SetStateAction } from "react";

export interface IInviteMemberProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onSave: (email: string) => void;
    members: Array<any>
}