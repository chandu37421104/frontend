import api from '../utils/api';

// Get all points
export const getPoints = async () => {
  const response = await api.get('/points');
  return response.data;
};

// Add points to a user
export const addPoints = async (userId: string, points: number) => {
  const response = await api.post('/points', { userId, points });
  return response.data;
};

// Deduct points from a user
export const deductPoints = async (userId: string, points: number) => {
  const response = await api.put(`/points/deduct/${userId}`, { points });
  return response.data;
};

// Get points history for a user
export const getPointsHistory = async (userId: string) => {
  const response = await api.get(`/points/history/${userId}`);
  return response.data;
};
