import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q'

export const Map = React.createClass({

  propTypes: {
    layers: React.PropTypes.object
  },

  // for testing only
  getInitialState: function () {
    return {
      zoom: 0
    }
  },

  componentDidMount: function () {
    const map = this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v8'
    })
    map.on('moveend', () => this.setState({zoom: map.getZoom()}))
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
        <div className='temp-map-hover'>
          <p>THE MAP</p>
          <p>Visible Indicators: {visibleIndicators.join(', ')}</p>
          <p>Visible Base Layers: {baseIndicators.join(', ')}</p>
          <p>Layer Being Edited: {editLayer.map(layer => layer.name).join(', ')}</p>
          <p>Edited Layer Filter: {JSON.stringify(editLayer.map(layer => layer.filter))}</p>
          <p>Zoom: {this.state.zoom}</p>
        </div>
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
