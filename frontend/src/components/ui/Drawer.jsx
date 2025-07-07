import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside, useLockBodyScroll } from '../../hooks';
import { XIcon } from '@heroicons/react/outline';

/**
 * Drawer component that slides in from the edge of the screen
 */
const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  placement = 'right',
  size = 'md',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showCloseButton = true,
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
  ...props
}) => {
  const drawerRef = useRef(null);

  // Lock body scroll when drawer is open
  useLockBodyScroll(isOpen);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEsc && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEsc, onClose]);

  // Handle click outside
  useOnClickOutside(drawerRef, (event) => {
    if (closeOnOverlayClick && isOpen && !event.target.closest('.drawer-content')) {
      onClose?.();
    }
  });

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-64';
      case 'sm':
        return 'w-80';
      case 'md':
        return 'w-96';
      case 'lg':
        return 'w-1/2';
      case 'xl':
        return 'w-3/4';
      case 'full':
        return 'w-full h-full';
      default:
        return 'w-96';
    }
  };

  // Get placement classes
  const getPlacementClasses = () => {
    switch (placement) {
      case 'left':
        return 'left-0 top-0 bottom-0';
      case 'right':
        return 'right-0 top-0 bottom-0';
      case 'top':
        return 'top-0 left-0 right-0';
      case 'bottom':
        return 'bottom-0 left-0 right-0';
      default:
        return 'right-0 top-0 bottom-0';
    }
  };

  // Get animation variants based on placement
  const getVariants = () => {
    const distance = '100%';
    
    switch (placement) {
      case 'left':
        return {
          hidden: { x: `-${distance}`, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          },
          exit: { 
            x: `-${distance}`, 
            opacity: 0,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          }
        };
      case 'right':
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          },
          exit: { 
            x: distance, 
            opacity: 0,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          }
        };
      case 'top':
        return {
          hidden: { y: `-${distance}`, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          },
          exit: { 
            y: `-${distance}`, 
            opacity: 0,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          }
        };
      case 'bottom':
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          },
          exit: { 
            y: distance, 
            opacity: 0,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          }
        };
      default:
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          },
          exit: { 
            x: distance, 
            opacity: 0,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            } 
          }
        };
    }
  };

  // Get drawer content classes based on placement
  const getDrawerContentClasses = () => {
    const baseClasses = 'flex flex-col bg-white dark:bg-gray-800 shadow-xl';
    const sizeClasses = getSizeClasses();
    const placementClasses = getPlacementClasses();
    
    return `${baseClasses} ${sizeClasses} ${placementClasses} ${contentClassName}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${overlayClassName}`}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
          
          {/* Drawer */}
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              ref={drawerRef}
              className={getDrawerContentClasses()}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={getVariants()}
              {...props}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
                  {title && (
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {title}
                    </h3>
                  )}
                  {showCloseButton && (
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none"
                      onClick={onClose}
                    >
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
              
              {/* Body */}
              <div className={`flex-1 overflow-y-auto p-6 ${bodyClassName}`}>
                {children}
              </div>
              
              {/* Footer */}
              {footer && (
                <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${footerClassName}`}>
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Drawer Header component
const DrawerHeader = ({ children, className = '', ...props }) => (
  <div 
    className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Drawer Title component
const DrawerTitle = ({ children, className = '', ...props }) => (
  <h3 
    className={`text-lg font-medium text-gray-900 dark:text-white ${className}`}
    {...props}
  >
    {children}
  </h3>
);

// Drawer Body component
const DrawerBody = ({ children, className = '', ...props }) => (
  <div 
    className={`flex-1 overflow-y-auto p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Drawer Footer component
const DrawerFooter = ({ children, className = '', ...props }) => (
  <div 
    className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Add display names for better dev tools
Drawer.displayName = 'Drawer';
DrawerHeader.displayName = 'Drawer.Header';
DrawerTitle.displayName = 'Drawer.Title';
DrawerBody.displayName = 'Drawer.Body';
DrawerFooter.displayName = 'Drawer.Footer';

// Export Drawer with subcomponents
const DrawerComponent = Object.assign(Drawer, {
  Header: DrawerHeader,
  Title: DrawerTitle,
  Body: DrawerBody,
  Footer: DrawerFooter,
});

export default DrawerComponent;

// Prop Types
Drawer.propTypes = {
  /** Whether the drawer is open */
  isOpen: PropTypes.bool.isRequired,
  /** Callback when drawer is closed */
  onClose: PropTypes.func.isRequired,
  /** The content of the drawer */
  children: PropTypes.node.isRequired,
  /** The title of the drawer */
  title: PropTypes.node,
  /** The placement of the drawer */
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  /** The size of the drawer */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'full']),
  /** Close drawer when pressing escape key */
  closeOnEsc: PropTypes.bool,
  /** Close drawer when clicking outside */
  closeOnOverlayClick: PropTypes.bool,
  /** Show close button */
  showCloseButton: PropTypes.bool,
  /** Additional class name for the overlay */
  overlayClassName: PropTypes.string,
  /** Additional class name for the drawer content */
  contentClassName: PropTypes.string,
  /** Additional class name for the header */
  headerClassName: PropTypes.string,
  /** Additional class name for the body */
  bodyClassName: PropTypes.string,
  /** The footer content */
  footer: PropTypes.node,
  /** Additional class name for the footer */
  footerClassName: PropTypes.string,
};

// Default props
Drawer.defaultProps = {
  placement: 'right',
  size: 'md',
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseButton: true,
};
