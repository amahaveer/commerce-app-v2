import { eProductPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/productPermissions.type"
import { GET_PERMISSION_BY_TEAM_ID, GET_PERMISSIONS_BY_PROJ_AND_ORG, UPDATE_PERMISSION } from './graphql/permission.schema';
import client from './apolloClient';

export const getPermissions = async (moduleName: string) => {
    const permissions: any = {
        orders: [
            'view_general_info',
            'view_custom_fields_info',
            'view_returns_info',
            'view_payments_info',
            'view_shipping_and_delivery_info',
            'create_order'
        ],
        products: [
            eProductPermissions.VIEW_GENERAL_TAB,
            eProductPermissions.VIEW_INTERNAL_EXTERNAL_TAB,
            eProductPermissions.VIEW_PRODUCT_SELECTIONS_TAB,
            eProductPermissions.VIEW_VARIANTS_TAB,
            eProductPermissions.REMOVE_CATEGORIES
        ]
    }
    return permissions[moduleName];
}

export const getPermissionByProjectAndOrgId = async (projectId: string, organizationId: string) => {
    try {
        const result = await client.query({
            query: GET_PERMISSIONS_BY_PROJ_AND_ORG,
            variables: { projectId, orgId: organizationId }
        })
        return result.data.getPermissionsByProjectIdAndOrgId
    } catch (error) {
        return {}
    }
}

export const getPermissionsByTeamId = async (teamId: string, projectId: string) => {
	try {
		const result = await client.query({
			query: GET_PERMISSION_BY_TEAM_ID,
            variables: { teamId, projectId },
            fetchPolicy: 'network-only'
		});
		return result.data.getPermissionsByTeamId;
	} catch (error) {
		console.error("Error getting permissions:", error);
		return null;
	}
}

export const updatePermission = async (body: any) => {
    try {
        const result = await client.mutate({
			mutation: UPDATE_PERMISSION,
            variables: { body }
		});
		return result.data.updatePermissionsById;
    } catch (error) {
		return null;
    }
}