import _ from 'lodash';

import auth from 'Services/auth';
import graphQL from 'Services/graphql';
import signInMutation from 'Services/graphql/mutations/signIn.gql';
import notifications from 'Services/notifications';

import { at } from '../reducer';

export default async function signIn(args, dispatch, history, location) {
  dispatch({ type: at.SIGN_IN_START });
  let accessToken = null;
  try {
    const res = await graphQL(signInMutation, args);
    accessToken = res.signIn.accessToken;
  } catch (error) {
    const errorMessage = _.get(error, 'errors.0.message') || error.message;
    notifications.add(`Failed to sign in: ${errorMessage}`);
    dispatch({ type: at.SIGN_IN_ERROR, error: errorMessage });
    return;
  }
  auth.setAuthState({ accessToken });
  dispatch({ type: at.SIGN_IN_SUCCESS });
  const { from } = location.state || { from: { pathname: '/' } };
  history.replace(from);
}
