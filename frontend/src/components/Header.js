import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Moon, Sun } from 'lucide-react';
import { useAuthMode } from '../contexts/AuthModeContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { authMode, setAuthMode } = useAuthMode();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Question Tracker", path: "/tracker" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300">
            <Zap size={16} className="text-white" />
          </div>
          <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">DevTrail</span>
        </Link>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {/* Desktop Nav */}
          <nav className="flex items-center gap-4 text-sm font-medium">
            {navItems.map((item, i) => (
              <React.Fragment key={item.name}>
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-teal-600 bg-teal-50/50 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}

                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"></span>
                  )}
                </Link>

                {i === 0 && (
                  <span className="text-gray-300 select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isDarkMode ? (
              <Sun size={18} className="text-gray-600 relative z-10" />
            ) : (
              <Moon size={18} className="text-gray-600 relative z-10" />
            )}
          </button>

          {/* Auth Toggle */}
          <div className="flex items-center bg-gray-100/80 rounded-xl p-1 backdrop-blur-sm">
            <button
              onClick={() => { setAuthMode('login'); navigate('/auth'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                authMode === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setAuthMode('signup'); navigate('/auth'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                authMode === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isMobileMenuOpen ? (
              <X size={20} className="text-gray-600 relative z-10" />
            ) : (
              <Menu size={20} className="text-gray-600 relative z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-lg">
          <div className="px-6 py-6 space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-teal-600 bg-teal-50/50 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200/60 pt-4 space-y-3">
              <div className="flex items-center bg-gray-100/80 rounded-xl p-1 backdrop-blur-sm">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    authMode === 'login'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    authMode === 'signup'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>
              
              {/* Dark Mode Toggle Mobile */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 transition-all duration-300 backdrop-blur-sm"
              >
                {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;