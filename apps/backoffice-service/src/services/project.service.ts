import ProjectsModel from "../models/projects.model"
import { ICreateProject } from "../types/project.type";
import { Schema } from 'mongoose';
import Utils from "../utils";
import OrganizationModel from "../models/organization.model";
import TeamMembersModel from "@/models/teamMembers.model";
import TeamModel from "@/models/team.model";
import { myProjectLoader } from "@/graphql/dataLoader/project";
import { eRoles } from "@/types/common.types";

const { Types } = Schema;

class ProjectService {

	async createProject(_: any, data: { body: ICreateProject }) {
		try {
			const { name } = data.body;
			const payload = {
				...data.body,
				// organization: new Types.ObjectId(organization),
				key: Utils.toSlug(name),
			};

			const [organizationExist, projectExist] = await Promise.all([
				OrganizationModel.exists({ _id: payload.organization }),
				ProjectsModel.exists({ key: payload.key })
			]);

			if (!organizationExist) {
				throw new Error(`organization doesn't exist`)
			}

			if (projectExist) {
				throw new Error(`Project "${name}" already exist`)
			}

			const result = await ProjectsModel.create(payload);
			await result.populate('organization');

			return result;

		} catch (error) {
			throw new Error(error)
		}
	}

	async getOrganizationProjects(_, { pagination, organizationId }) {
		try {
			const { limit = 10, offset = 0 } = pagination || {};
			return await ProjectsModel.find({ organization: organizationId })
			  .skip(offset)
			  .limit(limit);

		} catch (error) {
			throw new Error(error)
		}
	}

	async getMyProjects(_, { pagination }, context) {
	  try {
		const { userId } = context.user;
		const { limit = 10, offset = 0 } = pagination || {};
	
		// 1. Find team memberships for the user
		const teamMemberships = await TeamMembersModel.find({ user: userId })
		  .select(['team', 'organization'])
		  .lean();
	
		// Extract team IDs and organization IDs
		const teamIds = teamMemberships.map((membership) => membership.team);
		// 2. Lookup teams and check for Administrator role
		const adminTeams = await TeamModel.find({
		  _id: { $in: teamIds },
		  role: eRoles.ADMINISTRATORS, 
		}).distinct('organization'); 
		

		// 3. Use DataLoader to fetch projects by organization IDs
		// Load projects for the admin organizations
		const projects = await myProjectLoader.loadMany(adminTeams);
	
		// Flatten and paginate the results
		const flattenedProjects = projects.flat();
		const paginatedProjects = flattenedProjects.slice(offset, offset + limit);
	
		return paginatedProjects;
	  } catch (error) {
		throw new Error(error.message || 'Error fetching projects');
	  }
	}
	
}

export default ProjectService