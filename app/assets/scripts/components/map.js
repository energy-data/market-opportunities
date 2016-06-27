import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q'

import { inFirstArrayNotSecond } from '../utils'
import { countryBounds } from '../../data/bounds'

export const Map = React.createClass({

  propTypes: {
    layers: React.PropTypes.object,
    country: React.PropTypes.string
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
    /* istanbul ignore next */
    map.on('moveend', () => this.setState({zoom: map.getZoom()}))
  },

  componentWillReceiveProps: function (nextProps) {
    const oldVisibleLayers = this.props.layers.indicators
      .concat(this.props.layers.base).filter(layer => layer.visible)
    const newVisibleLayers = nextProps.layers.indicators
      .concat(nextProps.layers.base).filter(layer => layer.visible)

    // update visible layers on the map
    // new layers that weren't in the old get added
    inFirstArrayNotSecond(newVisibleLayers, oldVisibleLayers, a => a.id)
      .forEach(layer => this._addLayer(layer))
    // old layers that aren't in the new get removed
    inFirstArrayNotSecond(oldVisibleLayers, newVisibleLayers, a => a.id)
      .forEach(layer => this._removeLayer(layer))

    if (nextProps.country !== this.props.country) {
      this._map.fitBounds(
        countryBounds.find(c => c.properties.name === nextProps.country).bbox,
        // TODO: eliminate magic number
        { padding: 30, offset: [160, 0] }
      )
    }
  },

  render: function () {
    const { layers } = this.props

    const visibleIndicators = layers.indicators.filter(layer => layer.visible)
      .map(layer => layer.name)
    const baseIndicators = layers.base.filter(layer => layer.visible)
      .map(layer => layer.name)
    const editLayer = layers.indicators.filter(layer => layer.editing)

    return (
      <div id='map' className='map'>
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
  },

  _addLayer: function (layer) {
    this._map.addSource(String(layer.id), {
      type: 'vector',
      url: layer.url
    })
    this._map.addLayer({
      'id': String(layer.id),
      'type': layer.layerType,
      'source': String(layer.id),
      'source-layer': 'data_layer',
      'interactive': true,
      'paint': layer.paint
    })
  },

  _removeLayer: function (layer) {
    this._map.removeSource(layer.id)
    this._map.removeLayer(layer.id)
  }
})
/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    layers: state.layers,
    country: state.selection.country
  }
}

export default connect(mapStateToProps)(Map)
