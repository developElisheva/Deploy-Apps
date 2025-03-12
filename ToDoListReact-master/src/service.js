import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_URL;

export default {
  getTasks: async () => {
    try {
      const result = await axios.get(`getAll`);
      console.log("Raw response:", result);
      console.log("Data:", result.data, "Type:", typeof result.data, "Is Array:", Array.isArray(result.data));
      return Array.isArray(result.data) ? result.data : (result.data.data || []); // ניסיון לשלוף מתוך אובייקט אם עטוף
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
      const result = await axios.patch(`update/${id}?IsComplete=${isComplete}`);
      return result.data;
    } catch (err) {
      console.error('Error setting completion:', err);
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      const result = await axios.delete(`/deleteItem/${id}`);
      return result.data;
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  }

};
