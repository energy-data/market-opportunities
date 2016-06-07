import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import { baseLayers } from '../fixtures/constants'
import BaseLayer from '../../app/assets/scripts/components/base-layer'

test('base layer test', t => {
  const spy = sinon.spy()
  const component = shallow(<BaseLayer layer={baseLayers[0]} toggleLayerVisibility={spy} />)
  t.truthy(component.hasClass(classes.nodot['base layer']))

  component.find(classes['base layer toggle']).simulate('click')
  t.truthy(spy.calledOnce)
  t.truthy(spy.calledWith(undefined, baseLayers[0].id))
})
