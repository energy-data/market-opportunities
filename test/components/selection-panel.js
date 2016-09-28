import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
// import { SelectionPanel } from '../../app/assets/scripts/components/selection-panel'

test.skip('selection panel test', t => {
  const component = shallow(<SelectionPanel />)
  t.truthy(component.hasClass(classes.nodot['selection panel']))
})
