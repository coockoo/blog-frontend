import React, { useCallback, useReducer } from 'react';

import Button from '../../components/Button';

import { reducer, at, initialState } from './reducer';

import s from './styles.less';

async function doSignIn(t) {
  console.log(t);
}

export default function SignInPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const signIn = useCallback(() => {
    doSignIn({ username: state.username, password: state.password });
  }, [state.username, state.password]);

  // TODO: Make input not to drop label if there is a value

  return (
    <div className={s.signInPage}>
      <form>
        <div>
          <input
            type="text"
            id="username"
            autoComplete="username"
            value={state.username}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { username: e.target.value } })}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input
            type="password"
            id="password"
            autoComplete="password"
            value={state.password}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { password: e.target.value } })}
          />
          <label htmlFor="password">Password</label>
        </div>
        <Button onClick={signIn} className={s.signInButton}>Sign In</Button>
      </form>
    </div>
  );
}
