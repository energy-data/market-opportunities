import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import ResultsFold from '../../app/assets/scripts/components/results-fold'

test('results fold test', t => {
  const component = shallow(<ResultsFold />)
  t.truthy(component.hasClass(classes.nodot['results fold']))
})
