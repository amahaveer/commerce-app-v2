import { gql } from '@apollo/client';

export const GET_TEAMS_BY_ORGANIZATION = gql`
    query GetTeams($organizationId: ID!) {
        getTeams(organizationId: $organizationId) {
            _id
            name
            teamMembers {
            	_id
            }
        }
    }
`;

export const GET_TEAM_BY_ID = gql`
    query GetTeamById($teamId: ID!) {
        getTeamById(teamId: $teamId) {
            name
            role
            organization {
                name
            }
        }
}
`

export const CREATE_TEAM = gql`
    mutation CreateTeam($body: ICreateTeam!) {
        createTeam(body: $body)
    }
`

export const GET_TEAM_BY_INVITED_TOKEN = gql`
    mutation GetTeamByInvitedToken($token: String) {
        getTeamByInvitedToken(token: $token) {
            _id
            name
            email,
            organization {
                name
            }
            role    
        }
    }
`

