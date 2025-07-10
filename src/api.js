import axios from 'axios';

const API = axios.create({
  baseURL: 'https://docmanager-backend-187y.onrender.com/api',
});

export default API;
