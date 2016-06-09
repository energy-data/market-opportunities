import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import Checkbox from '../../app/assets/scripts/components/checkbox'

test('indicator test', t => {
  const spy = sinon.spy()
  const component = shallow(<Checkbox
    value={'a'}
    selected={['a', 'c']}
    layerId={'layerid'}
    updateLayerFilter={spy}
  />)
  t.truthy(component.hasClass(classes.nodot['checkbox']))

  // correctly checked
  t.truthy(component.find('input').props().checked)
  // clicking a box calls the spy
  component.find('input').simulate('change')
  t.truthy(spy.calledOnce)
  // update the values
  component.setProps({value: 'b'})
  // is the box now unchecked?
  t.falsy(component.find('input').props().checked)
})
