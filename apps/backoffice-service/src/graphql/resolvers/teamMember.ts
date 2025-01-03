import TeamMemberService from "@/services/teamMember";


const service = new TeamMemberService();

const TeamMemberResolver = {

    Mutation: {
        inviteMemberInTeam: service.inviteMemberInTeam,
        createUserAndJoinTeam: service.createUserAndJoinTeam
    },
    Query: {
        getTeamMembers: service.getMembersByTeamId    
    },

}

export default TeamMemberResolver;