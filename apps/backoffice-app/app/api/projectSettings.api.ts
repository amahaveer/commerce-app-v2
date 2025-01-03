import { httpClient } from "./httpClient"
import { GET_PROJECT_SETTINGS_URL } from "./path"


export const getProjectSettings = async () => {
    try {
        const data = await httpClient.get(GET_PROJECT_SETTINGS_URL);
        return data.data;
    } catch (error) {
        return null
    }
}


