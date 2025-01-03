import TeamService from "../../services/team.service";


const service = new TeamService();

const TeamResolver = {

    Query: {
        getTeams: service.getTeamsByOrganization,
        getTeamById: service.getTeamById,
    },

    Mutation: {
        createTeam: service.createTeam,
        getTeamByInvitedToken: service.getTeamByInvitedToken,
    }
}

export default TeamResolver;