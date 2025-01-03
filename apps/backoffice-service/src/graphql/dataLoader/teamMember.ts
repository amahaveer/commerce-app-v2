import TeamMembersModel from '@/models/teamMembers.model';
import DataLoader from 'dataloader';

export const teamMembersLoader = new DataLoader(async (teamIds) => {
    // Fetch all team members where the team ID is in the `teamIds` array
    const teamMembers = await TeamMembersModel.find({ team: { $in: teamIds } });
    
    // Group team members by team ID
    const teamMembersMap = teamIds.map(teamId =>
      teamMembers.filter(member => member.team.toString() === teamId.toString())
    );
  
    return teamMembersMap;
});
