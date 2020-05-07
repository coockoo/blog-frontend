import React from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';

import useIsAuthenticated from 'Hooks/useIsAuthenticated';

export default function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated) {
          return children;
        }
        const redirectTo = {
          pathname: '/sign-in',
          state: { from: location },
        };
        return <Redirect to={redirectTo} />;
      }}
    />
  );
}
