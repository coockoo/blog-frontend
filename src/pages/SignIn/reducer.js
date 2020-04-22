import createReducer from '../../utils/createReducer';
// TODO: Add path resolver ?
export const at = {
  CHANGE: 'CHANGE',
};

export const initialState = {
  username: '',
  password: '',
};

export const reducer = createReducer({
  [at.CHANGE]: (state, action) => ({
    ...state,
    ...action.update,
  }),
});
