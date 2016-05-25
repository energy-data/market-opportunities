import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import reducer from './reducer'

export default combineReducers({
  reducer,
  routing: routeReducer
})
