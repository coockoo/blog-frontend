import createReducer from 'Utils/createReducer';

export const at = {
  CHANGE: 'CHANGE',
  LOAD_START: 'LOAD_START',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_ERROR: 'LOAD_ERROR',
  SAVE_START: 'SAVE_START',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
  SAVE_ERROR: 'SAVE_ERROR',
  RESET: 'RESET',
};

export const initialState = {
  title: '',
  outline: '',
  body: '',
  isSaving: false,
  isLoading: false,
};

export const reducer = createReducer({
  [at.CHANGE]: (state, action) => ({
    ...state,
    ...action.update,
  }),

  [at.LOAD_START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [at.LOAD_SUCCESS]: (state, action) => ({
    ...state,
    ...action.article,
    isLoading: false,
  }),
  [at.LOAD_ERROR]: (state) => ({
    ...state,
    isLoading: false,
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
  [at.RESET]: (state) => ({
    ...initialState,
  }),
});
