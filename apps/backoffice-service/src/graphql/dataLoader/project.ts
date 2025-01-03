import ProjectsModel from "@/models/projects.model";
import DataLoader from "dataloader";

export const myProjectLoader = new DataLoader(async (orgIds) => {
    const projects = await ProjectsModel.find({
        organization: { $in: orgIds },
    }).lean();

    // Group projects by organization ID
    const projectMap = orgIds.reduce((acc, id: any) => {
        acc[id] = [];
        return acc;
    }, {});

    projects.forEach((project) => {
        const orgId = project.organization?._id?.toString();
        if (projectMap[orgId]) {
            projectMap[orgId].push(project);
        }
    });

    // Return projects for each organization ID in the same order
    return orgIds.map((id: any) => projectMap[id] || []);
});