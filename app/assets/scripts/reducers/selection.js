import { LOCATION_CHANGE } from 'react-router-redux'

import { UPDATE_STEP, UPDATE_SELECTED_COUNTRY, SELECTION_TO_DEFAULT } from '../actions'

export const initial = {
  step: 'country',
  country: ''
}

export default function selection (state = initial, action) {
  switch (action.type) {
    case UPDATE_STEP:
      return Object.assign({}, state, { step: action.data })
    case UPDATE_SELECTED_COUNTRY:
      return Object.assign({}, state, { country: action.data })
    case LOCATION_CHANGE:
    case SELECTION_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
