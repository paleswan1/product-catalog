// utils/clients/apiClient.ts
import axios from 'axios';
import Cookies from 'js-cookie';

export const BASE_URL = '';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from cookie for every request
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('_auth');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
