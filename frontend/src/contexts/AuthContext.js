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
      setCurrentUser(response.data.data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      if (err.response?.status === 401) {
        // Token expired or invalid, clear it
        localStorage.removeItem('token');
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
      setLoading(true);
      const response = await authApi.login(email, password);
      const { token, data: user } = response.data;
      
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      // Set the current user
      setCurrentUser(user);
      
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError('');
      const response = await authApi.register(userData);
      const { token, data: user } = response.data;
      
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      // Set the current user
      setCurrentUser(user);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
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
        ...response.data.data,
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

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updateUser,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
