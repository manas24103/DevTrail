import axios from 'axios';

// Get the API base URL (auto switch between local and deployed)
const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000')
  .replace(/\/+$/, '');

console.log('API Base URL:', API_BASE_URL);

// Create main axios instance
export const api = axios.create({
  baseURL: API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Attach JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle API response format
api.interceptors.response.use(
  (response) => {
    // If the response has a data property and it's an ApiResponse, return the nested data
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Handle errors in a standard way
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(errorMessage));
  }
);

// ---------------- AUTH API ----------------
export const authApi = {
  login: (email, password) => api.post('/v1/auth/login', { email, password }),
  register: (userData) => api.post('/v1/auth/register', userData),
  getProfile: () => api.get('/v1/users/me'),
};

// ---------------- DASHBOARD ----------------
export const dashboardApi = {
  getDashboard: () => api.get('/v1/dashboard'),
};

// ---------------- LEETCODE ----------------
export const leetcodeApi = {
  getDashboard: (params = {}) => api.get('/v1/leetcode', { params }),
};

// ---------------- CODEFORCES ----------------
export const codeforcesApi = {
  getDashboard: (params = {}) => api.get('/v1/codeforces', { params }),
};

// ---------------- USER ----------------
export const userApi = {
  updateProfile: (data) => api.patch('/v1/users/me', data),
  changePassword: (data) => api.patch('/v1/users/change-password', data),
  updateHandles: (data) => api.patch('/v1/users/update-handles', data),
};

// ---------------- LEADERBOARD ----------------
export const leaderboardApi = {
  getLeaderboard: () => api.get('/leaderboard'),
};

export default api;
