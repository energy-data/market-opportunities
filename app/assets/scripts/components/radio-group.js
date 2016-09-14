import React from 'react'

import Radio from './radio'

const RadioGroup = React.createClass({

  propTypes: {
    layerId: React.PropTypes.string,
    values: React.PropTypes.array,
    selected: React.PropTypes.array,
    updateLayerFilter: React.PropTypes.func
  },

  render: function () {
    const { values, selected, layerId, updateLayerFilter } = this.props
    return (
      <div className='form__group'>
        {values.map(value => {
          return (
            <Radio
              key={value}
              layerId={layerId}
              value={value}
              selected={selected}
              updateLayerFilter={updateLayerFilter}
              />
          )
        })}
      </div>
    )
  }
})

export default RadioGroup
