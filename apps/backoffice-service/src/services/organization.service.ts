import OrganizationModel from "../models/organization.model";
import { eModulesName, eRoles } from "../types/common.types";
import { ICreateOrganization } from "../types/organization.type";
import { eProductPermissions } from '@royalcyber/global-types/src/backoffice-types/permissions/productPermissions.type';
import { eOrderPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/orderPermissions.type"
import Utils from "@/utils";
import ProjectsModel from "@/models/projects.model";
import PermissionModel from "@/models/permission.model";
import TeamModel from "@/models/team.model";
import TeamMembersModel from "@/models/teamMembers.model";
import { teamCountLoader } from "@/graphql/dataLoader/team";
import { permissionCountLoader } from "@/graphql/dataLoader/permission";

class OrganizationService {

	async createOrganization(_: any, data: { body: ICreateOrganization }, context) {
		try {
			const user = context.user;
			const { name, projectName } = data.body

			/* Create Organization */
			const organizationExist = await OrganizationModel.exists({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
			if (organizationExist) {
				throw new Error("Organization already exist")
			}
			const organization = await OrganizationModel.create({ name });
			/* Create Project Payload */
			// const projectPayload = {
			// 	name: projectName,
			// 	key: Utils.toSlug(projectName),
			// 	organization: organization._id
			// }
			// const project = await ProjectsModel.create(projectPayload);

			/* Creating Permission as Administrator Payload */
			const permissionPayload = {
				[eModulesName.PRODUCTS]: Object.values(eProductPermissions),
				[eModulesName.ORDERS]: Object.values(eOrderPermissions),
				organization: organization._id,
				// project: project._id,
			}
			const permission = await PermissionModel.create(permissionPayload)

			/* Create Team Payload */
			const teamPayload = {
				name: eRoles.ADMINISTRATORS,
				role: eRoles.ADMINISTRATORS,
				organization: organization._id,
				permission: permission._id,
			}
			const team = await TeamModel.create(teamPayload);

			/* Adding current user as team member */
			const teamMember = {
				team: team._id,
				user: user.userId,
				organization: organization._id,
			}
			await TeamMembersModel.create(teamMember);

			return organization;
		} catch (error) {
			throw new Error(error)
		}
	}

	async getUserOrganizations(_, { pagination }, context) {
		try {
			const user = context.user;
			const { limit = 10, offset = 0 } = pagination || {};

			const membersData = await TeamMembersModel.find({ user: user.userId })
				.select(['organization', 'team'])
				.populate('organization');

			const orgIds = membersData.map((item) => item.organization._id);

			const teamCounts = await teamCountLoader.loadMany(orgIds);
			const permissionCounts = await permissionCountLoader.loadMany(orgIds);

			const organizations = membersData.map((item: any, index: number) => ({
				_id: item.organization._id,
				name: item.organization.name,
				createdAt: item.organization.createdAt,
				updatedAt: item.organization.updatedAt,
				noOfTeams: teamCounts[index],
				noOfPermissions: permissionCounts[index],
			}));
			return organizations;

		} catch (error) {
			console.log("ERROR:getUserOrganizations::", error)
			throw new Error(error);
		}
	}

}

export default OrganizationService;