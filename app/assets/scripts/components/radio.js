import React from 'react'

const Radio = React.createClass({

  propTypes: {
    layerId: React.PropTypes.string,
    value: React.PropTypes.string,
    selected: React.PropTypes.array,
    updateLayerFilter: React.PropTypes.func
  },

  render: function () {
    const { value, selected, layerId } = this.props
    return (
      <label key={value} htmlFor={value + layerId} className='form__option form__option--custom-radio'>
        <input
          onChange={this._handleChange}
          type='radio'
          name={value + layerId}
          id={value + layerId}
          value={value}
          checked={selected.indexOf(value) > -1}
        />
        <span className='form__option__text'>{value}</span>
        <span className='form__option__ui'></span>
      </label>
    )
  },

  _handleChange: function () {
    const { layerId, value, updateLayerFilter } = this.props
    updateLayerFilter(layerId, { values: [value] })
  }
})

export default Radio
