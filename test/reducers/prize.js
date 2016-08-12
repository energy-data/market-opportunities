import test from 'ava'
import prize, { initial } from '../../app/assets/scripts/reducers/prize'
import { SET_POPULATION, SET_MARKET_CAPTURE_RATE, SET_REVENUE_PER_HOUSEHOLD,
  PRIZE_TO_DEFAULT } from '../../app/assets/scripts/actions'

test('prize reducer test', t => {
  const population = 200
  const marketCapture = 150
  const revenuePerHousehold = 50
  t.deepEqual(prize(undefined, {}), initial,
    'returns initial state when no state is given')
  t.deepEqual(prize({ population, marketCapture, revenuePerHousehold },
    { type: PRIZE_TO_DEFAULT }), initial,
    'returns to initial state when reset')
  t.deepEqual(prize(initial, { type: SET_POPULATION, data: population }),
    Object.assign({}, initial, { population }),
    'updates population as expected')
  t.deepEqual(prize(initial, { type: SET_MARKET_CAPTURE_RATE, data: marketCapture }),
    Object.assign({}, initial, { marketCapture }),
    'updates market capture rate as expected')
  t.deepEqual(prize(initial, { type: SET_REVENUE_PER_HOUSEHOLD, data: revenuePerHousehold }),
    Object.assign({}, initial, { revenuePerHousehold }),
    'updates revenue per household as expected')
})
