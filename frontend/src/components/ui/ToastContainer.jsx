import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

// Create a context to manage toasts
const ToastContext = React.createContext(null);

// Custom hook to use the toast context
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider Component
export const ToastProvider = ({ children, placement = 'top-right' }) => {
  const [toasts, setToasts] = useState([]);
  
  // Auto-remove toasts after they expire
  useEffect(() => {
    const expiredToasts = toasts.filter(t => t.autoDismiss && t.expiresAt < Date.now());
    
    if (expiredToasts.length > 0) {
      const expiredIds = expiredToasts.map(t => t.id);
      setToasts(currentToasts => 
        currentToasts.filter(toast => !expiredIds.includes(toast.id))
      );
    }
    
    const timeout = setTimeout(() => {
      const nextExpiry = toasts
        .filter(t => t.autoDismiss && t.expiresAt > Date.now())
        .sort((a, b) => a.expiresAt - b.expiresAt)[0]?.expiresAt;
      
      if (nextExpiry) {
        const timeoutMs = nextExpiry - Date.now();
        if (timeoutMs > 0) {
          return;
        }
      }
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [toasts]);
  
  /**
   * Create a new toast
   * @param {Object} options - Toast options
   * @param {string} [options.title] - Toast title
   * @param {string} options.message - Toast message
   * @param {'success'|'error'|'warning'|'info'} [options.variant='info'] - Toast type
   * @param {number} [options.duration=5000] - Duration in milliseconds
   * @param {boolean} [options.autoDismiss=true] - Auto-dismiss the toast
   * @param {React.ReactNode} [options.icon] - Custom icon
   * @param {React.ReactNode} [options.action] - Action button or element
   * @returns {string} Toast ID
   */
  const addToast = useCallback(({
    title,
    message,
    variant = 'info',
    duration = 5000,
    autoDismiss = true,
    icon,
    action,
  }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const expiresAt = Date.now() + duration;
    
    setToasts(currentToasts => [
      ...currentToasts,
      {
        id,
        title,
        message,
        variant,
        duration,
        autoDismiss,
        expiresAt,
        icon,
        action,
      },
    ]);
    
    return id;
  }, []);
  
  /**
   * Remove a toast by ID
   * @param {string} id - Toast ID to remove
   */
  const removeToast = useCallback((id) => {
    setToasts(currentToasts => 
      currentToasts.filter(toast => toast.id !== id)
    );
  }, []);
  
  // Predefined toast methods
  const toast = useCallback({
    info: (message, options = {}) => 
      addToast({ ...options, message, variant: 'info' }),
    success: (message, options = {}) => 
      addToast({ ...options, message, variant: 'success' }),
    warning: (message, options = {}) => 
      addToast({ ...options, message, variant: 'warning' }),
    error: (message, options = {}) => 
      addToast({ ...options, message, variant: 'error' }),
    custom: (options) => addToast(options),
    dismiss: removeToast,
  }, [addToast, removeToast]);
  
  // Placement classes
  const placementClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };
  
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div 
        className={`fixed z-50 space-y-3 w-full max-w-xs ${placementClasses[placement] || placementClasses['top-right']}`}
        style={{
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              title={toast.title}
              message={toast.message}
              variant={toast.variant}
              duration={toast.duration}
              autoDismiss={toast.autoDismiss}
              icon={toast.icon}
              action={toast.action}
              onDismiss={removeToast}
              className="pointer-events-auto"
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Default export for backward compatibility
export default ToastContainer;
