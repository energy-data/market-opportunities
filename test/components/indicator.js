import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import classes from '../helpers/classes'
import { mockLayers } from '../fixtures/constants'
import Indicator from '../../app/assets/scripts/components/indicator'

test('indicator test', t => {
  const [ startSpy, saveSpy, cancelSpy, toggleSpy, updateSpy ] = [1, 2, 3, 4, 5].map(s => {
    return sinon.spy()
  })
  const component = shallow(<Indicator
    layer={mockLayers[2]}
    startEditing={startSpy}
    saveEdit={saveSpy}
    cancelEdit={cancelSpy}
    toggleLayerVisibility={toggleSpy}
    updateLayerFilter={updateSpy}
  />)
  t.truthy(component.hasClass(classes.nodot['indicator']))

  // toggle the on/off button and test that it calls the function appropriately
  component.find(classes['indicator toggle']).simulate('change')
  t.truthy(toggleSpy.calledOnce)
  t.truthy(toggleSpy.calledWith(mockLayers[2].id))

  // click the editing button and test that it calls the function appropriately
  component.find(classes['indicator edit']).simulate('click')
  t.truthy(startSpy.calledOnce)
  t.truthy(startSpy.calledWith(undefined, mockLayers[2].id))

  // click the cancel edits button and test that it calls the function appropriately
  component.find(classes['indicator cancel']).simulate('click')
  t.truthy(cancelSpy.calledOnce)
  t.truthy(cancelSpy.calledWith(undefined, mockLayers[2].id))

  // click the save edits button and test that it calls the function appropriately
  component.find(classes['indicator save']).simulate('click')
  t.truthy(saveSpy.calledOnce)
  t.truthy(saveSpy.calledWith(undefined, mockLayers[2].id))
})
