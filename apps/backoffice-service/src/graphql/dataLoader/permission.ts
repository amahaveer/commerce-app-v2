import PermissionModel from "@/models/permission.model";
import DataLoader from "dataloader";

export const permissionCountLoader = new DataLoader(async (orgIds) => {
    const permissionCounts = await PermissionModel.aggregate([
        { $match: { organization: { $in: orgIds } } },
        { $group: { _id: "$organization", count: { $sum: 1 } } }
    ]);

    // Map results to input orgIds
    const permissionCountMap = new Map(
        permissionCounts.map((item) => [item._id.toString(), item.count])
    );
    return orgIds.map((id) => permissionCountMap.get(id.toString()) || 0); // Default to 0 if not found
});