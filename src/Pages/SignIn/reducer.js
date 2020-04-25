import createReducer from 'Utils/createReducer';

export const at = {
  CHANGE: 'CHANGE',
  SIGN_IN_START: 'SIGN_IN_START',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_ERROR: 'SIGN_IN_ERROR',
};

export const initialState = {
  isLoading: false,
  nickname: '',
  password: '',
  error: null,
  redirect: false,
};

export const reducer = createReducer({
  [at.CHANGE]: (state, action) => ({
    ...state,
    ...action.update,
    error: null,
  }),
  [at.SIGN_IN_START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [at.SIGN_IN_SUCCESS]: (state) => ({
    ...state,
    isLoading: false,
    redirect: true,
  }),
  [at.SIGN_IN_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }),
});
