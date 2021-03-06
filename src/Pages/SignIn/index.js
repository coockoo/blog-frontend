import React, { useCallback, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

import auth from 'Services/auth';
import graphQL from 'Services/graphql';
import signInMutation from 'Services/graphql/mutations/signIn.gql';

import Button from 'Components/Button';

import { reducer, at, initialState } from './reducer';

import s from './styles.less';

async function doSignIn(variables, dispatch, history, location) {
  dispatch({ type: at.SIGN_IN_START });
  let res;
  try {
    res = await graphQL(signInMutation, variables);
  } catch (error) {
    dispatch({ type: at.SIGN_IN_ERROR, error: error.errors[0].message });
    return;
  }
  const { accessToken } = res.signIn;
  auth.setAuthState({ accessToken });
  dispatch({ type: at.SIGN_IN_SUCCESS });
  const { from } = location.state || { from: { pathname: '/' } };
  history.replace(from);
}

export default function SignInPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const location = useLocation();

  const signIn = useCallback(() => {
    doSignIn({ nickname: state.nickname, password: state.password }, dispatch, history, location);
  }, [state.nickname, state.password, history, location]);

  const isButtonDisabled = !state.nickname || !state.password || state.isLoading;

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
        <div className={cn(s.formGroup, { [s.hasValue]: !!state.nickname })}>
          <input
            type="text"
            id="nickname"
            autoComplete="nickname"
            value={state.nickname}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { nickname: e.target.value } })}
            onKeyPress={handleEnter}
          />
          <label htmlFor="nickname">Nickname</label>
        </div>
        <div className={cn(s.formGroup, { [s.hasValue]: !!state.password })}>
          <input
            type="password"
            id="password"
            autoComplete="password"
            value={state.password}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { password: e.target.value } })}
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
        <div>{state.error}</div>
      </form>
    </div>
  );
}
