import React from 'react'

import { toggleArrayElement } from '../utils'

const CheckboxGroup = React.createClass({

  propTypes: {
    layerId: React.PropTypes.string,
    value: React.PropTypes.string,
    selected: React.PropTypes.array,
    updateLayerFilter: React.PropTypes.func
  },

  render: function () {
    const { value, selected } = this.props
    return (
      <label key={value} for={value} className='form__option form__option--custom-checkbox'>
        <input
          onChange={this._handleChange}
          type='checkbox'
          name={value}
          id={value}
          value={value}
          checked={selected.indexOf(value) > -1}
        />
        <span className='form__option__text'>{value}</span>
        <span className='form__option__ui'></span>
      </label>
    )
  },

  _handleChange: function () {
    const { layerId, value, selected, updateLayerFilter } = this.props
    updateLayerFilter(layerId, { values: toggleArrayElement(selected, value) })
  }
})

export default CheckboxGroup
