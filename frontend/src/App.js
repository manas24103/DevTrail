import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModeProvider, useAuthMode } from './contexts/AuthModeContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import PlatformSetupPage from './pages/PlatformSetupPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <AuthModeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/auth" element={<AuthPageWrapper />} />
              <Route path="/platform-setup" element={<PlatformSetupPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthModeProvider>
    </AuthProvider>
  );
}

function AuthPageWrapper() {
  const { authMode } = useAuthMode();
  return <AuthPage initialMode={authMode} />;
}

export default App;
