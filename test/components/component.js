import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import Component from '../../app/assets/scripts/components/component'

test('component test', t => {
  const component = shallow(<Component foo='bar' className='test' />)
  t.truthy(component.hasClass('component'))
  t.truthy(component.hasClass('test'))
  t.is(component.text(), 'bar')
})
