import test from 'ava'
import selection, { initial } from '../../app/assets/scripts/reducers/selection'
import { UPDATE_STEP, UPDATE_SELECTED_COUNTRY, SELECTION_TO_DEFAULT } from '../../app/assets/scripts/actions'

test('selection reducer test', t => {
  const step = 'scenario'
  const country = 'Zimbabwe'
  t.deepEqual(selection(undefined, {}), initial,
    'returns initial state when no state is given')
  t.deepEqual(selection({ step, country }, { type: SELECTION_TO_DEFAULT }), initial,
    'returns to initial state when reset')
  t.deepEqual(selection(initial, { type: UPDATE_STEP, data: step }),
    Object.assign({}, initial, { step }),
    'updates step as expected')
  t.deepEqual(selection(initial, { type: UPDATE_STEP, data: step }),
    Object.assign({}, initial, { step }),
    'updates step as expected')
  t.deepEqual(selection(initial, { type: UPDATE_SELECTED_COUNTRY, data: country }),
    Object.assign({}, initial, { country }),
    'updates country as expected')
})
