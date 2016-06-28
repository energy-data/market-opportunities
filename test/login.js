import test from 'ava'
import sinon from 'sinon'
import login from '../app/assets/scripts/login'
import { REQUEST_LOGIN, SUCCESSFUL_LOGIN, BAD_LOGIN } from '../app/assets/scripts/actions'
import { badLoginCredentials, genericLoginError } from '../app/assets/scripts/terms'

import xhr from 'xhr'

let fakeXhr
test.before(t => {
  // note: not bothering to restore this after the test, because anyway
  // the "real" one doesn't exist in non-browser situation
  xhr.XMLHttpRequest = fakeXhr = sinon.useFakeXMLHttpRequest()
})

test('good login', t => {
  let dispatch = sinon.spy()
  let requests = []
  fakeXhr.onCreate = requests.push.bind(requests)

  let loginThunk = login('user', 'pass')
  loginThunk(dispatch)

  t.is(requests.length, 1)
  t.is(requests[0].method, 'POST')
  t.is(requests[0].requestBody, 'username=user&password=pass')
  t.is(requests[0].headers['Content-Type'], 'application/x-www-form-urlencoded')

  requests[0].respond(200, {}, JSON.stringify({apikey: 'TOKEN', user: 'USER'}))

  t.deepEqual(dispatch.args.slice(0, 2), [
    [{ type: REQUEST_LOGIN }],
    [{ type: SUCCESSFUL_LOGIN, token: 'TOKEN', user: 'USER' }]
  ])

  // this is a little crazy: we expect the last dispatch to be a thunk, so we
  // use Function.prototype.toString() to make an assertion against its _source
  // code_.
  var expectedThunk = dispatch.args[2][0]
  t.truthy(/startFetchingLayers/.test(expectedThunk.toString(), 'dispatches fetchLayers on successful login'))
})

test('bad login', t => {
  let dispatch = sinon.spy()
  let requests = []
  fakeXhr.onCreate = requests.push.bind(requests)

  let loginThunk = login('user', 'pass')
  // first bad username/password
  loginThunk(dispatch)
  requests[0].respond(403, {})
  // then server error
  loginThunk(dispatch)
  requests[1].respond(500)

  t.is(requests.length, 2)
  requests.forEach((request) => {
    t.is(request.method, 'POST')
    t.is(request.requestBody, 'username=user&password=pass')
    t.is(request.headers['Content-Type'], 'application/x-www-form-urlencoded')
  })

  t.deepEqual(dispatch.args, [
    [{ type: REQUEST_LOGIN }],
    [{ type: BAD_LOGIN, error: badLoginCredentials }],
    [{ type: REQUEST_LOGIN }],
    [{ type: BAD_LOGIN, error: genericLoginError }]
  ])
})
