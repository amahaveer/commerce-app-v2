import { gql } from '@apollo/client';

export const GET_PROJECTS_OF_ORGANIZATION = gql`
    query GetProjects($organizationId: ID!) {
        getProjects(organizationId: $organizationId) {
            name
            _id
            key
            organization {
                _id
            }
        }
    }`
    ;

export const CREATE_PROJECT = gql`
    mutation CreateProject($body: ICreateProject!) {
        createProject(body: $body) {
            name
            organization {
                _id
                name
                createdAt
            }
        }
    }
`

export const GET_MY_PROJECTS_QUERY = gql`
    query GetMyProjects {
        getMyProjects {
            _id
            name
            key
            organization {
                _id
                name
            }
            createdAt
            updatedAt
        }
    }
`