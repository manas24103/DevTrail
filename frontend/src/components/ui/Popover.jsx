import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from '../../hooks';

/**
 * Popover component that shows floating content relative to a trigger
 */
const Popover = ({
  trigger = 'click',
  placement = 'bottom-start',
  content,
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  className = '',
  overlayClassName = '',
  arrow = true,
  closeOnClickOutside = true,
  closeOnEsc = true,
  offset = 8,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [positionStyle, setPositionStyle] = useState({});
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  // Use controlled state if provided
  const isControlled = controlledIsOpen !== undefined;
  const isPopoverOpen = isControlled ? controlledIsOpen : isOpen;

  // Calculate popover position
  const updatePosition = () => {
    if (!popoverRef.current || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;
    let transformOrigin = '';

    // Calculate position based on placement
    switch (placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - offset + scrollY;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + scrollX;
        transformOrigin = 'center bottom';
        break;
      case 'top-start':
        top = triggerRect.top - popoverRect.height - offset + scrollY;
        left = triggerRect.left + scrollX;
        transformOrigin = 'left bottom';
        break;
      case 'top-end':
        top = triggerRect.top - popoverRect.height - offset + scrollY;
        left = triggerRect.right - popoverRect.width + scrollX;
        transformOrigin = 'right bottom';
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + scrollY;
        left = triggerRect.right + offset + scrollX;
        transformOrigin = 'left center';
        break;
      case 'right-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.right + offset + scrollX;
        transformOrigin = 'left top';
        break;
      case 'right-end':
        top = triggerRect.bottom - popoverRect.height + scrollY;
        left = triggerRect.right + offset + scrollX;
        transformOrigin = 'left bottom';
        break;
      case 'bottom':
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + scrollX;
        transformOrigin = 'center top';
        break;
      case 'bottom-start':
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + scrollX;
        transformOrigin = 'left top';
        break;
      case 'bottom-end':
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.right - popoverRect.width + scrollX;
        transformOrigin = 'right top';
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + scrollY;
        left = triggerRect.left - popoverRect.width - offset + scrollX;
        transformOrigin = 'right center';
        break;
      case 'left-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.left - popoverRect.width - offset + scrollX;
        transformOrigin = 'right top';
        break;
      case 'left-end':
        top = triggerRect.bottom - popoverRect.height + scrollY;
        left = triggerRect.left - popoverRect.width - offset + scrollX;
        transformOrigin = 'right bottom';
        break;
      default:
        break;
    }

    // Adjust position to keep popover in viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check right edge
    if (left + popoverRect.width > viewportWidth + scrollX) {
      left = viewportWidth - popoverRect.width - offset + scrollX;
      
      // If we adjusted from left to right, update transform origin
      if (placement.includes('left')) {
        transformOrigin = transformOrigin.replace('right', 'left');
      } else if (placement.includes('right')) {
        transformOrigin = transformOrigin.replace('left', 'right');
      }
    }

    // Check left edge
    if (left < scrollX) {
      left = offset + scrollX;
      
      // If we adjusted from right to left, update transform origin
      if (placement.includes('right')) {
        transformOrigin = transformOrigin.replace('right', 'left');
      } else if (placement.includes('left')) {
        transformOrigin = transformOrigin.replace('left', 'right');
      }
    }

    // Check bottom edge
    if (top + popoverRect.height > viewportHeight + scrollY) {
      // If popover would go below viewport, try to position it above
      if (placement.includes('bottom')) {
        top = triggerRect.top - popoverRect.height - offset + scrollY;
        transformOrigin = transformOrigin.replace('top', 'bottom');
      } else {
        top = viewportHeight - popoverRect.height - offset + scrollY;
      }
    }

    // Check top edge
    if (top < scrollY) {
      // If popover would go above viewport, try to position it below
      if (placement.includes('top')) {
        top = triggerRect.bottom + offset + scrollY;
        transformOrigin = transformOrigin.replace('bottom', 'top');
      } else {
        top = offset + scrollY;
      }
    }

    setPositionStyle({ 
      top: `${top}px`, 
      left: `${left}px`,
      transformOrigin,
    });
  };

  // Open popover
  const openPopover = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenChange?.(true);
    
    // Update position after a small delay to ensure popover is rendered
    setTimeout(updatePosition, 10);
  };

  // Close popover
  const closePopover = () => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onOpenChange?.(false);
  };

  // Toggle popover
  const togglePopover = () => {
    if (isPopoverOpen) {
      closePopover();
    } else {
      openPopover();
    }
  };

  // Handle click outside
  useOnClickOutside(popoverRef, (event) => {
    if (closeOnClickOutside && isPopoverOpen && !triggerRef.current.contains(event.target)) {
      closePopover();
    }
  });

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEsc && isPopoverOpen) {
        closePopover();
      }
    };

    if (isPopoverOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPopoverOpen, closeOnEsc]);

  // Update position on scroll and resize
  useEffect(() => {
    if (isPopoverOpen) {
      updatePosition();
      
      const handleScroll = () => {
        if (isPopoverOpen) {
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
  }, [isPopoverOpen, placement, content]);

  // Event handlers for trigger
  const eventHandlers = {
    click: {
      onClick: togglePopover,
    },
    hover: {
      onMouseEnter: openPopover,
      onMouseLeave: closePopover,
      onFocus: openPopover,
      onBlur: closePopover,
    },
  };

  // Get event handlers based on trigger type
  const getEventHandlers = () => {
    if (trigger === 'click') {
      return eventHandlers.click;
    } else if (trigger === 'hover') {
      return eventHandlers.hover;
    }
    return {};
  };

  // Arrow position styles
  const getArrowPosition = () => {
    const baseStyle = 'absolute w-2 h-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 transform rotate-45';
    
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return `${baseStyle} bottom-[-6px] left-1/2 -translate-x-1/2 border-t-0 border-l-0`;
      case 'right':
      case 'right-start':
      case 'right-end':
        return `${baseStyle} left-[-6px] top-1/2 -translate-y-1/2 border-r-0 border-t-0`;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return `${baseStyle} top-[-6px] left-1/2 -translate-x-1/2 border-b-0 border-r-0`;
      case 'left':
      case 'left-start':
      case 'left-end':
        return `${baseStyle} right-[-6px] top-1/2 -translate-y-1/2 border-b-0 border-l-0`;
      default:
        return '';
    }
  };

  // Animation variants
  const variants = {
    hidden: { 
      opacity: 0, 
      y: placement.includes('top') ? 5 : placement.includes('bottom') ? -5 : 0,
      x: placement.includes('left') ? 5 : placement.includes('right') ? -5 : 0,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 300,
      },
    },
    exit: { 
      opacity: 0, 
      y: placement.includes('top') ? 5 : placement.includes('bottom') ? -5 : 0,
      x: placement.includes('left') ? 5 : placement.includes('right') ? -5 : 0,
      scale: 0.95,
      transition: { 
        duration: 0.1,
      },
    },
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger element */}
      <div
        ref={triggerRef}
        className="inline-flex items-center"
        aria-haspopup="true"
        aria-expanded={isPopoverOpen}
        {...getEventHandlers()}
        {...props}
      >
        {children}
      </div>

      {/* Popover */}
      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            ref={popoverRef}
            className={`fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${overlayClassName}`}
            style={positionStyle}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            role="dialog"
            aria-modal="true"
          >
            {typeof content === 'function' ? content({ close: closePopover }) : content}
            {arrow && <div className={getArrowPosition()}></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Popover.propTypes = {
  /** The trigger type - 'click' or 'hover' */
  trigger: PropTypes.oneOf(['click', 'hover']),
  /** The position of the popover relative to the trigger */
  placement: PropTypes.oneOf([
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
  ]),
  /** The content to display in the popover */
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /** The trigger element */
  children: PropTypes.node.isRequired,
  /** Controlled open state */
  isOpen: PropTypes.bool,
  /** Callback when open state changes */
  onOpenChange: PropTypes.func,
  /** Additional class name for the trigger wrapper */
  className: PropTypes.string,
  /** Additional class name for the popover */
  overlayClassName: PropTypes.string,
  /** Show arrow pointing to the trigger element */
  arrow: PropTypes.bool,
  /** Close popover when clicking outside */
  closeOnClickOutside: PropTypes.bool,
  /** Close popover when pressing escape key */
  closeOnEsc: PropTypes.bool,
  /** Offset in pixels from the trigger */
  offset: PropTypes.number,
};

export default Popover;
