import axios from 'axios';

const API = axios.create({

  baseURL: 'http://localhost:5000/api',

// baseURL: 'https://docmanager-backend-187y.onrender.com/api',




});

export default API;
