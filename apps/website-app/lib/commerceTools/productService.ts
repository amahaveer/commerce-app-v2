import { Product } from '@/components/types/Product';
import { API_ENDPOINTS } from './constants';
import { apiClient } from './apiClient';
import { sdk } from '@royalcyber/unified-sdk';
import { IncomingMessage } from 'http';
import { ServerOptions } from '@royalcyber/unified-commerce';
import { getCookie } from '@/utils/cookieManager';
import { cookieName } from '@/context/OktaTokenContext';
const oktaToken = getCookie(cookieName);

export const productService = {
  fetchProductBySlug: async (slug: string): Promise<Product> => {
    const url = `${API_ENDPOINTS.PRODUCT_BY_SLUG}${slug}`;
    try {
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  fetchProductsByCategoriesId: async (id: string) => {
    sdk.defaultConfigure('en');
    try {
      const response = await sdk.composableCommerce.product.query(
        { limit: 10, category: id },
        {
          serverOptions: {
            req: {
              headers: {
                'client-type': 'web',
                locale: 'en_US',
                Authorization: `Bearer ${oktaToken}`,
              },
            } as unknown as IncomingMessage,
          } as ServerOptions,
        },
      );
      if (!response.isError) {
        const items = response.data?.data?.items || [];
        return { results: items };
      } else {
        console.error('SDK Error Response:', response.error);
        throw new Error(
          response.error.message ||
            'An error occurred while fetching categories',
        );
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  fetchProductsBysearchParameters: async (searchKeyword: string) => {
    sdk.defaultConfigure('en');
    try {
    const response = await sdk.composableCommerce.product.query(
      { limit: 10, query: searchKeyword },
      {
        serverOptions: {
          req: {
            headers: {
              'client-type': 'web',
              locale: 'en_US',
              Authorization:
                `Bearer ${oktaToken}`,
            },
          } as unknown as IncomingMessage,
        } as ServerOptions,
      },
    );
    if (!response.isError) {

      const items = response.data?.data?.items || [];
      return { results: items };
    } else {
      console.error('SDK Error Response:', response.error);
      throw new Error(response.error.message || 'An error occurred while fetching categories');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  },

};
