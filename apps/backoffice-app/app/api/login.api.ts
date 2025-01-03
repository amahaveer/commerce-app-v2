import { httpClient } from './httpClient';
import { BASE_URL, MC_TOKEN_URL } from "./path"
import client from './apolloClient';
import { LOGIN_QUERY } from './graphql/user.schema';

const LOGIN_URL = `${BASE_URL}/auth/login`;

export interface LoginRequest {
  email: string;
  password: string;
}


export const loginToUnifiedApi = async (body: LoginRequest) => {
  try {
    const result = await client.mutate({
			mutation: LOGIN_QUERY,
			variables: { body },
		});
		return result.data.loginUser;
  } catch (error) {
      throw error
  }
}


export const loginUser = async (credentials: LoginRequest) => {
  try {
    const data = await httpClient.post(LOGIN_URL, { body: credentials });
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const loginToCommercetool = async (credentials: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(credentials),
      redirect: "follow"
    };
    
    const data = await fetch(MC_TOKEN_URL, requestOptions);
    await data.json()
  } catch (error) {
    console.error('Error loginToCommercetool:', error);
    throw error;
  }
};
