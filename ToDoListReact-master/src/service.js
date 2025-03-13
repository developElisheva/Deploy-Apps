import axios from 'axios';

// בסביבת פיתוח
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'https://todoapi-2l8v.onrender.com'
  : '';console.log( API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(config => {
  console.log('🔹 Sending request to:', config.baseURL + config.url);
  return config;
});

export default {
  getTasks: async () => {
    try {
      // שימוש ב-fetch במקום axios
      const response = await fetch(`${API_BASE_URL}/selectAll`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data received from API:', data);
      
      if (Array.isArray(data)) {
        return data;
      } else {
        console.warn('Data is not an array:', typeof data);
        return [];
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      return [];
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

