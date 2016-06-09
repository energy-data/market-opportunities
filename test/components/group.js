import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import Group from '../../app/assets/scripts/components/group'
import { mockLayers } from '../fixtures/constants'

test('group test', t => {
  const group = 'Socioeconomics'
  const spy = sinon.spy()
  const component = shallow(<Group
    name={group}
    layers={mockLayers.filter(layer => layer.group === group)}
    toggleOpenGroup={spy}
  />)

  t.truthy(component.hasClass(classes.nodot['group']))

  component.find(classes['group toggle']).simulate('click')
  t.truthy(spy.calledOnce)
  t.truthy(spy.calledWith(undefined, group))
})
