import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import { Login } from '../../app/assets/scripts/components/login'
import { initial } from '../../app/assets/scripts/reducers/user'

// TODO: test actual interaction

test('login form - not logged in', t => {
  const spy = sinon.spy()
  const component = shallow(<Login
    dispatch={spy}
    user={initial}
  />)
  t.truthy(component.hasClass(classes.nodot['login']))

  t.is(component.find('input').length, 2, 'shows username/password fields')
  t.falsy(component.find(classes['logged in status']).length, 'does not show logged in status')
  t.falsy(component.find(classes['logout button']).length, 'does not show logout button')
  t.falsy(component.find(classes['login error']).length, 'does not show error message')
})

test('login form - logged in', t => {
  const spy = sinon.spy()
  const component = shallow(<Login
    dispatch={spy}
    user={{ status: 'success', token: 'FOO' }}
  />)
  t.truthy(component.hasClass(classes.nodot['login']))

  t.is(component.find('input').length, 0, 'does not show username/password fields')
  t.truthy(component.find(classes['logged in status']).length, 'shows logged in status')
  t.truthy(component.find(classes['logout button']).length, 'shows logout button')
  t.falsy(component.find(classes['login error']).length, 'does not show error message')
})

