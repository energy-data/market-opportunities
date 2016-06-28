import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import PanelFooter from '../../app/assets/scripts/components/panel-footer'

test('panel footer test', t => {
  const component = shallow(<PanelFooter />)
  t.truthy(component.hasClass(classes.nodot['panel footer']))
})
