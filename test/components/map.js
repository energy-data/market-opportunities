import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import { Map } from '../../app/assets/scripts/components/map'
import { initial } from '../../app/assets/scripts/reducers/layers'

test('map test', t => {
  const component = shallow(<Map layers={initial} />)
  t.truthy(component.hasClass(classes.nodot['map']))
})
