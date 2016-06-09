import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import layers from './layers'
import tempFilter from './temp-filter'
import groups from './groups'

export const reducers = {
  tempFilter,
  layers,
  groups
}

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}))
