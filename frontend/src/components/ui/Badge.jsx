import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Badge component for displaying status indicators, labels, and counts
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  dot = false,
  showDot = false,
  dotPosition = 'left',
  className = '',
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    light: 'bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    dark: 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800',
    outline: 'bg-transparent border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200',
    'primary-outline': 'bg-transparent border border-primary-500 text-primary-700 dark:border-primary-400 dark:text-primary-300',
    'success-outline': 'bg-transparent border border-green-500 text-green-700 dark:border-green-400 dark:text-green-300',
    'danger-outline': 'bg-transparent border border-red-500 text-red-700 dark:border-red-400 dark:text-red-300',
    'warning-outline': 'bg-transparent border border-yellow-500 text-yellow-700 dark:border-yellow-400 dark:text-yellow-300',
    'info-outline': 'bg-transparent border border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-300',
  };

  // Size styles
  const sizeStyles = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-0.5',
    xl: 'text-base px-3 py-1',
  };

  // Dot styles
  const dotStyles = {
    default: 'h-1.5 w-1.5',
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
    xl: 'h-3 w-3',
  };

  // Get dot color based on variant
  const getDotColor = () => {
    if (variant.includes('outline')) {
      const baseVariant = variant.replace('-outline', '');
      return `bg-${baseVariant}-500 dark:bg-${baseVariant}-400`;
    }
    return `bg-${variant}-500`;
  };

  // Dot component
  const Dot = () => (
    <span
      className={classNames(
        'inline-block rounded-full',
        dotStyles[size] || dotStyles['md'],
        getDotColor()
      )}
      aria-hidden="true"
    />
  );

  // Rounded styles
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  // Build the class names
  const badgeClasses = classNames(
    'inline-flex items-center font-medium whitespace-nowrap',
    variantStyles[variant] || variantStyles['default'],
    sizeStyles[size] || sizeStyles['md'],
    roundedStyles[rounded] || 'rounded-full',
    className
  );

  // If it's just a dot, return only the dot
  if (dot) {
    return <Dot />;
  }

  return (
    <span className={badgeClasses} {...props}>
      {showDot && dotPosition === 'left' && (
        <Dot className="mr-1.5" />
      )}
      {children}
      {showDot && dotPosition === 'right' && (
        <Dot className="ml-1.5" />
      )}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'outline',
    'primary-outline',
    'success-outline',
    'danger-outline',
    'warning-outline',
    'info-outline',
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
  dot: PropTypes.bool,
  showDot: PropTypes.bool,
  dotPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

export default Badge;
