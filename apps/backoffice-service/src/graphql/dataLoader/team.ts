import TeamModel from "@/models/team.model";
import DataLoader from 'dataloader';

export const teamCountLoader = new DataLoader(async (orgIds) => {
    const teamCounts = await TeamModel.aggregate([
        { $match: { organization: { $in: orgIds } } },
        { $group: { _id: "$organization", count: { $sum: 1 } } }
    ]);

    // Map results to input orgIds
    const teamCountMap = new Map(
        teamCounts.map((item) => [item._id.toString(), item.count])
    );
    return orgIds.map((id) => teamCountMap.get(id.toString()) || 0);
});