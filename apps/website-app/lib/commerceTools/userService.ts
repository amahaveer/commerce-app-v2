import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './constants';
import Cookies from 'js-cookie';

export const userService = {
  login: async (username: string, password: string) => {
    const data = { username, password };
    try {
      const result = await apiClient.post(API_ENDPOINTS.AUTH, data);
      Cookies.set('accessToken', result.accessToken, {
        expires: 7, 
        path: '/', 
      });
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  logout: async () => {
    Cookies.remove('accessToken');
  },

  isLoggedIn: async () => {
    const token = Cookies.get('accessToken');
    return !!token;
  },
};
