import { UPDATE_VISIBLE_LAYERS, START_EDITING_LAYER, STOP_EDITING_LAYER,
  TOGGLE_LAYER_VISIBILITY, LAYERS_TO_DEFAULT, UPDATE_LAYER_FILTER } from '../actions'
import { mockLayers, baseLayers } from '../constants'

export const initial = {
  indicators: mockLayers,
  base: baseLayers,
  visible: 'indicators'
}

export default function layers (state = initial, action) {
  switch (action.type) {
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
          return Object.assign({}, layer, { filter: action.data.filter })
        } else {
          return layer
        }
      })
      return Object.assign({}, state, { indicators: newIndicatorsFilter })
    case LAYERS_TO_DEFAULT:
      return initial
    default:
      return state
  }
}
