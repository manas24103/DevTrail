import axios from 'axios';

// Get the API base URL (auto switch between local and deployed)
const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000')
  .replace(/\/+$/, '');

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
    const customError = new Error(errorMessage);
    customError.response = error.response;
    customError.status = error.response?.status;
    return Promise.reject(customError);
  }
);

// ---------------- AUTH API ----------------
export const authApi = {
  login: (email, password) => api.post('/v1/auth/login', { email, password }),
  register: (userData) => api.post('/v1/auth/register', userData),
  getProfile: () => api.get('/v1/auth/me'),
  loginWithGoogle: (code, redirectUri, mode) => api.post('/v1/auth/google', { code, redirectUri, mode }),
  loginWithGitHub: (code, mode) => api.post('/v1/auth/github', { code, mode }),
  getVerificationToken: () => api.post('/v1/auth/verification-token'),
  verifyHandle: (platform, handle) => api.post('/v1/auth/verify-handle', { platform, handle }),
};

// ---------------- DASHBOARD ----------------
export const dashboardApi = {
  getDashboard: () => api.get('/v1/dashboard'),
};

// ---------------- LEETCODE ----------------
export const leetcodeApi = {
  getDashboard: (params = {}) => api.get('/v1/leetcode/stats', { params }),
};

// ---------------- CODEFORCES ----------------
export const codeforcesApi = {
  getDashboard: (params = {}) => api.get('/v1/codeforces/stats', { params }),
};

// ---------------- USER ----------------
export const userApi = {
  updateProfile: (data) => api.patch('/v1/auth/me', data),
  changePassword: (data) => api.post('/v1/auth/change-password', data),
  updateHandles: (data) => api.patch('/v1/auth/update-handles', data),
};

// ---------------- LEADERBOARD ----------------
export const leaderboardApi = {
  getLeaderboard: () => api.get('/leaderboard'),
};

// ---------------- DISCUSSIONS ----------------
export const discussionsApi = {
  getThreads: (params = {}) => api.get('/v1/discussions', { params }),
  createThread: (data) => api.post('/v1/discussions', data),
  postReply: (id, body) => api.post(`/v1/discussions/${id}/replies`, { body }),
  toggleUpvote: (id) => api.post(`/v1/discussions/${id}/upvote`),
  incrementViews: (id) => api.post(`/v1/discussions/${id}/view`),
  deleteThread: (id) => api.delete(`/v1/discussions/threads/${id}`),
  deleteReply: (threadId, replyId) => api.delete(`/v1/discussions/threads/${threadId}/replies/${replyId}`),
};

// ---------------- CONTESTS ----------------
export const contestsApi = {
  getContests: () => api.get('/v1/contests'),
};

export default api;
