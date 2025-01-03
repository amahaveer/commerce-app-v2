import { httpClient } from './httpClient';
import { GET_CATEGORIES_URL } from './path';

export const getCategories = async () => {
  try {
    const result = await httpClient.get(GET_CATEGORIES_URL);
    return result;
  } catch (error) {
    console.log('ERROR', error);
    throw error;
  }
};

export const getDummyData = (): any[] => {
  return [
    {
      id: 'row-1',
      category: {
        name: 'Category 1',
        externalId: 'ext-id-1',
        categoryPath: 'Category 1 > Subcategory 1',
        categoryLevel: 2,
        subcategory: 3,
        products: 15,
        createdAt: '2023-04-01',
        modified: '2023-04-15'
      }
    },
    {
      id: 'row-2',
      category: {
        name: 'Category 2',
        externalId: 'ext-id-2',
        categoryPath: 'Category 2 > Subcategory 1 > Subsubcategory 1',
        categoryLevel: 3,
        subcategory: 2,
        products: 8,
        createdAt: '2023-02-10',
        modified: '2023-03-20'
      }
    },
    {
      id: 'row-3',
      category: {
        name: 'Category 3',
        externalId: 'ext-id-3',
        categoryPath: 'Category 3',
        categoryLevel: 1,
        subcategory: 1,
        products: 22,
        createdAt: '2023-01-05',
        modified: '2023-02-28'
      }
    },
    {
      id: 'row-4',
      category: {
        name: 'Category 4',
        externalId: 'ext-id-4',
        categoryPath: 'Category 4 > Subcategory 1 > Subsubcategory 2',
        categoryLevel: 3,
        subcategory: 4,
        products: 11,
        createdAt: '2022-12-15',
        modified: '2023-01-10'
      }
    },
    {
      id: 'row-5',
      category: {
        name: 'Category 5',
        externalId: 'ext-id-5',
        categoryPath: 'Category 5',
        categoryLevel: 1,
        subcategory: 2,
        products: 18,
        createdAt: '2022-11-20',
        modified: '2023-01-01'
      }
    }
  ];
};
