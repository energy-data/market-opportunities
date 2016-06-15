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
import { toggleLayerVisibility } from '../../app/assets/scripts/actions'

test('map test', t => {
  const component = shallow(<Map layers={initial} />)
  t.truthy(component.hasClass(classes.nodot['map']))

  // mock mount
  const instance = component.instance()
  t.notThrows(() => instance.componentDidMount())

  // map component can receive new props (more or fewer layers)
  // call _addLayer/._removeLayer without incident
  const oneVisible = layers(initial, toggleLayerVisibility('1'))
  t.notThrows(() => component.setProps({layers: oneVisible}))
  t.notThrows(() => component.setProps({layers: initial}))

  // should also verify it's actually calling the correct functions
  instance._addLayer = sinon.spy()
  instance._removeLayer = sinon.spy()
  component.setProps({layers: oneVisible})
  t.truthy(instance._addLayer.calledOnce)
  component.setProps({layers: initial})
  t.truthy(instance._removeLayer.calledOnce)
})
