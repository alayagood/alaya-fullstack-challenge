import { useState, useEffect } from 'react';

export function useCookieChange(cookieVal) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleCookieChange = () => {
      setIsLoggedIn(!!document.cookie.includes(cookieVal));
    };

    const observer = new MutationObserver(handleCookieChange);

    observer.observe(document, { subtree: true, childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isLoggedIn;
}
