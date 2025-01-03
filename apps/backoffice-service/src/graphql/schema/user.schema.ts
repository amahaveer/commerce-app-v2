import { gql } from 'apollo-server-express';

export const userSchema = gql`
  scalar DateScalar
  directive @auth on FIELD_DEFINITION
  
  type User {
    firstName: String!
    lastName: String!
    email: String!
    # organizations: [Organization]
  }

  input ICreateUser {
    firstName: String!
    lastName: String!
    code: String
    email: String!
    password: String!
  }

  type Query {
    getUserProfile: User @auth
  }

  type Mutation {
    createUser(body: ICreateUser!): User
  }
`;

