import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Trophy, Code2, Settings, RefreshCw, HelpCircle, LogOut, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ onRefresh, refreshing }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Trophy, label: 'Contests', path: '/contests' },
    { icon: Code2, label: 'Problems', path: '/problems' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={`hidden lg:flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} min-h-[calc(100vh-64px)] sticky top-16`}>
      
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 z-10 transition-all"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* User Profile */}
      <div className={`p-5 border-b border-gray-100 ${collapsed ? 'items-center' : ''}`}>
        <div className={`flex ${collapsed ? 'justify-center' : 'flex-col items-center gap-3'}`}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center shadow-sm flex-shrink-0">
            <User size={28} className="text-teal-700" />
          </div>
          {!collapsed && (
            <div className="text-center">
              <h3 className="font-bold text-sm text-gray-900">
                {currentUser?.name || 'Siddharth Singh'}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                @{currentUser?.email?.split('@')[0] || 'siddharthsingh'}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
                  <Code2 size={10} className="text-gray-500" />
                </div>
                <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
                  <User size={10} className="text-gray-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Public Profile Toggle */}
        {!collapsed && (
          <div className="mt-4 flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Public Profile</span>
            <button
              onClick={() => setPublicProfile(!publicProfile)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${publicProfile ? 'bg-teal-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${publicProfile ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive(path)
                ? 'bg-teal-50 text-teal-700 font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <Icon size={18} className={isActive(path) ? 'text-teal-600' : 'text-gray-400'} />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Refresh Data Button */}
      <div className="p-3">
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
            refreshing
              ? 'bg-teal-100 text-teal-600'
              : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm glow-btn'
          }`}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          {!collapsed && (refreshing ? 'Syncing...' : 'Refresh Data')}
        </button>
      </div>

      {/* Bottom links */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <button className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all ${collapsed ? 'justify-center' : ''}`}>
          <HelpCircle size={16} />
          {!collapsed && 'Help Center'}
        </button>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={16} />
          {!collapsed && 'Log Out'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
