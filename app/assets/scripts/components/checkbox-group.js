import React from 'react'

import Checkbox from './checkbox'

const CheckboxGroup = React.createClass({

  propTypes: {
    layerId: React.PropTypes.string,
    values: React.PropTypes.array,
    selected: React.PropTypes.array,
    updateLayerFilter: React.PropTypes.func
  },

  render: function () {
    const { values, selected, layerId, updateLayerFilter } = this.props
    return (
      <fieldset className='form__fieldset'>
        <legend className='form__legend'>Edit</legend>
        <div className='form__group'>
          {values.map(value => {
            return (
              <Checkbox
                key={value}
                layerId={layerId}
                value={value}
                selected={selected}
                updateLayerFilter={updateLayerFilter}
                />
            )
          })}
        </div>
      </fieldset>
    )
  }
})

export default CheckboxGroup
