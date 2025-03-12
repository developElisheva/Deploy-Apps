import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_URL;

export default {
  getTasks: async () => {
    try {
      const result = await axios.get("https://todoapi-2l8v.onrender.com/getAll", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'  // הוסף את הכותרת הזו אם ה-API מצפה לה
        }
      });
      console.log('Raw response:', result.data);  // בדוק את התגובה הגולמית

      console.log("Full API Response:", result);
      if (result.status === 200) {
        console.log("Raw response from API:", result.data);
        if (Array.isArray(result.data) && result.data.length > 0) {
          return result.data;
        } else {
          console.error("Error: API response is empty or not an array!", result.data);
          return [];
        }
      } else {
        console.error("Error: Received non-OK status code", result.status);
      }
      return [];
    } catch (err) {
      console.error('Error getting tasks:', err);
      return [];
    }
  }
  ,


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
