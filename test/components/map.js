import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import proxyquire from 'proxyquire'
import mockboxGL from 'mapbox-gl-js-mock'
import sinon from 'sinon'

const { Map } = proxyquire.noCallThru().load('../../app/assets/scripts/components/map', {
  'mapbox-gl': mockboxGL
})

import classes from '../helpers/classes'
import layers, { initial } from '../../app/assets/scripts/reducers/layers'
import { setLayers, toggleLayerVisibility } from '../../app/assets/scripts/actions'
import { mockLayers } from '../fixtures/constants'

test('map test', t => {
  const onCanvasReady = sinon.spy()
  const testLayer = mockLayers[2]
  const zeroVisible = layers(initial, setLayers([testLayer]))
  const component = shallow(<Map layers={zeroVisible} onCanvasReady={onCanvasReady}/>)

  t.truthy(component.hasClass(classes.nodot['map']))

  // mock mount
  const instance = component.instance()
  instance._hideRoads = () => {}
  t.notThrows(() => instance.componentDidMount())

  // map component can receive new props (more or fewer layers)
  // call _addLayer/._removeLayer without incident
  const oneVisible = layers(zeroVisible, toggleLayerVisibility(testLayer.id))
  t.notThrows(() => component.setProps({layers: oneVisible}))
  t.notThrows(() => component.setProps({layers: initial}))

  // should also verify it's actually calling the correct functions
  instance._addLayerOutline = sinon.spy()
  instance._removeLayerOutline = sinon.spy()
  component.setProps({layers: oneVisible})
  t.truthy(instance._addLayerOutline.calledOnce)
  component.setProps({layers: initial})
  t.truthy(instance._removeLayerOutline.calledOnce)

  // add an edit layer, check the data addition/removal
  instance._addLayerData = sinon.spy()
  instance._removeLayerData = sinon.spy()
  // // the mockbox map needs another method
  instance._map.setFilter = () => {}

  component.setProps({editLayer: mockLayers[1]})
  t.truthy(instance._addLayerData.calledOnce)
  component.setProps({editLayer: null})
  t.truthy(instance._removeLayerData.calledOnce)
})
