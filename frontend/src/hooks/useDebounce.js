import { useState, useEffect } from 'react';

/**
 * A custom hook that returns a debounced value that only updates after a specified delay
 * @param {*} value - The value to be debounced
 * @param {number} delay - The delay in milliseconds (default: 500ms)
 * @returns {*} The debounced value
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if the value or delay changes before the timeout completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
