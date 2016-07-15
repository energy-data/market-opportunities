'use strict'

import React from 'react'
import {whyDidYouUpdate} from 'why-did-you-update'

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React)
}

import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory, applyRouterMiddleware } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import useScroll from 'react-router-scroll'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import config from './config'

// Reducers
import reducer from './reducers'

// Views
import App from './views/app'
import Explore from './views/explore'
import Home from './views/home'
import About from './views/about'

// Initial data load
import fetchLayers from './fetch-layers'

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production')
  }
})
const historyMiddleware = routerMiddleware(hashHistory)
const store = createStore(reducer, applyMiddleware(thunk, historyMiddleware, logger))

store.dispatch(fetchLayers())

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path={config.basePath} component={App}>
        <Route path='explore' component={Explore} />
        <Route path='about' component={About} />
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-wrapper')
)
