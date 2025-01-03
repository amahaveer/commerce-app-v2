import { gql } from 'apollo-server-express';

export const authSchema = gql`

  type LoginResponse {
    accessToken: String
  }

  input ILogin {
    email: String!
    password: String!
  }

  type Query {
    getusers: [User]
  }
  
  type Mutation {
    loginUser(body: ILogin!): LoginResponse
  }
`;

