import api from '../utils/api';

// Get all users
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Get a specific user by ID
export const getUserById = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData: any) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Update a user by ID
export const updateUser = async (userId: string, userData: any) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
