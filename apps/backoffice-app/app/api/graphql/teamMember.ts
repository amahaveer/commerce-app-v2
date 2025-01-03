import { gql } from '@apollo/client';


export const GET_MEMBER_BY_TEAM_ID =  gql`
	query GetTeamMembers($teamId: ID!) {
		getTeamMembers(teamId: $teamId) {
			_id
			user {
				firstName
				lastName
				email
			}
		}
  }`


export const INVITE_MEMBER = gql`
	mutation InviteMemberInTeam($body: IInviteTeamMember) {
		inviteMemberInTeam(body: $body) {
			msg
			token
		}
	}
`

export const CREATE_USER_JOIN_TEAM = gql`
	mutation CreateUserAndJoinTeam($body: IJoinNewUser!) {
  		createUserAndJoinTeam(body: $body)
	}
`