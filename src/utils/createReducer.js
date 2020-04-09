export default function createReducer(handlersMap) {
  return function reducer(state, action) {
    if (!action.type) {
      throw new Error('Cannot handle action without type', action);
    }
    const handler = handlersMap[action.type];
    if (!handler) {
      throw new Error('Cannot find handler for action type', action.type);
    }
    return handler(state, action);
  };
}
