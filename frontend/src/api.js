import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://online-event-mangment.vercel.app/api' });

// Automatically attaches the token from local storage to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API; 