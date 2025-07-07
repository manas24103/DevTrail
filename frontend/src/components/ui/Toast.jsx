import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationIcon, 
  InformationCircleIcon,
  XIcon 
} from '@heroicons/react/outline';

const iconVariants = {
  success: {
    icon: CheckCircleIcon,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    textColor: 'text-green-800 dark:text-green-200',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  error: {
    icon: XCircleIcon,
    iconColor: 'text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/30',
    textColor: 'text-red-800 dark:text-red-200',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  warning: {
    icon: ExclamationIcon,
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
    textColor: 'text-yellow-800 dark:text-yellow-200',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  info: {
    icon: InformationCircleIcon,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
    textColor: 'text-blue-800 dark:text-blue-200',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
};

/**
 * Toast Component
 * @param {Object} props
 * @param {string} [props.id] - Unique identifier for the toast
 * @param {string} [props.title] - Title of the toast
 * @param {string} [props.message] - Message content of the toast
 * @param {'success'|'error'|'warning'|'info'} [props.variant='info'] - Type of toast
 * @param {number} [props.duration=5000] - Duration in milliseconds before auto-dismiss
 * @param {boolean} [props.autoDismiss=true] - Whether to auto-dismiss the toast
 * @param {Function} [props.onDismiss] - Callback when toast is dismissed
 * @param {React.ReactNode} [props.icon] - Custom icon to override the default
 * @param {React.ReactNode} [props.action] - Action button or element to include
 */
const Toast = ({
  id,
  title,
  message,
  variant = 'info',
  duration = 5000,
  autoDismiss = true,
  onDismiss,
  icon: CustomIcon,
  action,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = React.useRef(null);

  const { 
    icon: Icon, 
    iconColor, 
    bgColor, 
    textColor, 
    borderColor 
  } = iconVariants[variant] || iconVariants.info;

  const dismiss = React.useCallback(() => {
    if (isExiting) return;
    
    setIsExiting(true);
    setIsVisible(false);
    
    // Wait for exit animation to complete before calling onDismiss
    setTimeout(() => {
      onDismiss?.(id);
    }, 300);
  }, [id, isExiting, onDismiss]);

  // Auto-dismiss after duration
  useEffect(() => {
    if (!autoDismiss || !isVisible || isExiting) return;

    timerRef.current = setTimeout(() => {
      dismiss();
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoDismiss, duration, dismiss, isVisible, isExiting]);

  // Pause auto-dismiss on hover
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoDismiss && !isExiting) {
      timerRef.current = setTimeout(() => {
        dismiss();
      }, duration);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg ${bgColor} border ${borderColor} ${className}`}
          role="alert"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${iconColor}`}>
                {CustomIcon ? <CustomIcon className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                {title && (
                  <p className={`text-sm font-medium ${textColor}`}>
                    {title}
                  </p>
                )}
                {message && (
                  <p className={`mt-1 text-sm ${title ? 'text-gray-700 dark:text-gray-300' : textColor}`}>
                    {message}
                  </p>
                )}
                {action && (
                  <div className="mt-3">
                    {typeof action === 'function' 
                      ? action({ dismiss }) 
                      : action}
                  </div>
                )}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="inline-flex text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none"
                  onClick={dismiss}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          {autoDismiss && (
            <motion.div
              className={`h-1 ${iconColor.replace('text-', 'bg-')} bg-opacity-30`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
