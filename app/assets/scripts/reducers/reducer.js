export const initial = {
  foo: null,
  bar: null
}

export default function reducer (state = initial, action) {
  switch (action.type) {
    case 'UPDATE_STATE':
      return Object.assign({}, state, { foo: action.data })
    case 'REDUCER_TO_DEFAULT':
      return initial
    default:
      return state
  }
}
