import { toast } from 'react-toastify';
import client from './apolloClient';
import { CREATE_TEAM, GET_TEAM_BY_ID, GET_TEAMS_BY_ORGANIZATION, GET_TEAM_BY_INVITED_TOKEN } from './graphql/teams.schema';

export const getTeamsByOrganizationId = async (orgId: string) => {
	try {
		const result = await client.query({
			query: GET_TEAMS_BY_ORGANIZATION,
			variables: { organizationId: orgId },
			fetchPolicy: "network-only"
		});

		return result.data.getTeams;
	} catch (error) {
		console.log("Error getTeamsByOrganizationId:", error);
		return null;
	}
};

export const getTeamById = async (teamId: string) => {
	try {
		const result = await client.query({
			query: GET_TEAM_BY_ID,
			variables: { teamId: teamId },
		});

		return result.data.getTeamById;
	} catch (error) {
		console.log("Error getTeamById:", error);
		return null;
	}
}

export const createTeam = async (teamName: string, orgId: string) => {
	const body = {
		name: teamName,
		organizationId: orgId
	};

	try {
		const result = await client.mutate({
			mutation: CREATE_TEAM,
			variables: { body },
		});
		toast.success(`Team "${teamName}" created!`)
		return result.data.createOrganization;
	} catch (error: any) {
		console.log("Error creating Team:", error);
		toast.error(error.message)
		return null;
	}
};


export const getTeamByInvitedToken = async (token: string) => {
	try {
		const result = await client.mutate({
			mutation: GET_TEAM_BY_INVITED_TOKEN,
			variables: { token },
		});
		return result.data.getTeamByInvitedToken;
	} catch (error: any) {
		console.log("Error getTeamByInvitedToken Team:", error);
		return null;
	}
};