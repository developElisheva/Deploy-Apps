import axios from 'axios';

console.log('REACT_APP_URL from env:', process.env.REACT_APP_URL);

const API_BASE_URL = process.env.REACT_APP_URL || 'https://todoapi-2l8v.onrender.com';
console.log('Using API base URL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(config => {
  console.log('Making request to:', config.baseURL + config.url);
  return config;
});

export default {
  getTasks: async () => {
    try {
      const result = await apiClient.get('/selectAll');
      return result.data || [];
    } catch (err) {
      console.error('שגיאה בהבאת המשימות:', err);
      if (err.response) {
        console.error('Error response:', {
          status: err.response.status,
          data: err.response.data
        });
      } else if (err.request) {
        console.error('Request made but no response received');
      }
      return [];
    }
  },

  addTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await apiClient.post(`/add?Name=${encodeURIComponent(name)}`);
      return result.data;
    } catch (err) {
      console.error('Error adding task:', err);
      return null;
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await apiClient.patch(`/update/${id}`, isComplete, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return result.data;
    } catch (err) {
      console.error('Error setting completion:', err);
      return null;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      const result = await apiClient.delete(`/delete/${id}`);
      return result.data;
    } catch (err) {
      console.error('Error deleting task:', err);
      return null;
    }
  }
};