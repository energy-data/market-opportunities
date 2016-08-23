import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import Country from '../../app/assets/scripts/components/country'
import { countries } from '../../app/assets/data/countries'

test('country test', t => {
  const id = 'NGA'
  const spy = sinon.spy()
  const component = shallow(<Country
    id={id}
    info={countries[id]}
    updateSelectedCountry={spy}
  />)
  t.truthy(component.hasClass(classes.nodot['country']))

  // clicking calls the spy
  component.find('a').simulate('click')
  t.truthy(spy.calledOnce)
  // with the correct value
  t.truthy(spy.calledWith(undefined, id))
})
