import { useState, useEffect } from 'react';

import auth from 'Services/auth';

export default function useIsAuthenticated() {
  const [isAuthenticated, setAuthenticated] = useState(auth.isAuthenticated());

  useEffect(() => {
    function authSubscription() {
      setAuthenticated(auth.isAuthenticated());
    }

    auth.subscribe(authSubscription);
    return () => {
      auth.unsubscribe(authSubscription);
    };
  }, []);

  return isAuthenticated;
}
