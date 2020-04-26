import createReducer from 'Utils/createReducer';

export const at = {
  CHANGE: 'CHANGE',
  SAVE_START: 'SAVE_START',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
  SAVE_ERROR: 'SAVE_ERROR',
};

export const initialState = {
  title: 'Hi there!',
  outline: 'My initial article',
  body: '# This is my article body',
};

export const reducer = createReducer({
  [at.CHANGE]: (state, action) => ({
    ...state,
    ...action.update,
  }),
  [at.SAVE_START]: (state) => ({
    ...state,
    isSaving: true,
  }),
  [at.SAVE_SUCCESS]: (state) => ({
    ...state,
    isSaving: false,
  }),
  [at.SAVE_ERROR]: (state) => ({
    ...state,
    isSaving: false,
  }),
});
