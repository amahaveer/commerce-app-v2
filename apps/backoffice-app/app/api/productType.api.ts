import { httpClient } from "./httpClient"
import { GET_PRODUCT_TYPE_BY_ID, GET_PRODUCT_TYPE_URL } from "./path"

export const getProductTypes = async () => {
    try {
        const result = await httpClient.get(GET_PRODUCT_TYPE_URL);
        return result.data;
    } catch (error) {
       throw error;
    } 
}

export const getProductTypesById = async (params: {id: string}) => {
    try {
        const url = `${GET_PRODUCT_TYPE_BY_ID}/${params.id}`
        const result = await httpClient.get(url);
        return result.data;
    } catch (error) {
       throw error;
    } 
}
