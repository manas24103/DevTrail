import React from 'react';
import PropTypes from 'prop-types';

/**
 * A skeleton loading component that can be used as a placeholder for content that is loading
 */
const Skeleton = ({
  className = '',
  variant = 'text',
  width,
  height,
  rounded = 'md',
  animation = 'pulse',
  count = 1,
  ...props
}) => {
  // Handle different variants
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4';
      case 'circle':
        return 'rounded-full';
      case 'rect':
      default:
        return '';
    }
  };

  // Handle different animations
  const getAnimationClasses = () => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'wave':
        return 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-wave';
      default:
        return '';
    }
  };

  // Generate skeleton elements based on count
  const renderSkeletons = () => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className={`bg-gray-200 dark:bg-gray-700 ${getVariantClasses()} ${getAnimationClasses()} ${className}`}
        style={{
          width: width || '100%',
          height: height || 'auto',
          borderRadius: 
            variant === 'circle' 
              ? '50%' 
              : rounded === 'none' 
                ? '0' 
                : rounded === 'sm' 
                  ? '0.25rem' 
                  : rounded === 'md' 
                    ? '0.375rem' 
                    : rounded === 'lg' 
                      ? '0.5rem' 
                      : rounded === 'xl' 
                        ? '0.75rem' 
                        : rounded === '2xl' 
                          ? '1rem' 
                          : rounded === '3xl' 
                            ? '1.5rem' 
                            : '0.375rem',
        }}
        {...props}
      />
    ));
  };

  return <>{renderSkeletons()}</>;
};

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'rect', 'circle']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']),
  animation: PropTypes.oneOf(['pulse', 'wave', 'none']),
  count: PropTypes.number,
};

export default Skeleton;
