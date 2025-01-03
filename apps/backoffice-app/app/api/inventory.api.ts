import { httpClient } from "./httpClient"
import { GET_INVENTORIES } from "./path";


export const getInventoryByQuery = async ({ query, params }: any) => {
    let url = `${GET_INVENTORIES}`
    if (params) url = url.concat(`/${params}`)
    if (query) url = url.concat(`?${query}`)

    const data = await httpClient.get(url);
    return data;
}
