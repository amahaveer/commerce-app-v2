import ExtensionAppModel from '@/models/extensionApp.model';
import ProjectsModel from '@/models/projects.model';
import { IAddExtensionApp } from "@royalcyber/global-types/src/backoffice-types/extensionApp"
import RedisService from './redis.service';

class ExtensionAppService {

    service = new RedisService();

    addNewConfiguaration = async (_: any, data: { body: IAddExtensionApp }, context) => {
        try {
            const { key, configuaration, organization, project, name } = data.body;
            
            // const extensionPromise = ExtensionAppModel.create(data.body);
            const extensionPromise =  ExtensionAppModel.findOneAndUpdate(
                { key, organization, project }, 
                { configuaration, name }, 
                { upsert: true, new: true }
            );
            const projectPromise = ProjectsModel.findOne({ _id: project });

            const [result, projectData] = await Promise.all([extensionPromise, projectPromise]);
            this.service.updateProjectConfig(configuaration, projectData.key, key);
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }

    getConfiguarationByProjectKey = async (_: any, data: { projectKey }, context) => {
        try {
            const project = await ProjectsModel.findOne({ key: data.projectKey });
            
            if (!project) {
                throw new Error("Project Key doen't exist!")
            }

            const result = await ExtensionAppModel.find({ project: project._id });
            if (!result.length) {
                throw new Error("Extension app doesn't exist!")
            }
            
            const mappedData: any = result.reduce((prev, item) => {
                prev[item.key] = item.configuaration;
                this.service.updateProjectConfig(item.configuaration, project.key, item.key);
                return prev;
            }, {})

            return mappedData;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getConfigByOrganization(_: any, data: { organizationId }, context) {
        try {
            const result = await ExtensionAppModel.find({ organization: data.organizationId }).populate("project");
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }

    async uninstallExtensionApp(_: any, data: { appId }, context) {
        try {
            await ExtensionAppModel.deleteOne({ _id: data.appId });
            return "Uninstalled Successfully!"
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ExtensionAppService;
