import { gql } from 'apollo-server-express';

const organizationSchema = gql`
  scalar DateScalar
  directive @auth on FIELD_DEFINITION

  type Organization {
    _id: String!
    name: String!
    createdAt: DateScalar!
    updatedAt: DateScalar!
    noOfTeams: Int
    noOfPermissions: Int
  }

  input ICreateOrganization {
    name: String!
    # projectName: String!
  }

  input PaginationInput {
    limit: Int
    offset: Int
  }

  type Query {
    getOrganizations(pagination: PaginationInput): [Organization]  @auth
  }

  type Mutation {
    createOrganization(body: ICreateOrganization!): Organization @auth
  }
`;

export default organizationSchema;
