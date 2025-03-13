import axios from 'axios';

// תמיד להשתמש ב-URL המלא
const API_BASE_URL = 'https://todoapi-2l8v.onrender.com';

export default {
  getTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/selectAll`);
      if (!response.ok) return [];
      
      const text = await response.text();
      if (!text) return [];
      
      const data = JSON.parse(text);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return [];
    }
  },
  
  addTask: async (name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add?Name=${encodeURIComponent(name)}`, {
        method: 'POST'
      });
      return response.ok;
    } catch (err) {
      return false;
    }
  },
  
  setCompleted: async (id, isComplete) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isComplete)
      });
      return response.ok;
    } catch (err) {
      return false;
    }
  },
  
  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (err) {
      return false;
    }
  }
};