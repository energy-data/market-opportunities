import test from 'ava'
import prize, { initial } from '../../app/assets/scripts/reducers/prize'
import { SET_POPULATION, SET_TIER_1_PRICE, SET_TIER_2_PRICE,
  PRIZE_TO_DEFAULT } from '../../app/assets/scripts/actions'

test('prize reducer test', t => {
  const population = 200
  const tier1pop = 150
  const tier2pop = 50
  const tier1price = 20
  const tier2price = 53
  t.deepEqual(prize(undefined, {}), initial,
    'returns initial state when no state is given')
  t.deepEqual(prize({ population, tier1pop, tier2pop, tier1price, tier2price },
    { type: PRIZE_TO_DEFAULT }), initial,
    'returns to initial state when reset')
  // TODO: this can't check for full object equality because of our temp tiers
  t.is(prize(initial, { type: SET_POPULATION, data: population }).population,
    population,
    'updates population as expected')
  t.deepEqual(prize(initial, { type: SET_TIER_1_PRICE, data: tier1price }),
    Object.assign({}, initial, { tier1price }),
    'updates tier 1 price as expected')
  t.deepEqual(prize(initial, { type: SET_TIER_2_PRICE, data: tier2price }),
    Object.assign({}, initial, { tier2price }),
    'updates tier 2 price as expected')
})
