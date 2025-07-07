import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook for making HTTP requests
 * @param {string} url - The URL to fetch data from
 * @param {Object} options - Options for the fetch request
 * @param {*} [initialData=null] - Initial data to use before the fetch completes
 * @param {boolean} [immediate=true] - Whether to fetch immediately or wait for manual trigger
 * @returns {Object} An object containing the response data, loading state, error, and refetch function
 */
function useFetch(url, options = {}, initialData = null, immediate = true) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const [abortController, setAbortController] = useState(null);

  const fetchData = useCallback(async (fetchOptions = {}) => {
    // If there's an existing request, abort it
    if (abortController) {
      abortController.abort();
    }
    
    // Create a new AbortController for this request
    const controller = new AbortController();
    setAbortController(controller);
    
    // Combine default options with provided options
    const requestOptions = {
      ...options,
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(fetchOptions.headers || {}),
      },
    };
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      setData(responseData);
      return { data: responseData, error: null };
    } catch (err) {
      // Don't set error if the error is from aborting
      if (err.name !== 'AbortError') {
        setError(err);
        return { data: null, error: err };
      }
      return { data: null, error: null }; // Ignore abort errors
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  }, [url, options, abortController]);
  
  // Fetch data when the component mounts or when the URL changes
  useEffect(() => {
    if (immediate) {
      fetchData();
    }
    
    // Cleanup function to abort any pending requests
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [url, immediate, fetchData]);
  
  // Function to manually trigger a refetch
  const refetch = useCallback((fetchOptions = {}) => {
    return fetchData(fetchOptions);
  }, [fetchData]);
  
  return { data, loading, error, refetch };
}

export default useFetch;
