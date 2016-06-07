import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import layers from './layers'
import tempFilter from './temp-filter'

export const reducers = {
  tempFilter,
  layers
}

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}))
