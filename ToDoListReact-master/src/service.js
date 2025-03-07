import axios from 'axios';

// const apiUrl = "http://localhost:5011"
axios.defaults.baseURL = "http://localhost:5011/";

export default {
  getTasks: async () => {
    try {
      const result = await axios.get(`getAll`)
      return result.data;
    } catch (err) {
      console.error('Error getting tasks:', err);
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
