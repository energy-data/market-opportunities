import React from 'react'
import { connect } from 'react-redux'

export const Map = React.createClass({

  propTypes: {
    layers: React.PropTypes.object
  },

  render: function () {
    const { layers } = this.props

    const visibleIndicators = layers.indicators.filter(layer => layer.visible)
      .map(layer => layer.name)
    const baseIndicators = layers.base.filter(layer => layer.visible)
      .map(layer => layer.name)
    const editLayer = layers.indicators.filter(layer => layer.editing)

    return (
      <div className='map' id='map'>
        <p>THE MAP</p>
        <p>Visible Indicators: {visibleIndicators.join(', ')}</p>
        <p>Visible Base Layers: {baseIndicators.join(', ')}</p>
        <p>Layer Being Edited: {editLayer.map(layer => layer.name).join(', ')}</p>
        <p>Edited Layer Filter: {JSON.stringify(editLayer.map(layer => layer.filter))}</p>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    layers: state.layers
  }
}

export default connect(mapStateToProps)(Map)
