import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import PrizePanel from '../../app/assets/scripts/components/prize-panel'

test('results fold test', t => {
  const component = shallow(<PrizePanel />)
  t.truthy(component.hasClass(classes.nodot['prize panel']))
})
