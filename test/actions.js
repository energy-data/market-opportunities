import test from 'ava'
import * as actions from '../app/assets/scripts/actions'
import { reducers } from '../app/assets/scripts/reducers'

/*
 * Tests for bare action creators
 */
test('spot check actions and action creators', function (t) {
  const actionTypes = Object.keys(actions)
    .filter(k => typeof actions[k] === 'string')
  const actionCreators = Object.keys(actions)
    .filter(k => typeof actions[k] === 'function')

  t.deepEqual(actionTypes, actionTypes.map(k => actions[k]),
    'action type constant names match values')

  actionCreators.map(k => actions[k]().type)
    .forEach(type => t.truthy(actionTypes.indexOf(type) >= 0,
      'each action creator creates a known action type: ' + type))
})

test('check all non-default cases of resetState', function (t) {
  Object.keys(reducers).forEach(function (portion) {
    t.is(actions.resetState(portion).type,
      portion.replace(/([A-Z])/g, $1 => '_' + $1).toUpperCase() + '_TO_DEFAULT')
  })
  t.pass()
})
