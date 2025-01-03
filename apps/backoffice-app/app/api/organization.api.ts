import { toast } from 'react-toastify';
import client from './apolloClient';
import { CREATE_ORGANIZATION, GET_ORGANIZATIONS } from './graphql/organization.schema';


/* create Organization in Merchant center */
export const mcCreateOrganization = async (organizationName: string) => {
	try {
		const requestBody = {
			operationName: "CreateOrganizationMutation",
			variables: {
				draft: {
					ownerId: "e5434e3e-21e5-4485-87c5-20cf1dca36a2",
					name: organizationName
				}
			},
			query: `
			  mutation CreateOrganizationMutation($draft: OrganizationDraftType!) {
				createMyOrganization(draft: $draft) {
				  id
				  name
				  __typename
				}
			  }
			`
		};
		const myHeaders = new Headers();
		myHeaders.append("x-graphql-target", "mc");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Access-Control-Allow-Origin", "us-central1.gcp.commercetools.com");
		const requestOptions: any = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(requestBody),
			credentials: "include",
		};
		const res = await fetch("https://mc-api.us-central1.gcp.commercetools.com/graphql", requestOptions);
		await res.json()
		return true;
	} catch (error: any) {
		toast.error(error.message)
		return null;
	}
}

export const createOrganizations = async (organizationName: string) => {
	const body = {
		name: organizationName,
	};
	
	try {
		const result = await client.mutate({
			mutation: CREATE_ORGANIZATION,
			variables: { body },
		});
		toast.success(`Organization "${organizationName}" created!`)	
		return result.data.createOrganization;
	} catch (error: any) {
		console.error("Error creating organization:", error);
		toast.error(error.message)
		return null;
	}
};

export const getUserOrganizations = async () => {
	try {
		const result = await client.query({
			query: GET_ORGANIZATIONS,
			fetchPolicy: 'network-only'
		});

		return result.data.getOrganizations;
	} catch (error) {
		console.error("Error getting organization:", error);
		return null;
	}
}
