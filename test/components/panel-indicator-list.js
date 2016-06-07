import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import PanelLayerList from '../../app/assets/scripts/components/panel-indicator-list'
import { mockLayers } from '../../app/assets/scripts/constants'

test('panel layer toggle test', t => {
  const component = shallow(<PanelLayerList layers={mockLayers}/>)
  const listElements = component.find(classes['layer list wrapper']).children()

  // test top layer class
  t.truthy(component.hasClass(classes.nodot['panel layer list']))
  // make sure we rendered some layers
  t.truthy(listElements.length > 0)
})
