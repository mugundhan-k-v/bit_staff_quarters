import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Ensure credentials are sent with each request
});

export default instance;