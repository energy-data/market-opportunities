import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import PanelTitle from '../../app/assets/scripts/components/panel-title'

test('panel title test', t => {
  const title = 'test title'
  const subtitle = 'test subtitle'
  const spy = sinon.spy()
  const component = shallow(<PanelTitle title={title} subtitle={subtitle} updateVisibleLayers={spy} />)
  t.truthy(component.hasClass(classes.nodot['panel header']))

  t.is(component.find(classes['panel title']).text(), title)

  // click both toggle buttons
  component.find(classes['panel toggle']).first().simulate('click')
  component.find(classes['panel toggle']).last().simulate('click')
  t.truthy(spy.calledTwice)
  t.truthy(spy.calledWith(undefined, 'indicators'))
  t.truthy(spy.calledWith(undefined, 'base'))
})
