import { UPDATE_STEP, UPDATE_SELECTED_COUNTRY, UPDATE_SELECTED_SCENARIO,
  SELECTION_TO_DEFAULT } from '../actions'

export const initial = {
  step: 'country',
  country: '',
  scenario: ''
}

export default function selection (state = initial, action) {
  switch (action.type) {
    case UPDATE_STEP:
      return Object.assign({}, state, { step: action.data })
    case UPDATE_SELECTED_COUNTRY:
      return Object.assign({}, state, { country: action.data })
    case UPDATE_SELECTED_SCENARIO:
      return Object.assign({}, state, { scenario: action.data })
    case SELECTION_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
