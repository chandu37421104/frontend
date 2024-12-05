import api from '../utils/api';

// Login user
export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Register user
export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Get the authenticated user
export const getAuthUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Logout user
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const sendPasswordReset = async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  };
  
  // Export all the functions
  export default {
    sendPasswordReset,
  };
