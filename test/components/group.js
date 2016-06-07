import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import Group from '../../app/assets/scripts/components/group'

test('group test', t => {
  const component = shallow(<Group />)
  t.truthy(component.hasClass(classes.nodot['group']))
})
