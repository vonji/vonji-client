import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';

import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';

import { mainReducer } from './reducers/all';

import Members from './comps/members';
import App from './comps/app';

const logger = createLogger();
const store = createStore(
  mainReducer,
  applyMiddleware(
    logger
  )
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <Route path="/members" component={Members} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));
