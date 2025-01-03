import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';


const apiClientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  maxBodyLength: Infinity,
});

// Function to create headers for requests
const createHeaders = (): AxiosRequestConfig['headers'] => {
  const token = Cookies.get('accessToken')
    ? `Bearer ${Cookies.get('accessToken')}`
    : '';
  const locale = navigator.language || 'en-US';
  const source = 'frontend';

  return {
    'Content-Type': 'application/json',
    Authorization: token,
    'Accept-Language': locale,
    'x-source': source,
  };
};

export const apiClient = {
  get: async (url: string, params = {}) => {
    try {
      const response = await apiClientAxios.get(url, {
        headers: createHeaders(),
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error during GET request:', error);
      throw error; // Rethrow to handle in the calling function
    }
  },

  post: async (url: string, data?: any, params = {}) => {
    try {
      const response = await apiClientAxios.post(url, data, {
        headers: createHeaders(),
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error; // Rethrow to handle in the calling function
    }
  },

  head: async (url: string, params = {}) => {
    try {
      const response = await apiClientAxios.head(url, {
        headers: createHeaders(),
        params,
      });
      return response; // HEAD requests typically do not return a body
    } catch (error) {
      console.error('Error during HEAD request:', error);
      throw error; // Rethrow to handle in the calling function
    }
  },
};

