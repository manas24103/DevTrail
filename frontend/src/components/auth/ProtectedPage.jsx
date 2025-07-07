import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';

/**
 * A layout component that ensures the user is authenticated before rendering its children.
 * If not authenticated, it will redirect to the login page.
 * This is an alternative to using the PrivateRoute component.
 */
const ProtectedPage = ({ children, roles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    // Check if user has required roles
    if (isAuthenticated && roles.length > 0) {
      const hasRequiredRole = roles.some(role => user.roles?.includes(role));
      
      if (!hasRequiredRole) {
        // User doesn't have the required role, redirect to home or unauthorized page
        navigate('/unauthorized', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, navigate, roles, user?.roles]);

  // Show loading state while checking auth status
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // User is authenticated and has required role, render the children
  return children;
};

ProtectedPage.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedPage;
