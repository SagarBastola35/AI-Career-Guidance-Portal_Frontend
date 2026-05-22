import axios from 'axios';

// VITE_API_URL should be the base URL without trailing /api (e.g., https://your-backend.onrender.com)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,   // ✅ append /api here
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
