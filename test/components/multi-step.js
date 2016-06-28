import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import { MultiStep } from '../../app/assets/scripts/components/multi-step'

test('multistep test', t => {
  const component = shallow(<MultiStep selection={{step: 'country'}}/>)
  t.truthy(component.hasClass(classes.nodot['multi step']))
})
