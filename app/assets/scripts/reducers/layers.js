import { UPDATE_VISIBLE_LAYERS, START_EDITING_LAYER, STOP_EDITING_LAYER,
  TOGGLE_LAYER_VISIBILITY, LAYERS_TO_DEFAULT, UPDATE_LAYER_FILTER,
  START_FETCHING_LAYERS, ERROR_FETCHING_LAYERS, SET_LAYERS,
  UPDATE_LAYER_GEOJSON } from '../actions'
import { baseLayers } from '../constants'

export const initial = {
  indicators: [],
  base: baseLayers,
  visible: 'indicators',
  status: 'loading'
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
    case LAYERS_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
