import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import PanelLayerList from '../../app/assets/scripts/components/panel-base-layer-list'
import { baseLayers } from '../../app/assets/scripts/constants'

test('panel base layer list toggle test', t => {
  const component = shallow(<PanelLayerList layers={baseLayers} />)
  const listElements = component.find(classes['layer list wrapper']).children()
  // make sure some list elements exist
  t.truthy(listElements.length > 0)
})
