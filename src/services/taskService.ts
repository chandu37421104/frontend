import api from '../utils/api';

// Get all tasks
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

// Get a specific task by ID
export const getTaskById = async (taskId: string) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

// Create a new task
export const createTask = async (taskData: any) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

// Update a task by ID
export const updateTask = async (taskId: string, taskData: any) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

// Delete a task by ID
export const deleteTask = async (taskId: string) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

