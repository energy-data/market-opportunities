import { LOCATION_CHANGE } from 'react-router-redux'

import { TOGGLE_OPEN_GROUP, GROUPS_TO_DEFAULT } from '../actions'
import { toggleArrayElement } from '../utils'

export const initial = {
  open: []
}

export default function groups (state = initial, action) {
  switch (action.type) {
    case TOGGLE_OPEN_GROUP:
      return Object.assign({}, state,
        { open: toggleArrayElement(state.open, action.data) })
    case LOCATION_CHANGE:
    case GROUPS_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
