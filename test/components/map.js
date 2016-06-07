import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import proxyquire from 'proxyquire'
import mockboxGL from 'mapbox-gl-js-mock'

const { Map } = proxyquire.noCallThru().load('../../app/assets/scripts/components/map', {
  'mapbox-gl': mockboxGL
})

import classes from '../helpers/classes'
import { initial } from '../../app/assets/scripts/reducers/layers'

test('map test', t => {
  const component = shallow(<Map layers={initial} />)
  t.truthy(component.hasClass(classes.nodot['map']))
})
