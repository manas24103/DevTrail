import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from '../../hooks';

/**
 * Tooltip component that shows additional information on hover or focus
 */
const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 100,
  showOnClick = false,
  className = '',
  tooltipClassName = '',
  arrow = true,
  disabled = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [positionStyle, setPositionStyle] = useState({});
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  let timeoutId = null;

  // Calculate tooltip position
  const updatePosition = () => {
    if (!tooltipRef.current || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8 + scrollY;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2 + scrollX;
        break;
      case 'top-start':
        top = triggerRect.top - tooltipRect.height - 8 + scrollY;
        left = triggerRect.left + scrollX;
        break;
      case 'top-end':
        top = triggerRect.top - tooltipRect.height - 8 + scrollY;
        left = triggerRect.right - tooltipRect.width + scrollX;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2 + scrollY;
        left = triggerRect.right + 8 + scrollX;
        break;
      case 'right-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.right + 8 + scrollX;
        break;
      case 'right-end':
        top = triggerRect.bottom - tooltipRect.height + scrollY;
        left = triggerRect.right + 8 + scrollX;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8 + scrollY;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2 + scrollX;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + 8 + scrollY;
        left = triggerRect.left + scrollX;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + 8 + scrollY;
        left = triggerRect.right - tooltipRect.width + scrollX;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2 + scrollY;
        left = triggerRect.left - tooltipRect.width - 8 + scrollX;
        break;
      case 'left-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.left - tooltipRect.width - 8 + scrollX;
        break;
      case 'left-end':
        top = triggerRect.bottom - tooltipRect.height + scrollY;
        left = triggerRect.left - tooltipRect.width - 8 + scrollX;
        break;
      default:
        break;
    }

    // Adjust position to keep tooltip in viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check right edge
    if (left + tooltipRect.width > viewportWidth + scrollX) {
      left = viewportWidth - tooltipRect.width - 8 + scrollX;
    }

    // Check left edge
    if (left < scrollX) {
      left = 8 + scrollX;
    }


    // Check bottom edge
    if (top + tooltipRect.height > viewportHeight + scrollY) {
      // If tooltip would go below viewport, try to position it above
      if (position.includes('bottom')) {
        top = triggerRect.top - tooltipRect.height - 8 + scrollY;
      } else {
        top = viewportHeight - tooltipRect.height - 8 + scrollY;
      }
    }

    // Check top edge
    if (top < scrollY) {
      // If tooltip would go above viewport, try to position it below
      if (position.includes('top')) {
        top = triggerRect.bottom + 8 + scrollY;
      } else {
        top = 8 + scrollY;
      }
    }

    setPositionStyle({ top: `${top}px`, left: `${left}px` });
  };

  // Show tooltip with delay
  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      setIsMounted(true);
      setIsVisible(true);
      // Update position after a small delay to ensure tooltip is rendered
      setTimeout(updatePosition, 10);
    }, delay);
  };

  // Hide tooltip
  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    setIsVisible(false);
    
    // Wait for exit animation to complete before unmounting
    setTimeout(() => {
      if (!isVisible) {
        setIsMounted(false);
      }
    }, 200);
  };

  // Handle click outside
  useOnClickOutside(tooltipRef, () => {
    if (showOnClick && isVisible) {
      hideTooltip();
    }
  });

  // Handle click to toggle
  const handleClick = (e) => {
    if (showOnClick) {
      e.preventDefault();
      e.stopPropagation();
      
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  // Update position on scroll and resize
  useEffect(() => {
    if (isVisible) {
      updatePosition();
      
      const handleScroll = () => {
        if (isVisible) {
          updatePosition();
        }
      };
      
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, position]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Arrow position styles
  const getArrowPosition = () => {
    const baseStyle = 'absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45';
    
    switch (position) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return `${baseStyle} bottom-[-4px] left-1/2 -translate-x-1/2`;
      case 'right':
      case 'right-start':
      case 'right-end':
        return `${baseStyle} left-[-4px] top-1/2 -translate-y-1/2`;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return `${baseStyle} top-[-4px] left-1/2 -translate-x-1/2`;
      case 'left':
      case 'left-start':
      case 'left-end':
        return `${baseStyle} right-[-4px] top-1/2 -translate-y-1/2`;
      default:
        return '';
    }
  };

  // Animation variants
  const variants = {
    hidden: { 
      opacity: 0, 
      y: position.includes('top') ? 5 : position.includes('bottom') ? -5 : 0,
      x: position.includes('left') ? 5 : position.includes('right') ? -5 : 0,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 300 
      } 
    },
    exit: { 
      opacity: 0, 
      y: position.includes('top') ? 5 : position.includes('bottom') ? -5 : 0,
      x: position.includes('left') ? 5 : position.includes('right') ? -5 : 0,
      scale: 0.95,
      transition: { duration: 0.1 } 
    }
  };

  // Don't render anything if disabled
  if (disabled) {
    return children;
  }

  return (
    <div className="relative inline-block">
      {/* Trigger element */}
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        onMouseEnter={!showOnClick ? showTooltip : undefined}
        onMouseLeave={!showOnClick ? hideTooltip : undefined}
        onFocus={!showOnClick ? showTooltip : undefined}
        onBlur={!showOnClick ? hideTooltip : undefined}
        onClick={handleClick}
        role={showOnClick ? 'button' : undefined}
        tabIndex={showOnClick ? 0 : undefined}
        {...props}
      >
        {children}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isMounted && (
          <motion.div
            ref={tooltipRef}
            className={`fixed z-50 py-1.5 px-3 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg ${tooltipClassName}`}
            style={positionStyle}
            initial="hidden"
            animate={isVisible ? "visible" : "exit"}
            exit="exit"
            variants={variants}
            role="tooltip"
          >
            {content}
            {arrow && <div className={getArrowPosition()}></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.propTypes = {
  /** The trigger element that will show the tooltip on hover or click */
  children: PropTypes.node.isRequired,
  /** The content to display in the tooltip */
  content: PropTypes.node.isRequired,
  /** The position of the tooltip relative to the trigger */
  position: PropTypes.oneOf([
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
  ]),
  /** Delay in milliseconds before showing the tooltip */
  delay: PropTypes.number,
  /** Show tooltip on click instead of hover */
  showOnClick: PropTypes.bool,
  /** Additional class name for the trigger element */
  className: PropTypes.string,
  /** Additional class name for the tooltip */
  tooltipClassName: PropTypes.string,
  /** Show arrow pointing to the trigger element */
  arrow: PropTypes.bool,
  /** Disable the tooltip */
  disabled: PropTypes.bool,
};

export default Tooltip;
