import { Dispatch, SetStateAction } from "react";

export interface IfinalScreenProp {
    projectName: string;
    setSelectedOrganization: (org: any) => void;
    setProjectName: Dispatch<SetStateAction<string>>
}

export interface IAddProjectProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onCreateProject: (projectName: string, orgId: any) => void;
}