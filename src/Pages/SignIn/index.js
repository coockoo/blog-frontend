import React, { useCallback, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

import Button from 'Components/Button';

import { reducer, initialState } from './reducer';

import actions from './actions';

import s from './styles.less';

export default function SignInPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const history = useHistory();
  const location = useLocation();

  const { nickname, password, isLoading, error } = state;

  const signIn = useCallback(() => {
    actions.signIn({ nickname, password }, dispatch, history, location);
  }, [nickname, password, history, location]);

  const isButtonDisabled = !nickname || !password || isLoading;

  const handleEnter = useCallback(
    (e) => {
      if (e.key === 'Enter' && !isButtonDisabled) {
        e.preventDefault();
        signIn();
      }
    },
    [signIn, isButtonDisabled]
  );

  return (
    <div className={s.signInPage}>
      <form className={s.signInForm}>
        <div className={cn(s.formGroup, { [s.hasValue]: !!nickname })}>
          <input
            type="text"
            id="nickname"
            autoComplete="nickname"
            value={nickname}
            onChange={(e) => actions.change(dispatch, { nickname: e.target.value })}
            onKeyPress={handleEnter}
          />
          <label htmlFor="nickname">Nickname</label>
        </div>
        <div className={cn(s.formGroup, { [s.hasValue]: !!password })}>
          <input
            type="password"
            id="password"
            autoComplete="password"
            value={password}
            onChange={(e) => actions.change(dispatch, { password: e.target.value })}
            onKeyPress={handleEnter}
          />
          <label htmlFor="password">Password</label>
        </div>
        <Button
          onClick={signIn}
          className={s.signInButton}
          type="button"
          disabled={isButtonDisabled}
        >
          Sign In
        </Button>
        <div>{error}</div>
      </form>
    </div>
  );
}
