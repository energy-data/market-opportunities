import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import { SidePanel } from '../../app/assets/scripts/components/side-panel'
import { initial } from '../../app/assets/scripts/reducers/layers'

test('side panel test', t => {
  const component = shallow(<SidePanel layers={initial}/>)
  t.truthy(component.hasClass(classes.nodot['panel']))
})
