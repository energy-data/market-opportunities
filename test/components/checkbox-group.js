import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import classes from '../helpers/classes'
import CheckboxGroup from '../../app/assets/scripts/components/checkbox-group'

test('indicator test', t => {
  const component = shallow(<CheckboxGroup
    values={['a']}
    selected={[]}
    layerId={'a'}
    />)
  t.truthy(component.hasClass(classes.nodot['checkbox group']))
})
