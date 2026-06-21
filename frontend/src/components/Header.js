import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAuthMode } from '../contexts/AuthModeContext';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { setAuthMode } = useAuthMode();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5 text-lg font-bold transition-all duration-300 hover:scale-105">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <span className="font-outfit font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            DevTrail
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <nav className="flex items-center gap-1 text-sm font-medium">
            <Link
              to="/leaderboard"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/leaderboard')
                  ? 'text-teal-700 bg-teal-50 font-semibold'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Leaderboard
            </Link>
            <span className="text-gray-300 select-none">|</span>
            <Link
              to="/discussions"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/discussions')
                  ? 'text-teal-700 bg-teal-50 font-semibold'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Question Tracker
            </Link>
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            {isDark ? <Sun size={18} className="text-gray-600" /> : <Moon size={18} className="text-gray-600" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50/60 border border-teal-100/40 hover:bg-teal-50 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-600/10 flex items-center justify-center">
                  <User size={14} className="text-teal-800" />
                </div>
                <span className="text-sm font-semibold text-teal-950">
                  {currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setAuthMode('login'); navigate('/auth'); }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                Login
              </button>
              <button
                onClick={() => { setAuthMode('signup'); navigate('/auth'); }}
                className="px-5 py-2 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200 shadow-sm glow-btn"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
        >
          {mobileOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-lg">
          <div className="px-6 py-5 space-y-3">
            <Link to="/leaderboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
              Leaderboard
            </Link>
            <Link to="/discussions" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
              Question Tracker
            </Link>

            <div className="pt-3 border-t border-gray-200/60 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-teal-700 bg-teal-50">
                    Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setAuthMode('login'); navigate('/auth'); setMobileOpen(false); }} className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 text-left">
                    Login
                  </button>
                  <button onClick={() => { setAuthMode('signup'); navigate('/auth'); setMobileOpen(false); }} className="w-full px-4 py-3 rounded-xl text-sm font-bold bg-teal-600 text-white text-center">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;