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

// ---------------- AUTH API ----------------
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/users/me'),
};

// ---------------- LEETCODE (via backend) ----------------
// NOTE: All calls now go to your backend -> backend fetches from Alfa API
export const leetcodeApi = {
  getProfile: (username) => api.get(`/leetcode/${username}`),
  getSolved: (username) => api.get(`/leetcode/${username}/solved`),
  getContests: (username) => api.get(`/leetcode/${username}/contest/history`),
  getDailyChallenge: () => api.get('/leetcode/daily'),
};

// ---------------- CODEFORCES (via backend) ----------------
// Updated to match backend routes in backend/routes/codeforces.routes.js
export const codeforcesApi = {
  getStats: (handle) => api.get(`/codeforces/user/${handle}`),
  getUserRating: (handle) => api.get(`/codeforces/rating/${handle}`),
  getSubmissions: (handle, count = 50) => api.get(`/codeforces/submissions/${handle}`, { params: { count } }),
};

// ---------------- LEADERBOARD ----------------
export const leaderboardApi = {
  getLeaderboard: () => api.get('/leaderboard'),
};

// ---------------- USER ----------------
export const userApi = {
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.post('/users/change-password', data),
};

export default api;
