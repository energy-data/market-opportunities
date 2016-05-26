import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import reducer from './reducer'

export default combineReducers({
  reducer,
  routing: routerReducer
})
