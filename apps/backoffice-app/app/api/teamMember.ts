import { toast } from 'react-toastify';
import client from './apolloClient';
import { CREATE_USER_JOIN_TEAM, GET_MEMBER_BY_TEAM_ID, INVITE_MEMBER } from './graphql/teamMember';

export const getMemberByTeamId = async (teamId: string) => {
	try {
		const result = await client.query({
			query: GET_MEMBER_BY_TEAM_ID,
			variables: { teamId: teamId },
		});

		return result.data.getTeamMembers;
	} catch (error) {
		console.error("Error getMemberByTeamId:", error);
		return [];
	}
}

export const inviteMemberInTeam = async (body: any) => {
	try {
		const result = await client.mutate({
			mutation: INVITE_MEMBER,
			variables: { body },
		});

		return result.data.inviteMemberInTeam;
	} catch (error: any) {
		toast.error(error.message)
		return null;
	}
}

export const createUserAndJoinTeam = async (body: any) => {
	try {
		const result = await client.mutate({
			mutation: CREATE_USER_JOIN_TEAM,
			variables: { body },
		});

		return result.data.inviteMemberInTeam;
	} catch (error: any) {
		toast.error(error.message)
		return null;
	}
}