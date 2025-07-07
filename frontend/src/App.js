import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.css';

function App() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <Navbar />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/login" element={
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
            } />
            <Route path="/register" element={
              !isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />
            } />
            <Route path="/" element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} CP Dashboard. All rights reserved.</p>
          <p>
            Made with <span role="img" aria-label="heart">❤️</span> for competitive programmers
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
