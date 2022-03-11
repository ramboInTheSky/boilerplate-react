import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Hello from './components/Hello';
import rootReducer from './reducers';
import enableDevTools from './util/enableDevTools';

import './index.scss';

const storeEnhancer = compose(
  applyMiddleware(thunk),
  enableDevTools,
);

const store = createStore(
  rootReducer,
  storeEnhancer,
);

const history = syncHistoryWithStore(browserHistory, store);

// You can remove this once you've created your own root component
const Home = () => (
  <Hello appName={'the Amido boilerplate'} />
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home}>
        {/* Sub-routes here */}
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
