import axios from 'axios';

const API_BASE_URL = 'https://todoapi-2l8v.onrender.com/';
console.log( API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(config => {
  console.log('🔹 Sending request to:', config.baseURL + config.url);
  return config;
});

apiClient.interceptors.request.use(config => {
  console.log('Making request to:', config.baseURL + config.url);
  return config;
});

export default {
  getTasks: async () => {
    try {
      const result = await apiClient.get('/selectAll');
      console.log('Data received from API:', result.data);

      let data = result.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
          console.log('Parsed string data:', data);
        } catch (e) {
          console.error('Failed to parse string response:', e);
          data = [];
        }
      }

      if (Array.isArray(data)) {
        console.log('Data is array with length:', data.length);
        return data;
      } else {
        console.log('Data is not an array:', typeof data);
        return [];
      }
    } catch (err) {
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

