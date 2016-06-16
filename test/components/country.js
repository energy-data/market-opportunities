import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import Country from '../../app/assets/scripts/components/country'
import { countries } from '../fixtures/constants'

test('country test', t => {
  const spy = sinon.spy()
  const component = shallow(<Country
    info={countries[0]}
    updateSelectedCountry={spy}
  />)
  t.truthy(component.hasClass(classes.nodot['country']))

  // clicking calls the spy
  component.simulate('click')
  t.truthy(spy.calledOnce)
  // with the correct value
  t.truthy(spy.calledWith(countries[0].name))
})
