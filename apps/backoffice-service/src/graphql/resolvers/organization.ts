import OrganizationService from "../../services/organization.service"


const service = new OrganizationService();

const OrganizationResolver = {
    
    Query: {
        getOrganizations: service.getUserOrganizations
    },

    Mutation: {
        createOrganization: service.createOrganization
    }
}

export default OrganizationResolver;