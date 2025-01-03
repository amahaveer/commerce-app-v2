import PermissionService from "@/services/permissions";


const service = new PermissionService();

const PermissionsResolver = {

    Query: {
        getPermissionsByTeamId: service.getPermissionsByTeamId,
        getPermissionsByProjectIdAndOrgId: service.getPermissionsByProjectIdAndOrgId
    },

    Mutation: {
        updatePermissionsById: service.updatePermissionsById,
    }
}

export default PermissionsResolver;