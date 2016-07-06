'use strict'

import React from 'react'
import {whyDidYouUpdate} from 'why-did-you-update'

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React)
}

import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import config from './config'

// Reducers
import reducer from './reducers'

// Views
import App from './views/app'

// Initial data load
import fetchLayers from './fetch-layers'

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production')
  }
})
const historyMiddleware = routerMiddleware(browserHistory)
const store = createStore(reducer, applyMiddleware(thunk, historyMiddleware, logger))

store.dispatch(fetchLayers())

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={config.basePath} component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('site-canvas')
)
