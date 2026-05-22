import axios from 'axios';

// VITE_API_URL must be the backend ROOT URL (without /api)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,   // appends /api once
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
