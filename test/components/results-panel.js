import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import ResultsPanel from '../../app/assets/scripts/components/results-panel'

test('header test', t => {
  const component = shallow(<ResultsPanel />)
  t.truthy(component.hasClass(classes.nodot['panel']))
})
