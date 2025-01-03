import PermissionModel from "@/models/permission.model"
import TeamModel from "@/models/team.model";
import TeamMembersModel from "@/models/teamMembers.model";
import { eRoles } from "@/types/common.types";
import { IUpdatePermissions } from "@/types/permission.types";


class PermissionService {

    async getPermissionsByTeamId(_: any, data: { teamId: string, projectId: string }) {
        try {
            const team = await TeamModel.findOne({ _id: data.teamId })
            const permissions = await PermissionModel.findOne({ _id: team.permission, project: data.projectId })
                .populate('organization')
            return permissions
        } catch (error) {
            throw new Error(error);
        }
    }

    async updatePermissionsById(_: any, data: { body: IUpdatePermissions }) {
        try {
            const { _id, ...others } = data.body; 
            await PermissionModel.updateOne({ _id: _id }, others, { upsert: true });
            return "Updated Successfully";
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPermissionsByProjectId(_: any, data: { projectId: string }) {
        try {
            const { projectId } = data;
            await PermissionModel.find({ project: projectId })
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPermissionsByProjectIdAndOrgId(_: any, data: { projectId: string, orgId: string }, context) {
        try {
            const { userId } = context.user;
            const { projectId, orgId } = data;
            
            const permissionQuery = { _id: null }

            const members: any = await TeamMembersModel.findOne({ user: userId, organization: orgId }).populate('team');
            if (members.team.role === eRoles.ADMINISTRATORS) {
                permissionQuery._id = members.team.permission
            }

            const result = await PermissionModel.findOne(permissionQuery);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default PermissionService