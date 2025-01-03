
import { httpClient } from "./httpClient"
import { GET_PRODUCT_SELECTIONS } from "./path"


export const getProductSelections = async (payload: any = {}) => {
    const { query } = payload;
    let url = GET_PRODUCT_SELECTIONS;
    if (query) url = url.concat(query)
    const data = await httpClient.get(url);
    return data;
}

export const getDummyData = (): any[] => {
    return [
        {
            id: 'row-1',
            name: 'Category 1',
            key: 'ext-id-1',
            type: 'Level 2',
            createdAt: '2023-04-01',
            modifiedAt: '2023-04-15'
        },
        {
            id: 'row-2',
            name: 'Category 2',
            key: 'ext-id-2',
            type: 'Level 3',
            createdAt: '2023-02-10',
            modifiedAt: '2023-03-20'
        },
        {
            id: 'row-3',
            name: 'Category 3',
            key: 'ext-id-3',
            type: 'Level 1',
            createdAt: '2023-01-05',
            modifiedAt: '2023-02-28'
        },
        {
            id: 'row-4',
            name: 'Category 4',
            key: 'ext-id-4',
            type: 'Level 3',
            createdAt: '2022-12-15',
            modifiedAt: '2023-01-10'
        },
        {
            id: 'row-5',
            name: 'Category 5',
            key: 'ext-id-5',
            type: 'Level 1',
            createdAt: '2022-11-20',
            modifiedAt: '2023-01-01'
        }
    ];
};