import ProjectService from "../../services/project.service"


const service = new ProjectService();

const ProjectResolver = {

    Query: {
        getProjects: service.getOrganizationProjects,
        getMyProjects: service.getMyProjects 
    },

    Mutation: {
        createProject: service.createProject
    }
}

export default ProjectResolver;