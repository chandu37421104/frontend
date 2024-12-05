import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api', // Base URL for API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to log or add auth headers if needed
api.interceptors.request.use(
  (config) => {
    // You can attach tokens here, e.g., config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
