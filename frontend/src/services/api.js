import axios from 'axios';

// Get the API URL from environment variables with fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Log the API URL for debugging (remove in production)
console.log('API Base URL:', API_BASE_URL);

// Create axios instance with base URL
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies, authorization headers with HTTPS
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/users/me'),
};

// Problems API
export const problemsApi = {
  getStats: () => api.get('/problems/stats'),
  getRecentActivity: () => api.get('/problems/activity'),
  getLeaderboard: () => api.get('/leaderboard'),
};

// User API
export const userApi = {
  updateProfile: (userId, data) => api.put(`/users/${userId}`, data),
  changePassword: (data) => api.post('/users/change-password', data),
};

export default api;
