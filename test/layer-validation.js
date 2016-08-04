import test from 'ava'
import { layerValidator } from '../app/assets/scripts/layer-validation'
import { mockLayers } from './fixtures/constants'
import { badLayerOptions } from './fixtures/bad-layer-options'

test('fetch layers: good layers are good', t => {
  mockLayers.slice(0, 3).forEach(layer => {
    const validation = layerValidator(layer.options)
    t.falsy(validation.length)
  })
})

test('fetch layers: bad layers are bad', t => {
  badLayerOptions.forEach(options => {
    const validation = layerValidator(options)
    t.truthy(validation.length)
  })
})
