export default (
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__)
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : noop => noop
);
