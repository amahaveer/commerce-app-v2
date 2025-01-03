import { gql } from 'apollo-server-express';

const projectSchema = gql`
  scalar DateScalar
  directive @auth on FIELD_DEFINITION

  type Project {
    _id: ID
    name: String
    key: String
    organization: Organization
    createdAt: DateScalar
    updatedAt: DateScalar
  }

  input ICreateProject {
    name: String!
    organization: String!
  }

  input PaginationInput {
    limit: Int
    offset: Int
  }

  type Query {
    getProjects(organizationId: ID!, pagination: PaginationInput): [Project]
    getMyProjects(pagination: PaginationInput): [Project] @auth
  }

  type Mutation {
    createProject(body: ICreateProject!): Project 
  }
`;

export default projectSchema;
