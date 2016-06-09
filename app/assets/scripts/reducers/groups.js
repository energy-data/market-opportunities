import { TOGGLE_OPEN_GROUP, GROUPS_TO_DEFAULT } from '../actions'
import { mockLayers } from '../constants'
import { unique, toggleArrayElement } from '../utils'

export const initial = {
  open: unique(mockLayers.map(layer => layer.group))
}

export default function tempFilter (state = initial, action) {
  switch (action.type) {
    case TOGGLE_OPEN_GROUP:
      return Object.assign({}, state,
        { open: toggleArrayElement(state.open, action.data) })
    case GROUPS_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
