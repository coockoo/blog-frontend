import createReducer from 'Utils/createReducer';

export const at = {
  LOAD_ARTICLES_START: 'LOAD_ARTICLES_START',
  LOAD_ARTICLES_SUCCESS: 'LOAD_ARTICLES_SUCCESS',
  LOAD_ARTICLES_ERROR: 'LOAD_ARTICLES_ERROR',
};

export const initialState = {
  isLoading: true,
  rows: [],
  count: 0,
};

export const reducer = createReducer({
  [at.LOAD_ARTICLES_START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [at.LOAD_ARTICLES_SUCCESS]: (state, action) => ({
    ...state,
    count: action.count,
    rows: action.rows,
    isLoading: false,
  }),
  [at.LOAD_ARTICLES_ERROR]: (state) => ({
    ...state,
    isLoading: false,
  }),
});
