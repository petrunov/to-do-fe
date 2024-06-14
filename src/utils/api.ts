import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://to-do-be-3c75fb216ab6.herokuapp.com', // ToDo: Replace with env variable
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
