import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * A flexible card component with various styling options
 */
const Card = ({
  children,
  className = '',
  variant = 'elevated',
  hoverable = false,
  padding = 'md',
  rounded = 'lg',
  onClick,
  ...props
}) => {
  // Handle different card variants
  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/20';
      case 'outlined':
        return 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
      case 'filled':
        return 'bg-gray-50 dark:bg-gray-700';
      case 'ghost':
        return 'bg-transparent';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  // Handle different padding options
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-4 md:p-6';
      case 'lg':
        return 'p-6 md:p-8';
      case 'xl':
        return 'p-8 md:p-10';
      default:
        return 'p-4 md:p-6';
    }
  };

  // Handle different border radius options
  const getRoundedClasses = () => {
    switch (rounded) {
      case 'none':
        return 'rounded-none';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case '2xl':
        return 'rounded-2xl';
      case '3xl':
        return 'rounded-3xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  // Handle hover effects
  const hoverClasses = hoverable
    ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer'
    : '';

  const cardClasses = `${getVariantClasses()} ${getRoundedClasses()} ${getPaddingClasses()} ${hoverClasses} ${className}`;

  // Render as motion.div if onClick is provided
  if (onClick) {
    return (
      <motion.div
        whileHover={hoverable ? { scale: 1.005 } : {}}
        whileTap={hoverable ? { scale: 0.99 } : {}}
        className={cardClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Card Header Component
const CardHeader = ({ children, className = '', withBorder = false, ...props }) => (
  <div
    className={`pb-4 ${withBorder ? 'border-b border-gray-200 dark:border-gray-700' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Card Title Component
const CardTitle = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`} {...props}>
    {children}
  </Component>
);

// Card Subtitle Component
const CardSubtitle = ({ children, className = '', ...props }) => (
  <p className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${className}`} {...props}>
    {children}
  </p>
);

// Card Content Component
const CardContent = ({ children, className = '', ...props }) => (
  <div className={`py-4 ${className}`} {...props}>
    {children}
  </div>
);

// Card Footer Component
const CardFooter = ({ children, className = '', withBorder = false, ...props }) => (
  <div
    className={`pt-4 ${withBorder ? 'border-t border-gray-200 dark:border-gray-700' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Add display names for better dev tools
Card.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardTitle.displayName = 'Card.Title';
CardSubtitle.displayName = 'Card.Subtitle';
CardContent.displayName = 'Card.Content';
CardFooter.displayName = 'Card.Footer';

// Export all components
const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Content: CardContent,
  Footer: CardFooter,
});

export default CardComponent;

// Prop Types
const commonPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.propTypes = {
  ...commonPropTypes,
  variant: PropTypes.oneOf(['elevated', 'outlined', 'filled', 'ghost']),
  hoverable: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']),
  onClick: PropTypes.func,
};

CardHeader.propTypes = {
  ...commonPropTypes,
  withBorder: PropTypes.bool,
};

CardTitle.propTypes = {
  ...commonPropTypes,
  as: PropTypes.elementType,
};

CardSubtitle.propTypes = commonPropTypes;
CardContent.propTypes = commonPropTypes;

CardFooter.propTypes = {
  ...commonPropTypes,
  withBorder: PropTypes.bool,
};
