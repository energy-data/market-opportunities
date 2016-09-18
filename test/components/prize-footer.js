import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import PrizeFooter from '../../app/assets/scripts/components/prize-footer'

test('panel footer test', t => {
  const component = shallow(<PrizeFooter />)
  t.truthy(component.hasClass(classes.nodot['prize footer']))
})
