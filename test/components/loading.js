import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import { Loading } from '../../app/assets/scripts/components/loading'

import classes from '../helpers/classes'

test('loading test', t => {
  const component = shallow(<Loading loading={true} />)
  t.truthy(component.hasClass(classes.nodot['loading']))

  // empty component when not loading
  component.setProps({loading: false})
  t.truthy(component.hasClass(classes.nodot['empty']))
})
