import axios from 'axios';

// Replace this with the correct base URL
// Instead of using process.env.REACT_APP_URL which seems to be misconfigured
const API_BASE_URL = 'https://todoapi-2l8v.onrender.com';

// Create a new axios instance with the correct baseURL
const apiClient = axios.create({
  baseURL: API_BASE_URL
});

// Debug middleware to log all requests
apiClient.interceptors.request.use(config => {
  console.log('Making request to:', config.baseURL + config.url);
  return config;
});

export default {
  getTasks: async () => {
    try {
      // Use the correct endpoint based on your Swagger documentation
      const result = await apiClient.get('/selectAll');
      console.log('Data received from API:', result.data);
      
      if (Array.isArray(result.data)) {
        console.log('Data is array with length:', result.data.length);
      } else {
        console.log('Data is not an array:', typeof result.data);
      }

      return result.data || [];
    } catch (err) {
      console.error('שגיאה בהבאת המשימות:', err);
      // Log more details about the error
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