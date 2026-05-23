import axios from 'axios';

// VITE_API_URL must be the backend ROOT URL (without /api)
const API_BASE = import.meta.env.VITE_API_URL || 'https://ai-career-guidance-portal-backend-14.onrender.com';

const axiosInstance = axios.create({
  baseURL: `${API_BASE}`,   // appends /api once
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
