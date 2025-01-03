import { gql } from '@apollo/client';


export const GET_PERMISSION_BY_TEAM_ID =  gql`
    query GetPermissionsByTeamId($teamId: ID!, $projectId: ID!) {
        getPermissionsByTeamId(teamId: $teamId, projectId: $projectId) {
            customers
            orders
            products
            _id
        }
    }
`

export const UPDATE_PERMISSION = gql `
    mutation UpdatePermissionsById($body: IUpdatePermission!) {
        updatePermissionsById(body: $body)
    }
`

export const GET_PERMISSIONS_BY_PROJ_AND_ORG = gql `
    query GetPermissionsByProjectIdAndOrgId($projectId: ID!, $orgId: ID!) {
        getPermissionsByProjectIdAndOrgId(projectId: $projectId, orgId: $orgId) {
            orders
            customers
            products
            _id
        }
    }
`