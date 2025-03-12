import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_URL;

export default {
  getTasks: async () => {
    try {
      // Corrected endpoint - just `/selectAll` instead of `/getAll/selectAll`
      console.log('Requesting:', `${process.env.REACT_APP_URL}/selectAll`);

      const result = await axios.get('/selectAll');
      console.log('Data received from API:', result.data);
      if (Array.isArray(result.data)) {
        console.log('Data is array:', result.data);
      } else {
        console.log('Data is not an array');
      }

      return result.data || []; // Return empty array if data is undefined
    } catch (err) {
      console.error('שגיאה בהבאת המשימות:', err);
      return []; // Return empty array in case of error
    }
  },

  addTask: async (name) => {
    console.log('addTask', name)
    try {
      // Added forward slash to ensure proper path
      const result = await axios.post(`/add?Name=${encodeURIComponent(name)}`);
      return result.data;
    } catch (err) {
      console.error('Error adding task:', err);
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      // Added forward slash to ensure proper path
      const result = await axios.patch(`/update/${id}`, isComplete, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
      return result.data;
    } catch (err) {
      console.error('Error setting completion:', err);
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      const result = await axios.delete(`/delete/${id}`);
      return result.data;
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  }
};