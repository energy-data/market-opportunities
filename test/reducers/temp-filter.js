import test from 'ava'
import tempFilter, { initial } from '../../app/assets/scripts/reducers/temp-filter'
import { UPDATE_TEMP_FILTER, TEMP_FILTER_TO_DEFAULT } from '../../app/assets/scripts/actions'

test('temp filter test', t => {
  const temp = { range: [0, 100] }
  t.deepEqual(tempFilter(undefined, {}), initial,
    'returns initial state when no state is given')
  t.deepEqual(tempFilter({ temp }, { type: TEMP_FILTER_TO_DEFAULT }), initial,
    'returns to initial state when reset')
  t.deepEqual(tempFilter(initial, { type: UPDATE_TEMP_FILTER, data: temp }),
    { temp },
    'updates temp filter as expected')
})
