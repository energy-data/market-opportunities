import test from 'ava'
import layers, { initial } from '../../app/assets/scripts/reducers/layers'
import { startFetchingLayers, errorFetchingLayers, setLayers,
  updateVisibleLayers, startEditingLayer, stopEditingLayer,
  toggleLayerVisibility, updateLayerFilter, updateLayerGeoJSON,
  resetState, setMapIntersect } from '../../app/assets/scripts/actions'

test('layer reducer test', t => {
  const base = [{id: 'a'}]
  const indicators = [{id: 'b', editing: true}, {id: 'c'}]
  const visible = 'base'
  const geojson = {
    type: 'Feature',
    geometry: {},
    properties: {}
  }

  t.deepEqual(layers(undefined, {}), initial,
    'reducer returns initial state when no state is given')

  t.deepEqual(layers({ base, indicators, visible }, resetState('layers')), initial,
    'reducer returns to initial state when reset')

  const startFetching = layers(initial, startFetchingLayers())
  t.is(startFetching.status, 'loading',
    'status is loading after "start fetching layers"')

  const errorFetching = layers(startFetching, errorFetchingLayers('Error message!'))
  t.is(errorFetching.status, 'error',
    'status is error upon "error fetching layers"')
  t.is(errorFetching.error, 'Error message!', 'set error message')

  const layerOptions = { foo: { bar: [ 'baz' ] }, value: { type: 'value-type' } }
  const layersAdded = layers(startFetching, setLayers([{
    id: 'z',
    options: layerOptions
  }, {
    id: 'y',
    options: layerOptions
  }]))
  t.is(layersAdded.indicators.length, 2)
  t.deepEqual(layersAdded.indicators[0].options, layerOptions)
  t.deepEqual(layersAdded.indicators[0].filter, layerOptions.value, 'initialize indicator `filter` property from `options.value`')

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

  t.is(layers(Object.assign({}, initial, { indicators }),
    updateLayerGeoJSON('b', geojson)).indicators[0].geojson, geojson,
    'update geojson of layer "b"')

  t.deepEqual(layers(initial, setMapIntersect(geojson)),
    Object.assign({}, initial, { intersect: geojson }),
    'set map intersect')
})
