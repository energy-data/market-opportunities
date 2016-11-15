import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import { MultiStep } from '../../app/assets/scripts/components/country-selection'

test('multistep test', t => {
  const component = shallow(<MultiStep selection={{step: 'country'}}/>)
  t.truthy(component.hasClass(classes.nodot['country-selection']))
})
