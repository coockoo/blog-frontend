import React, { useCallback, useReducer } from 'react';
import cn from 'classnames';

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

  return (
    <div className={s.signInPage}>
      <form className={s.signInForm}>
        <div className={cn(s.formGroup, { [s.hasValue]: !!state.username })}>
          <input
            type="text"
            id="username"
            autoComplete="username"
            value={state.username}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { username: e.target.value } })}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className={cn(s.formGroup, { [s.hasValue]: !!state.password })}>
          <input
            type="password"
            id="password"
            autoComplete="password"
            value={state.password}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { password: e.target.value } })}
          />
          <label htmlFor="password">Password</label>
        </div>
        <Button onClick={signIn} className={s.signInButton} type="button">
          Sign In
        </Button>
      </form>
    </div>
  );
}
