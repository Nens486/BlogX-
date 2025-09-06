import axios from 'axios';

// Create a new Axios instance
const apiClient = axios.create({
  // Set the baseURL using the environment variable from Vite
  baseURL: import.meta.env.VITE_API_URL
});

export default apiClient;