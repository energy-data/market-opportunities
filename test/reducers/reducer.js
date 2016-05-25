import test from 'ava'
import reducer, { initial } from '../../app/assets/scripts/reducers/reducer'

test('reducer test', t => {
  const foo = 5
  const bar = 6
  t.deepEqual(reducer(undefined, {}), initial,
    'reducer returns initial state when no state is given')
  t.deepEqual(reducer({ foo, bar }, { type: 'REDUCER_TO_DEFAULT' }), initial,
    'reducer returns to initial state when reset')
  t.deepEqual(reducer(initial, { type: 'UPDATE_FOO', data: foo }), { foo, bar: initial.bar },
    'reducer updates foo as expected')
  t.deepEqual(reducer(initial, { type: 'UPDATE_BAR', data: bar }), { foo: initial.foo, bar },
    'reducer updates bar as expected')
})
