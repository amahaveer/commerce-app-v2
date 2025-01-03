import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './constants';
import Cookies from 'js-cookie';

export const cartService = {
  checkCartExists: async () => {
    try {
      const response = await apiClient.head(API_ENDPOINTS.ALL_CARTS); 
      return response.status === 200; 
    } catch (error:any) {
      if (error.response && error.response.status === 404) {
        return false; 
      }
      console.error('Error checking cart existence:', error);
      throw error; 
    }
  },
  createCart: async (currency: string = 'USD') => {
    const data = { currency };
    try {
      const response = await apiClient.post(API_ENDPOINTS.ALL_CARTS, data);
      Cookies.set('cartId', response.id, {
        expires: 7,
        path: '/', 
      });
      return response; 
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error; 
    }
  },
  addLineItem: async (sku: string, quantity: number) => {
    const cartId = Cookies.get('cartId'); 
    if (!cartId) {
      throw new Error('No cart ID found'); 
    }
    const data = {
      version: 1,
      actions: [
        {
          action: 'addLineItem',
          sku,
          quantity,
        },
      ],
    };

    try {
      const response = await apiClient.post(
        `${API_ENDPOINTS.ALL_CARTS}/${cartId}`,
        data,
      );
      return response;
    } catch (error) {
      console.error('Error adding line item to cart:', error);
      throw error; 
    }
  },
  getCartById: async () => {
    const cartId = Cookies.get('cartId'); 
    if (!cartId) {
      throw new Error('No cart ID found'); 
    }
    try {
      const response = await apiClient.get( `${API_ENDPOINTS.CART_BY_ID}/${cartId}`);
      return response; 
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error; 
    }
  }
};