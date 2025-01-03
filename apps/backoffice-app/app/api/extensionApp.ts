import { ADD_EXTENSION_APP, GET_EXTENSION_CONFIG_BY_ORG, UNINSTALL_EXTENSION_APP } from "./graphql/extensionApp.schema";
import client from './apolloClient';
import { IAddExtensionApp } from "@/shared-types/extensionApp";
import { toast } from "react-toastify";


export const installExtensionApp = async (body: IAddExtensionApp) => {
	try {
		const result = await client.mutate({
			mutation: ADD_EXTENSION_APP,
			variables: { body },
		});

		return result.data.addExtensionApp;
	} catch (error: any) {
        toast.error(error.message)
		console.error("Error installing ExtensionApp:", error);
		return null;
	}
};

export const getExtensionConfigByOrganization = async (organizationId: string) => {
	try {
		const result = await client.mutate({
			mutation: GET_EXTENSION_CONFIG_BY_ORG,
			variables: { organizationId },
			fetchPolicy: "network-only"
		});

		return result.data.getConfigByOrganization;
	} catch (error) {
		return [];
	}
}

export const uninstallExtensionApp = async (extensionAppId: string) => {
	try {
		const result = await client.query({
			query: UNINSTALL_EXTENSION_APP,
			variables: { appId: extensionAppId },
			fetchPolicy: "network-only"
		});
		toast.success(result.data.uninstallExtensionApp);
	} catch (error: any) {
		toast.error(error.message)
		return "Something went wrong!"
	}
} 