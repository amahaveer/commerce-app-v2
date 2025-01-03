import { MY_PROFILE_QUERY } from "./graphql/user.schema";
import { httpClient } from "./httpClient"
import { BASE_URL } from './path';
import client from './apolloClient';

export const userDetails = async () => {
    const Me_URL = `${BASE_URL}/me`;
    const data = await httpClient.get(Me_URL);
    return data;
}

export const getUserData = async () => {
	try {
		const result = await client.query({
			query: MY_PROFILE_QUERY,
		});
		return result.data.getUserProfile;
	} catch (error: any) {
		return null;
	}
}