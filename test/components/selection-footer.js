import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import SelectionFooter from '../../app/assets/scripts/components/selection-footer'

test('selection footer test', t => {
  const component = shallow(<SelectionFooter />)
  t.truthy(component.hasClass(classes.nodot['selection footer']))
})
