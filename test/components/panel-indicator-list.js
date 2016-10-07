import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import PanelIndicatorList from '../../app/assets/scripts/components/panel-indicator-list'
import { mockLayers } from '../fixtures/constants'

test('panel indicator list test', t => {
  const component = shallow(<PanelIndicatorList
    layers={mockLayers}
    openGroups={[]}
    country='nga'
  />)
  const listElements = component.find(classes['layer list wrapper']).children()

  // test top layer class
  t.truthy(component.hasClass(classes.nodot['panel layer list']))
  // make sure we rendered some layers
  t.truthy(listElements.length > 0)
})
