import axios from 'axios';
console.log('REACT_APP_URL:', process.env.REACT_APP_URL);

console.log('Fetching tasks from API...');
const result = await apiClient.get('/selectAll');
console.log('Response received:', result);

const API_BASE_URL ='https://todoapi-2l8v.onrender.com';

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
      console.log('Raw API response:', result); // חשוב לבדוק מה באמת מוחזר
      
      if (!result.data) {
        console.warn('API returned undefined/null');
        return [];
      }
  
      console.log('Data received from API:', result.data);
  
      if (typeof result.data === 'string') {
        console.log('Response is a string, trying to parse JSON...');
        try {
          result.data = JSON.parse(result.data);
        } catch (e) {
          console.error('Failed to parse string response:', e);
          console.error('Response content:', result.data); // תדפיסי את זה כדי לראות מה הוא באמת מחזיר
          return [];
        }
      }
  
      return Array.isArray(result.data) ? result.data : [];
    } catch (err) {
      console.error('Error fetching tasks:', err);
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
