import { IConnectAppList } from "app/(dashboard)/account/organizations/[organizationId]/connect/type";

export interface IConnectedAppProps {
    organizationId: string;
    selectedApp: IConnectAppList
}