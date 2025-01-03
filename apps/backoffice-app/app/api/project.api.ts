import { toast } from 'react-toastify';
import client from './apolloClient';
import { CREATE_PROJECT, GET_MY_PROJECTS_QUERY, GET_PROJECTS_OF_ORGANIZATION } from './graphql/project.schema';

export const getProjectsByOrganizationId = async (orgId: string) => {
	try {
		const result = await client.query({
			query: GET_PROJECTS_OF_ORGANIZATION,
			variables: { organizationId: orgId },
		});

		return result.data.getProjects;
	} catch (error) {
		console.error("Error creating organization:", error);
		return [];
	}
};

export const createProject = async (orgId: string, projectName: string) => {
	try {
		const result = await client.mutate({
			mutation: CREATE_PROJECT,
			variables: { body: {organization: orgId, name: projectName} },
		});
		toast.success(`${projectName} created!`)
		return result.data.createProject;
	} catch (error: any) {
		toast.error(error.message);
		return null;
	}
}

export const getMyProjects = async (pagination?: any) => {
	try {
		const result = await client.query({
			query: GET_MY_PROJECTS_QUERY,
		});
		return result.data.getMyProjects;

	} catch (error: any) {
		toast.error(error.message);
		return null;
	}
}