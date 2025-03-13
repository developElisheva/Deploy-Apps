import axios from 'axios';

// Set base URL from environment variable
axios.defaults.baseURL = process.env.REACT_APP_URL || 'https://todoapi-2l8v.onrender.com';

export default {
  getTasks: async () => {
    try {
      console.log('Fetching tasks from:', `${axios.defaults.baseURL}/selectAll`);
      const result = await axios.get('/selectAll');
      
      // Log the actual response data to debug
      console.log('Raw response data:', result.data);
      
      // Ensure we always return an array
      if (Array.isArray(result.data)) {
        console.log('Received data array with length:', result.data.length);
        return result.data.map(item => ({
          id: item.id,
          name: item.name,
          isComplete: item.isComplete === true
        }));
      } else if (typeof result.data === 'string') {
        // Try to parse the string as JSON
        try {
          const parsedData = JSON.parse(result.data);
          if (Array.isArray(parsedData)) {
            console.log('Successfully parsed string to array with length:', parsedData.length);
            return parsedData.map(item => ({
              id: item.Id,  // Note the capital I
              name: item.Name,  // Note the capital N
              isComplete: item.IsComplete === true  // Note the capital I and C
            }));
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
      console.error('Error getting tasks:', err.message);
      console.error('Error details:', err.response?.data);
      return [];
    }
  },

  addTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await axios.post(`/add?Name=${encodeURIComponent(name)}`);
      console.log('Add task response:', result.data);
      return result.data;
    } catch (err) {
      console.error('Error adding task:', err.message);
      console.error('Error details:', err.response?.data);
      return null;
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      // Send as JSON payload since the API expects a boolean value
      const result = await axios.patch(`/update/${id}`, isComplete, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Update task response:', result.data);
      return result.data;
    } catch (err) {
      console.error('Error setting completion:', err.message);
      console.error('Error details:', err.response?.data, err.response?.status);
      return null;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      const result = await axios.delete(`/delete/${id}`);
      console.log('Delete task response:', result.data);
      return result.data;
    } catch (err) {
      console.error('Error deleting task:', err.message);
      console.error('Error details:', err.response?.data);
      return null;
    }
  }
};