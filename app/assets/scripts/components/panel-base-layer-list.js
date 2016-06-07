import React from 'react'

import BaseLayer from './base-layer'

const PanelBaseLayerList = React.createClass({

  propTypes: {
    layers: React.PropTypes.array.isRequired,
    toggleLayerVisibility: React.PropTypes.func
  },

  render: function () {
    const layers = this.props.layers

    return (
      <div className='panel__body'>
        <div className='panel__body-inner'>
          {layers.map(layer => {
            return <BaseLayer
              key={layer.id}
              layer={layer}
              toggleLayerVisibility={this.props.toggleLayerVisibility}
            />
          })}
        </div>
      </div>
    )
  }
})

export default PanelBaseLayerList
