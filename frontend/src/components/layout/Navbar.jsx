import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span role="img" aria-label="Trophy" style={{ marginRight: '8px' }}>🏆</span>
          CP Dashboard
        </Link>
        
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
        
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span role="img" aria-hidden="true">📊</span> Dashboard
              </Link>
              <div className="nav-dropdown">
                <button className="nav-link dropdown-toggle">
                  <span role="img" aria-hidden="true">👤</span> {user.username}
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                    <span role="img" aria-hidden="true">⚙️</span> Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item">
                    <span role="img" aria-hidden="true">🚪</span> Logout
                  </button>
                </div>
              </div>
              <div className="theme-toggle-container">
                <ThemeToggle />
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
              <div className="theme-toggle-container">
                <ThemeToggle />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
