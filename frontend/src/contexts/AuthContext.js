import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await authApi.getProfile();
      setCurrentUser(response?.user || response);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      if (err.status === 401 || err.response?.status === 401 || err.message?.includes('jwt malformed')) {
        // Token expired or invalid, clear it
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Update user data in context
  const updateUser = (userData) => {
    setCurrentUser(prev => ({
      ...prev,
      ...userData
    }));
  };

  // Login function
  const login = async (email, password) => {
    try {
      setError('');
      const response = await authApi.login(email, password);
      const { accessToken, user } = response;

      // Store the token in localStorage
      localStorage.setItem('token', accessToken);

      // Set the current user
      setCurrentUser(user);

      return { success: true, user };
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError('');

      const payload = {
        fullName: userData.name,
        email: userData.email,
        password: userData.password
      };

      const response = await authApi.register(payload);
      console.log('Registration response:', response);

      // Handle successful registration: extract token and user details
      const token = response?.accessToken || response?.token;
      const user = response?.user || response;

      if (token) {
        localStorage.setItem('token', token);
      }

      if (user && (user._id || user.email)) {
        setCurrentUser(user);
        return { success: true, user };
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  // Logout function
  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Clear the current user
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = async (data) => {
    try {
      const response = await authApi.getProfile();
      setCurrentUser(prev => ({
        ...prev,
        ...(response?.user || response),
        ...data
      }));
      return { success: true };
    } catch (err) {
      console.error('Error updating profile:', err);
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to update profile'
      };
    }
  };

  // Login with Google
  const loginWithGoogle = async (code, redirectUri, mode) => {
    try {
      setError('');
      const response = await authApi.loginWithGoogle(code, redirectUri, mode);
      const { accessToken, user } = response;
      if (accessToken) {
        localStorage.setItem('token', accessToken);
      }
      if (user) {
        setCurrentUser(user);
        return { success: true, user };
      }
      return { success: false, error: 'Failed to retrieve profile' };
    } catch (err) {
      console.error('Google login error:', err);
      const errorMessage = err.message || 'Google login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login with GitHub
  const loginWithGitHub = async (code, mode) => {
    try {
      setError('');
      const response = await authApi.loginWithGitHub(code, mode);
      const { accessToken, user } = response;
      if (accessToken) {
        localStorage.setItem('token', accessToken);
      }
      if (user) {
        setCurrentUser(user);
        return { success: true, user };
      }
      return { success: false, error: 'Failed to retrieve profile' };
    } catch (err) {
      console.error('GitHub login error:', err);
      const errorMessage = err.message || 'GitHub login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updateUser,
    loginWithGoogle,
    loginWithGitHub,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
