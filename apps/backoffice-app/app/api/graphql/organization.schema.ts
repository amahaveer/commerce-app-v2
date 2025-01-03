import { gql } from '@apollo/client';

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($body: ICreateOrganization!) {
    createOrganization(body: $body) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations($pagination: PaginationInput) {
    getOrganizations(pagination: $pagination) {
      _id
      name
      createdAt
      updatedAt
      noOfTeams
    }
  }`
;