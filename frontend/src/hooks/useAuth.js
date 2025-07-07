import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../components/ui';

// Create auth context
const AuthContext = createContext(null);

/**
 * AuthProvider component that wraps your app and makes auth object available to any child component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Set the auth token for axios requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          // Replace with your API endpoint to get current user
          const response = await axios.get('/api/auth/me');
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      // Replace with your login API endpoint
      const response = await axios.post('/api/auth/login', credentials);
      const { token: authToken, user: userData } = response.data;
      
      setToken(authToken);
      setUser(userData);
      
      // Redirect to the previous location or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      
      toast.success('Successfully logged in!');
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [location.state, navigate, toast]);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      // Replace with your register API endpoint
      const response = await axios.post('/api/auth/register', userData);
      const { token: authToken, user: userData } = response.data;
      
      setToken(authToken);
      setUser(userData);
      
      // Redirect to home after registration
      navigate('/', { replace: true });
      
      toast.success('Registration successful! Welcome!');
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Call logout API if needed
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth state
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      
      // Redirect to login page
      navigate('/login');
      toast.success('You have been logged out.');
    }
  }, [navigate, toast]);

  // Update user data
  const updateUser = useCallback((userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  }, []);

  // The value that will be passed to the context consumers
  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading: loading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
