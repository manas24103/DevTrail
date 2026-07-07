import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModeProvider, useAuthMode } from './contexts/AuthModeContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import PlatformSetupPage from './pages/PlatformSetupPage';
import DiscussionsPage from './pages/DiscussionsPage';
import FeedPage from './pages/FeedPage';
import ContestsPage from './pages/ContestsPage';
import ProblemsPage from './pages/ProblemsPage';
import SettingsPage from './pages/SettingsPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <AuthModeProvider>
        <Router>
          <div className="min-h-screen bg-[#FAF6F0]">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPageWrapper />} />
              <Route path="/login" element={<AuthPageWrapper />} />
              {/* Protected Routes */}
              <Route path="/platform-setup" element={<PrivateRoute><PlatformSetupPage /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/discussions" element={<PrivateRoute><DiscussionsPage /></PrivateRoute>} />
              <Route path="/home" element={<PrivateRoute><FeedPage /></PrivateRoute>} />
              <Route path="/contests" element={<PrivateRoute><ContestsPage /></PrivateRoute>} />
              <Route path="/problems" element={<PrivateRoute><ProblemsPage /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

              {/* Catch-all */}
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
