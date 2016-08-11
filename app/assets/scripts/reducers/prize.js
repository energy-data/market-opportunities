import { SET_POPULATION, SET_TIER_1_PRICE, SET_TIER_2_PRICE,
  PRIZE_TO_DEFAULT } from '../actions'

export const initial = {
  population: null,
  tier1pop: null,
  tier2pop: null,
  tier1price: 10,
  tier2price: 5
}

export default function prize (state = initial, action) {
  switch (action.type) {
    case SET_POPULATION:
      // TODO: remove this temporary sham calculation of the other tiers of population
      // adding it to the reducer so it only gets called on "set" and not render
      const sham = Math.random()
      return Object.assign({}, state, {
        population: action.data,
        tier1pop: Math.round(sham * action.data),
        tier2pop: Math.round((1 - sham) * action.data)
      })
    case SET_TIER_1_PRICE:
      return Object.assign({}, state, { tier1price: action.data })
    case SET_TIER_2_PRICE:
      return Object.assign({}, state, { tier2price: action.data })
    case PRIZE_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
