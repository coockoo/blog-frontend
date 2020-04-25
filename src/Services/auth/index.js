import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

const getAuthFromLocalStorage = () => {
  const stateStr = localStorage.getItem('auth');
  try {
    return JSON.parse(stateStr);
  } catch (error) {
    console.warn('cannot parse auth state from localStorage', stateStr);
    clearAuthState();
  }
  return null;
};

let authState = getAuthFromLocalStorage();

const isAuthenticated = () => {
  return !!(authState && authState.accessToken);
};

const getAccessToken = () => {
  return authState && authState.accessToken;
};

const getRefreshToken = () => {
  return authState && authState.refreshToken;
};

const setAuthState = (state) => {
  localStorage.setItem('auth', JSON.stringify(state));
  authState = state;
  eventEmitter.emit('change');
};

const clearAuthState = () => {
  localStorage.removeItem('auth');
  authState = null;
  eventEmitter.emit('change');
};

const subscribe = (changeHandler) => {
  eventEmitter.on('change', changeHandler);
};

const unsubscribe = (changeHandler) => {
  eventEmitter.off('change', changeHandler);
};

export default {
  isAuthenticated,
  getAccessToken,
  getRefreshToken,
  setAuthState,
  clearAuthState,
  subscribe,
  unsubscribe,
};
