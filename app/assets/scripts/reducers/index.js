import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import layers from './layers'
import tempFilter from './temp-filter'
import groups from './groups'
import selection from './selection'
import prize from './prize'

export const reducers = {
  user,
  tempFilter,
  layers,
  groups,
  selection,
  prize
}

// ie polyfill
require('core-js/es6')
export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}))
