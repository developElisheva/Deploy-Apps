import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_URL;

export default {
  getTasks: async () => {
    try {
      console.log('Requesting:', `${process.env.REACT_APP_URL}/selectAll`);

      console.log('Requesting:', `${process.env.REACT_APP_URL}/selectAll`);

      const result = await axios.get(`${process.env.REACT_APP_URL}/selectAll`);
      console.log('Data received from API:', result.data);
      if (Array.isArray(result.data)) {
        console.log('Data is array:', result.data);
      } else {
        console.log('Data is not an array');
      }

      return result.data || []; // מחזיר מערך ריק אם הנתונים הם undefined
    } catch (err) {
      console.error('שגיאה בהבאת המשימות:', err);
      return []; // מחזיר מערך ריק במקרה של שגיאה
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
