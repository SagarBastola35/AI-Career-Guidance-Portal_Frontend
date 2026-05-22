import axios from 'axios';

// VITE_API_URL should be the base URL without a trailing /api
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,   // ✅ appends /api to the base
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
