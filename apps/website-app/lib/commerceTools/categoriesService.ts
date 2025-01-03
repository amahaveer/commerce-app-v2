import { sdk } from '@royalcyber/unified-sdk';

import { getCookie } from '@/utils/cookieManager';
import { cookieName } from '@/context/OktaTokenContext';
import { Category } from '@royalcyber/global-types';
const oktaToken = getCookie(cookieName);
console.log('okta token------->>>>>>>>', oktaToken);
export const categoryService = {
  fetchCategories: async (): Promise<Category[]> => {
    sdk.defaultConfigure('en');
    try {
      const response = await sdk.composableCommerce.product.queryCategories(
        {}
      );
      if (!response.isError) {
        console.log('Category List Data: category service file', response);

        const items = response.data.items || [];
        return items;
      } else {
        console.error('SDK Error Response:', response.error);
        throw new Error(response.error.message || 'An error occurred while fetching categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
}
