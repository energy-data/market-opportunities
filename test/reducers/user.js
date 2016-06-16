import test from 'ava'
import user, { initial } from '../../app/assets/scripts/reducers/user'
import { requestLogin, successfulLogin, badLogin, logout, resetState } from '../../app/assets/scripts/actions'

test('user reducer', t => {
  t.deepEqual(user(undefined, {}), initial,
    'reducer returns initial state when no state is given')

  t.deepEqual(user({ status: 'success', token: 'foo' }, resetState('user')), initial,
    'reducer returns to initial state when reset')

  let state = initial
  t.deepEqual(state = user(state, requestLogin()), {
    status: 'pending',
    token: null,
    error: null
  }, 'request login')

  t.deepEqual(state = user(state, successfulLogin('token-value')), {
    status: 'success',
    token: 'token-value',
    error: null
  }, 'successful login')

  t.deepEqual(state = user(state, logout()), initial, 'logout')

  // start again, now try bad login
  state = user(initial, requestLogin())
  t.deepEqual(state = user(state, badLogin('Error message')), {
    status: initial.status,
    token: null,
    error: 'Error message'
  }, 'bad login')
})

