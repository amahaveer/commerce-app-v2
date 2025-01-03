import { gql } from 'apollo-server-express';

const extensionAppSchema = gql`
  scalar DateScalar
  scalar JSON
  directive @auth on FIELD_DEFINITION

  type ExtensionApp {
    _id: String
    key: String
    configuaration: JSON
    organization: Organization
    project: Project
    createdAt: DateScalar
    updatedAt: DateScalar
    name: String
  }

  input IAddExtension {
    key: String!
    configuaration: JSON!
    organization: ID!
    project: ID!
    name: String!
  }


  input PaginationInput {
    limit: Int
    offset: Int
  }

  type Query {
    getConfigByProjectKey(projectKey: String!): JSON
    getConfigByOrganization(organizationId: ID): [ExtensionApp]
    uninstallExtensionApp(appId: ID): String
  }

  type Mutation {
    addExtensionApp(body: IAddExtension!): ExtensionApp @auth
  }
`;

export default extensionAppSchema;
