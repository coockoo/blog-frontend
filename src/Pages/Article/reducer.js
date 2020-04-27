import createReducer from 'Utils/createReducer';

export const at = {
  LOAD_START: 'LOAD_START',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_ERROR: 'LOAD_ERROR',
};

export const initialState = {
  isLoading: false,
  article: null,
};

export const reducer = createReducer({
  [at.LOAD_START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [at.LOAD_SUCCESS]: (state, action) => ({
    ...state,
    article: action.article,
    isLoading: false,
  }),
  [at.LOAD_ERROR]: (state) => ({
    ...state,
    isLoading: false,
  }),
});
