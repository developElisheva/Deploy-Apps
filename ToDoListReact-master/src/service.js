import axios from 'axios';

// Set base URL from environment variable
axios.defaults.baseURL = process.env.REACT_APP_URL || 'https://todoapi-2l8v.onrender.com';

export default {
  getTasks: async () => {
    try {
      console.log('Fetching tasks from:', `${axios.defaults.baseURL}/selectAll`);
      const result = await axios.get('/selectAll');
      
      // Log the actual response data to debug
      console.log('Raw response:', result.data);
      
      // Ensure we always return an array
      if (Array.isArray(result.data)) {
        console.log('Received data array with length:', result.data.length);
        return result.data;
      } else if (typeof result.data === 'string') {
        // Try to parse the string as JSON
        try {
          const parsedData = JSON.parse(result.data);
          if (Array.isArray(parsedData)) {
            console.log('Successfully parsed string to array with length:', parsedData.length);
            return parsedData;
          } else {
            console.log('Parsed string but result is not an array:', typeof parsedData);
            return [];
          }
        } catch (parseErr) {
          console.error('Failed to parse response as JSON:', parseErr);
          return [];
        }
      } else {
        console.log('API did not return an array, received:', typeof result.data, result.data);
        return [];
      }
    } catch (err) {
      console.error('Error getting tasks:', err.message, err.response?.data);
      return [];
    }
  },

  addTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await axios.post(`/add?Name=${encodeURIComponent(name)}`);
      return result.data;
    } catch (err) {
      console.error('Error adding task:', err.message, err.response?.data);
      return null;
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      // Sending isComplete directly as the body since the backend expects a boolean
      const result = await axios.patch(`/update/${id}`, isComplete, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return result.data;
    } catch (err) {
      console.error('Error setting completion:', err.message, err.response?.data);
      return null;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      const result = await axios.delete(`/delete/${id}`);
      return result.data;
    } catch (err) {
      console.error('Error deleting task:', err.message, err.response?.data);
      return null;
    }
  }
};