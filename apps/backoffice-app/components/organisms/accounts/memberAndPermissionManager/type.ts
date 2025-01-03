export interface IMemberAndPermissionManagerProps {
    teamId: string;
    organizationId: string;
    role?: "Super Admin" | 'Administrators' | "custom";
}