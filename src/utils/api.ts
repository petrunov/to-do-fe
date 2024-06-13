import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // ToDo: Replace with env variable
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
