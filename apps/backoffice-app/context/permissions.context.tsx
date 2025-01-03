"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { getPermissionByProjectAndOrgId, getPermissions } from "app/api/permissions.api";
import { IExposePermissions, IPermissionsContextProps } from "types/permissions.type";
import { useAppContext } from "./application.context";

const PermissionContext = createContext<IExposePermissions>({
    permissions: [],
    hasPermission: () => false
});

export const PermissionsProvider = ({ children, moduleName }: IPermissionsContextProps) => {
    
    const { selectedProject, projectList } = useAppContext();
    const [permissions, setPermissions] = useState<Array<string>>([]);

    useEffect(() => {
        if (!selectedProject) return;

        const fetchPermissions = async () => {
            const project = projectList.find((item) => item.name === selectedProject)
            if (!project) return;
            const data = await getPermissionByProjectAndOrgId(project._id, project.organization._id);
            setPermissions(data[moduleName]);
        };
        fetchPermissions();
    }, [selectedProject]);

    const hasPermission = (permissionKey: string) => {
        if (!permissions) return false;
        return permissions.includes(permissionKey);
    }

    const expose: IExposePermissions = {
        permissions,
        hasPermission
    }

    return (
        <PermissionContext.Provider value={expose}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermissions = () => {
    return useContext(PermissionContext);
};