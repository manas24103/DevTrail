import { useEffect, useRef } from 'react';

/**
 * A custom hook that runs a callback when a click occurs outside of the specified element
 * @param {Function} handler - The callback function to execute when a click outside occurs
 * @param {boolean} [listenWhen=true] - Whether the event listener should be active
 * @returns {React.RefObject} A ref to attach to the element to detect outside clicks
 */
function useClickOutside(handler, listenWhen = true) {
  const ref = useRef(null);
  const savedHandler = useRef(handler);

  // Update the handler if it changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!listenWhen) return;

    const handleClickOutside = (event) => {
      // Check if the click was outside the ref element and its children
      if (ref.current && !ref.current.contains(event.target)) {
        savedHandler.current(event);
      }
    };

    // Add event listeners for both mousedown and touchstart for better mobile support
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [listenWhen]);

  return ref;
}

export default useClickOutside;
