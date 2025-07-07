import React from 'react';
import PropTypes from 'prop-types';

/**
 * A full-page loading spinner with optional message
 */
const PageLoader = ({ message = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${className}`}>
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 border-4 border-primary-100 dark:border-gray-700 rounded-full"></div>
        
        {/* Inner circle with animation */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-primary-500 border-r-primary-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full"></div>
      </div>
      
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

PageLoader.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default PageLoader;
