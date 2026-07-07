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
  //const location = useLocation();

  //const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F0] border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to={isAuthenticated ? "/home" : "/"} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-[#FF3366] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-md flex items-center justify-center group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <span className="font-outfit font-black text-black text-2xl tracking-tighter">
            DEVTRAIL
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {/* Dark mode toggle */}
          {/*<button
            onClick={() => setIsDark(!isDark)}
            className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={16} className="text-black stroke-[2.5]" /> : <Moon size={16} className="text-black stroke-[2.5]" />}
          </button>*/}
          <span className="h-6 w-[2px] bg-black"></span>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-[#E0F2FE] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all font-black text-black text-xs"
              >
                <div className="w-5 h-5 rounded-md bg-white border border-black flex items-center justify-center">
                  <User size={10} className="text-black stroke-[3]" />
                </div>
                <span>
                  {currentUser?.name?.toUpperCase() || currentUser?.email?.split('@')[0]?.toUpperCase() || 'USER'}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border-2 border-black bg-white text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setAuthMode('login'); navigate('/auth'); }}
                className="px-4 py-2 text-black font-black text-xs border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all"
              >
                LOGIN
              </button>
              <button
                onClick={() => { setAuthMode('signup'); navigate('/auth'); }}
                className="px-5 py-2 border-2 border-black bg-[#FF3366] text-white font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={18} className="text-black stroke-[2.5]" /> : <Menu size={18} className="text-black stroke-[2.5]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-[3px] border-black bg-white">
          <div className="px-6 py-5 space-y-3 font-black text-sm">

            <div className="pt-3 border-t-2 border-black space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2 border-2 border-black bg-[#E0F2FE] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black text-center">
                    DASHBOARD
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full px-4 py-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black text-center">
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setAuthMode('login'); navigate('/auth'); setMobileOpen(false); }} className="w-full px-4 py-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black text-center">
                    LOGIN
                  </button>
                  <button onClick={() => { setAuthMode('signup'); navigate('/auth'); setMobileOpen(false); }} className="w-full px-4 py-2 border-2 border-black bg-[#FF3366] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center">
                    SIGN UP
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