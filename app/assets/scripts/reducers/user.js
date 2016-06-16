import { REQUEST_LOGIN, SUCCESSFUL_LOGIN, BAD_LOGIN, LOGOUT, USER_TO_DEFAULT } from '../actions'

export const initial = {
  status: 'logged out',
  error: null,
  token: null
}

export default function user (state = initial, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        status: 'pending',
        error: null,
        token: null
      }
    case SUCCESSFUL_LOGIN:
      return {
        status: 'success',
        error: null,
        token: action.token
      }
    case BAD_LOGIN:
      return {
        status: initial.status,
        error: action.error,
        token: null
      }
    case USER_TO_DEFAULT:
    case LOGOUT:
      return initial
    default:
      return state
  }
}
