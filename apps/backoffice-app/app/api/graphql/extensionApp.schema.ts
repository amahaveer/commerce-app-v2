import { gql } from '@apollo/client';


export const ADD_EXTENSION_APP = gql`
    mutation AddExtensionApp($body: IAddExtension!) {
        addExtensionApp(body: $body) {
            _id
        }
    }
`;

export const GET_EXTENSION_CONFIG_BY_ORG = gql`
    query GetConfigByOrganization($organizationId: ID) {
        getConfigByOrganization(organizationId: $organizationId) {
            _id
            configuaration
            createdAt
            key
            name
            updatedAt
            project {
                name
            }
        }
    }
`

export const UNINSTALL_EXTENSION_APP = gql `
    query Query($appId: ID) {
        uninstallExtensionApp(appId: $appId)
    }
`
