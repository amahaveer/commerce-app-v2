import { gql } from 'apollo-server-express';

export const teamSchema = gql`
  type Team {
    _id: ID!
    name: String!
    teamMembers: [TeamMember]
    permission: Permission
    organization: Organization
    role: String
    email: String
  }

  type TeamMember {
    _id: ID!
    user: User
  }

  input ICreateTeam {
    name: String!
    organizationId: ID!
  }

  type Mutation {
    createTeam(body: ICreateTeam!): String
    getTeamByInvitedToken(token: String): Team
  }

  type Query {
    getTeams(organizationId: ID!): [Team]
    getTeamById(teamId: ID!): Team
  }
`;
