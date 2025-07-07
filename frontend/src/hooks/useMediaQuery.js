import { useState, useEffect } from 'react';

/**
 * A custom hook that tracks if a media query matches
 * @param {string} query - The media query to match against
 * @returns {boolean} Whether the media query matches
 */
function useMediaQuery(query) {
  // Initialize state with the result of the media query
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Check if the media query matches
    const media = window.matchMedia(query);
    
    // Update the state with the current value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Create event listener function
    const listener = () => setMatches(media.matches);
    
    // Add event listener
    media.addListener(listener);
    
    // Remove event listener on cleanup
    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
}

export default useMediaQuery;
