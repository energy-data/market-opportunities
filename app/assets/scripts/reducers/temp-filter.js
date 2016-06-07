import { UPDATE_TEMP_FILTER, TEMP_FILTER_TO_DEFAULT } from '../actions'

export const initial = {
  temp: {}
}

export default function tempFilter (state = initial, action) {
  switch (action.type) {
    case UPDATE_TEMP_FILTER:
      return Object.assign({}, state, { temp: action.data })
    case TEMP_FILTER_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
