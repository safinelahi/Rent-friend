import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Your future backend URL
});

// Automatically attach the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rf_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 