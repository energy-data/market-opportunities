import test from 'ava'
import layers, { initial } from '../../app/assets/scripts/reducers/layers'
import { updateVisibleLayers, startEditingLayer, stopEditingLayer,
  toggleLayerVisibility, updateLayerFilter, resetState } from '../../app/assets/scripts/actions'

test('layer reducer test', t => {
  const base = [{id: 'a'}]
  const indicators = [{id: 'b', editing: true}, {id: 'c'}]
  const visible = 'base'

  t.deepEqual(layers(undefined, {}), initial,
    'reducer returns initial state when no state is given')

  t.deepEqual(layers({ base, indicators, visible }, resetState('layers')), initial,
    'reducer returns to initial state when reset')

  t.truthy(layers(Object.assign({}, initial, { indicators }),
    startEditingLayer('b')).indicators[0].editing,
    'start editing of layer "b"')

  t.falsy(layers(Object.assign({}, initial, { indicators }),
    stopEditingLayer('b')).indicators[0].editing,
    'stop editing of layer "b"')

  t.deepEqual(layers(initial, updateVisibleLayers('base')),
    Object.assign({}, initial, { visible }),
    'reducer updates visible as expected')

  t.truthy(layers(Object.assign({}, initial, { indicators }),
    toggleLayerVisibility('b')).indicators[0].visible,
    'toggle visibility of layer "b"')

  t.is(layers(Object.assign({}, initial, { indicators }),
    updateLayerFilter('b', { value: 4 })).indicators[0].filter.value, 4,
    'update filter of layer "b"')
})
