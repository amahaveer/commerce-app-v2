import { gql } from 'apollo-server-express';

const permissionSchema = gql`
  scalar DateScalar
  directive @auth on FIELD_DEFINITION

  type Permission {
    _id: ID
    products: [String]
    orders: [String]
    customers: [String]
    organization: Organization
    project: Project
  }

  input IUpdatePermission {
    _id: ID!
    products: [String]
    orders: [String]
    customers: [String]
  }

  type Query {
    getPermissionsByTeamId(teamId: ID!, projectId: ID!): Permission
    getPermissionsByProjectIdAndOrgId(projectId: ID!, orgId: ID!): Permission @auth
  }

  type Mutation {
    updatePermissionsById(body: IUpdatePermission!): String
  }
`;

export default permissionSchema;
