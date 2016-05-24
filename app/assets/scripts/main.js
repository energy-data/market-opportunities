'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import config from './config'

// Views
import App from './views/app'

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production')
  }
})
const historyMiddleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers({
    reducer: (state = {}, action) => state,
    routing: routerReducer
  }, applyMiddleware(thunk, historyMiddleware, logger))
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('site-canvas')
)
