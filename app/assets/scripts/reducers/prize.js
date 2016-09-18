import { LOCATION_CHANGE } from 'react-router-redux'

import { SET_POPULATION, SET_REVENUE_PER_HOUSEHOLD, SET_MARKET_CAPTURE_RATE,
  PRIZE_TO_DEFAULT } from '../actions'

export const initial = {
  population: null,
  revenuePerHousehold: 10,
  marketCapture: 0.5
}

export default function prize (state = initial, action) {
  switch (action.type) {
    case SET_POPULATION:
      return Object.assign({}, state, { population: action.data })
    case SET_REVENUE_PER_HOUSEHOLD:
      return Object.assign({}, state, { revenuePerHousehold: action.data })
    case SET_MARKET_CAPTURE_RATE:
      return Object.assign({}, state, { marketCapture: action.data })
    case LOCATION_CHANGE:
    case PRIZE_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
