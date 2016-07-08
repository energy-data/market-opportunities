import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import Scenario from '../../app/assets/scripts/components/scenario'
import { scenarios } from '../fixtures/constants'

test('scenario test', t => {
  const spy = sinon.spy()
  const component = shallow(<Scenario
    info={scenarios[0]}
    updateSelectedScenario={spy}
  />)
  t.truthy(component.hasClass(classes.nodot['scenario']))

  // clicking calls the spy
  component.find('a').simulate('click')
  t.truthy(spy.calledOnce)
  // with the correct value
  t.truthy(spy.calledWith(undefined, scenarios[0].title))
})
