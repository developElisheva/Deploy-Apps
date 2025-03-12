import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_URL;

export default {
  getTasks: async () => {
    try {
      const result = await axios.get(`getAll`);
      console.log("Full API Response:", result); // מדפיס את כל ה-Response
      console.log("Raw response from API:", result.data); // מדפיס את ה-data בלבד
      if (!Array.isArray(result.data)) {
        console.error("Error: API response is not an array!", result.data);
        return []; // מחזיר מערך ריק כדי למנוע קריסה
      }
      return result.data;
    } catch (err) {
      console.error('Error getting tasks:', err);
      return [];
    }
  },

  addTask: async (name) => {
    console.log('addTask', name)
    try {
      const result = await axios.post(`add?Name=${encodeURIComponent(name)}`);
      return result.data;
    } catch (err) {
      console.error('Error adding task:', err);
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await axios.patch(`update/${id}`, isComplete, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); return result.data;
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
