import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';

import useIsAuthenticated from 'Hooks/useIsAuthenticated';
import auth from 'Services/auth';

import s from './styles.less';

export default function TopNav() {
  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();

  const signOut = (e) => {
    e.preventDefault();
    auth.clearAuthState();
    history.push('/');
  };

  return (
    <div className={s.topNav}>
      <div className={s.brand}>
        <Link to="/">Oleksandr&apos;s Blog</Link>
      </div>
      <div className={s.links}>
        <ul>
          {isAuthenticated ? (
            <Fragment>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
              <li>
                <Link to="/articles/new/edit">Create Article</Link>
              </li>
            </Fragment>
          ) : null}
          <li>
            {isAuthenticated ? (
              <Link to="/" onClick={signOut}>
                Sign Out
              </Link>
            ) : (
              <Link to="/sign-in" className={s.signIn}>
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
