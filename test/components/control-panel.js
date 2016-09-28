import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
// import { ControlPanel } from '../../app/assets/scripts/components/control-panel'
import { initial } from '../../app/assets/scripts/reducers/layers'

test.skip('control panel test', t => {
  const component = shallow(<ControlPanel
    layers={initial}
    groups={{open: []}}
    prize={{}}
    selection={{country: 'Country'}}
  />)
  t.truthy(component.hasClass(classes.nodot['panel']))
})
