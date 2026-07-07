import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Trophy, Code2, Settings, RefreshCw, HelpCircle, LogOut, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ onRefresh = () => {}, refreshing = false }) => {
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
    { icon: LayoutDashboard, label: 'DASHBOARD', path: '/dashboard' },
    { icon: MessageSquare, label: 'DISCUSSION', path: '/discussions' },
    { icon: Trophy, label: 'CONTESTS', path: '/contests' },
    { icon: Code2, label: 'PROBLEMS', path: '/problems' },
    { icon: Settings, label: 'SETTINGS', path: '/settings' },
  ];

  return (
    <aside className={`hidden lg:flex flex-col bg-white border-r-[3px] border-black transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} min-h-[calc(100vh-64px)] sticky top-16`}>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-md bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-gray-50 z-10 transition-all"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={10} strokeWidth={3} /> : <ChevronLeft size={10} strokeWidth={3} />}
      </button>

      {/* User Profile */}
      <div className={`border-b-2 border-black ${collapsed ? 'px-2 py-4' : 'p-5'}`}>
        <div className={`flex ${collapsed ? 'justify-center' : 'flex-col items-center gap-3'}`}>
          <div className={`rounded-xl bg-[#FFD700] border-2 border-black flex items-center justify-center flex-shrink-0 transition-all ${collapsed ? 'w-10 h-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'w-16 h-16 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'}`}>
            <User size={collapsed ? 18 : 28} className="text-black stroke-[3]" />
          </div>
          {!collapsed && (
            <div className="text-center space-y-1">
              <h3 className="font-outfit font-black text-sm text-black">
                {currentUser?.fullName?.toUpperCase()}
              </h3>
              <p className="text-xs font-bold text-gray-500">
                @{currentUser?.email?.split('@')[0]}
              </p>
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <div className="w-5 h-5 rounded border border-black bg-[#E0F2FE] flex items-center justify-center">
                  <Code2 size={10} className="text-black stroke-[2.5]" />
                </div>
                <div className="w-5 h-5 rounded border border-black bg-white flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Public Profile Toggle */}
        {!collapsed && (
          <div className="mt-4 flex items-center justify-between px-2">
            <span className="text-[10px] font-black text-black tracking-wider uppercase">Public Profile</span>
            <button
              onClick={() => setPublicProfile(!publicProfile)}
              className={`relative w-10 h-5 border-2 border-black rounded-full transition-colors duration-200 ${publicProfile ? 'bg-[#FF3366]' : 'bg-white'}`}
              aria-label="Toggle public profile"
              role="switch"
              aria-checked={publicProfile}
            >
              <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white border border-black transition-transform duration-200 ${publicProfile ? 'left-5 translate-x-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-3 py-2.5 border-2 transition-all font-black text-xs ${isActive(path)
              ? 'bg-[#FF3366] text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              : 'text-black border-transparent hover:border-black hover:bg-gray-50'
              } ${collapsed ? 'justify-center' : ''}`}
          >
            <Icon size={16} className="stroke-[2.5]" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Refresh Data Button */}
      <div className="p-3">
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-black text-black font-black text-xs transition-all ${refreshing
            ? 'bg-gray-100 cursor-not-allowed'
            : 'bg-[#FF3366] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
            }`}
        >
          <RefreshCw size={14} className={`stroke-[3.5] ${refreshing ? 'animate-spin' : ''}`} />
          {!collapsed && (refreshing ? 'SYNCING...' : 'REFRESH DATA')}
        </button>
      </div>

      {/* Bottom links */}
      <div className="p-3 border-t-2 border-black space-y-1">
        <button className={`flex items-center gap-3 w-full px-3 py-2 border-2 border-transparent hover:border-black hover:bg-gray-50 font-black text-xs text-black transition-all ${collapsed ? 'justify-center' : ''}`}>
          <HelpCircle size={16} />
          {!collapsed && 'HELP CENTER'}
        </button>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2 border-2 border-transparent hover:border-black hover:bg-rose-50 font-black text-xs text-black transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={16} />
          {!collapsed && 'LOG OUT'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
