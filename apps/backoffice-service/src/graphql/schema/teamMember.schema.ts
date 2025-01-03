import { gql } from 'apollo-server-express';

export const teamMemberSchema = gql`

  type TeamMember {
    _id: ID!
    user: User
    team: Team
  }

  type IInviteTeamMemberResponse {
    token: String
    msg: String
  }

  input IInviteTeamMember {
    teamId: ID!
    orgId: ID!
    email: String!
  }

  input IJoinNewUser {
    firstName: String!
    lastName: String!
    password: String!
    token: String!
  }

  type Mutation {
    inviteMemberInTeam(body: IInviteTeamMember): IInviteTeamMemberResponse
    createUserAndJoinTeam(body: IJoinNewUser!): String
  }

  type Query {
    getTeamMembers(teamId: ID!): [TeamMember]
  }
`;
