import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
  // Initialize with `false` to ensure consistency between server and client initial render.
  // This avoids a React hydration warning.
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // This effect only runs on the client, so `window` is guaranteed to be defined.
    const mediaQueryList = window.matchMedia(query);

    // Update state with the correct initial value after the first client render.
    setMatches(mediaQueryList.matches);

    // Set up the listener for future changes.
    const listener = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', listener);

    // Clean up the listener on unmount or when the query changes.
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;