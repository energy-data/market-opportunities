import { UPDATE_VISIBLE_LAYERS, START_EDITING_LAYER, STOP_EDITING_LAYER,
  TOGGLE_LAYER_VISIBILITY, LAYERS_TO_DEFAULT, UPDATE_LAYER_FILTER,
  START_FETCHING_LAYERS, ERROR_FETCHING_LAYERS, SET_LAYERS,
  UPDATE_LAYER_GEOJSON, SET_MAP_INTERSECT, SET_POPULATION, SET_TIER_1_PRICE,
  SET_TIER_2_PRICE } from '../actions'
import { baseLayers } from '../constants'

export const initial = {
  indicators: [],
  base: baseLayers,
  visible: 'indicators',
  status: 'loading',
  intersect: null,
  population: null,
  tier1pop: null,
  tier2pop: null,
  tier1price: 10,
  tier2price: 5
}

export default function layers (state = initial, action) {
  switch (action.type) {
    case START_FETCHING_LAYERS:
      return Object.assign({}, state, { status: 'loading' })
    case ERROR_FETCHING_LAYERS:
      return Object.assign({}, state, { status: 'error', error: action.error })
    case SET_LAYERS:
      // initialize `filter` from `options.value` for each layer
      var layers = action.layers.map(layer => Object.assign({}, layer, {
        filter: JSON.parse(JSON.stringify(layer.options.value))
      }))
      return Object.assign({}, state, {
        status: 'success',
        indicators: layers.filter(layer => layer.type !== 'base')
      })
    case UPDATE_VISIBLE_LAYERS:
      return Object.assign({}, state, { visible: action.data })
    case START_EDITING_LAYER:
      const newIndicatorsStartEdit = state.indicators.map(layer => {
        if (layer.id === action.data) {
          return Object.assign({}, layer, { editing: true })
        } else {
          return Object.assign({}, layer, { editing: false })
        }
      })
      return Object.assign({}, state, { indicators: newIndicatorsStartEdit })
    case STOP_EDITING_LAYER:
      const newIndicatorsStopEdit = state.indicators.map(layer => {
        return Object.assign({}, layer, { editing: false })
      })
      return Object.assign({}, state, { indicators: newIndicatorsStopEdit })
    case TOGGLE_LAYER_VISIBILITY:
      const allLayersVisible = state.indicators.concat(state.base).map(layer => {
        if (layer.id === action.data) {
          return Object.assign({}, layer, { visible: !layer.visible })
        } else {
          return layer
        }
      })
      return Object.assign({}, state, {
        indicators: allLayersVisible.filter(layer => layer.type !== 'base'),
        base: allLayersVisible.filter(layer => layer.type === 'base')
      })
    case UPDATE_LAYER_FILTER:
      const newIndicatorsFilter = state.indicators.map(layer => {
        if (layer.id === action.data.id) {
          return Object.assign({}, layer, {
            filter: Object.assign({}, layer.filter, action.data.filter)
          })
        } else {
          return layer
        }
      })
      return Object.assign({}, state, { indicators: newIndicatorsFilter })
    case UPDATE_LAYER_GEOJSON:
      const newIndicatorsGeo = state.indicators.map(layer => {
        if (layer.id === action.data.id) {
          return Object.assign({}, layer, { geojson: action.data.geojson })
        } else {
          return layer
        }
      })
      return Object.assign({}, state, { indicators: newIndicatorsGeo })
    case SET_MAP_INTERSECT:
      return Object.assign({}, state, { intersect: action.data })
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
    case LAYERS_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
