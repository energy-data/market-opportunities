import { UPDATE_FOO, UPDATE_BAR, REDUCER_TO_DEFAULT } from '../actions'

export const initial = {
  foo: 1,
  bar: 2
}

export default function reducer (state = initial, action) {
  switch (action.type) {
    case UPDATE_FOO:
      return Object.assign({}, state, { foo: action.data })
    case UPDATE_BAR:
      return Object.assign({}, state, { bar: action.data })
    case REDUCER_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
