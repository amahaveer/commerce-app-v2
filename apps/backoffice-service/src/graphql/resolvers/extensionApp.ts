import ExtensionAppService from "@/services/extensionApp.service";


const service = new ExtensionAppService();

const ExtensionAppResolver = {

    Query: {
        getConfigByProjectKey: service.getConfiguarationByProjectKey,
        getConfigByOrganization: service.getConfigByOrganization,
        uninstallExtensionApp: service.uninstallExtensionApp
    },
    Mutation: {
        addExtensionApp: service.addNewConfiguaration
    }
}

export default ExtensionAppResolver;

