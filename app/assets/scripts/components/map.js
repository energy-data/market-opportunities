import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q'

import { mapStyle } from '../constants'
import { inFirstArrayNotSecond, indicatorFilterToMapFilter,
  createPaintObject } from '../utils'
import { countryBounds } from '../../data/bounds'

export const Map = React.createClass({

  propTypes: {
    layers: React.PropTypes.object,
    editLayer: React.PropTypes.object,
    country: React.PropTypes.string
  },

  componentDidMount: function () {
    const map = this._map = new mapboxgl.Map({
      container: 'map',
      style: mapStyle
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

    const oldFilter = this.props.editLayer && this.props.editLayer.filter
    const newFilter = nextProps.editLayer && nextProps.editLayer.filter
    if (!_.isEqual(oldFilter, newFilter) && newFilter) {
      this._map.setFilter(String(nextProps.editLayer.id),
        indicatorFilterToMapFilter(nextProps.editLayer.filter))
    }

    if (nextProps.country !== this.props.country) {
      this._map.fitBounds(
        countryBounds.find(c => c.properties.name === nextProps.country).bbox,
        // TODO: eliminate magic number
        { padding: 30, offset: [160, 0] }
      )
    }
  },

  render: function () {
    return <div id='map' className='map'></div>
  },

  _addLayer: function (layer) {
    this._map.addSource(String(layer.id), {
      type: 'vector',
      url: layer.tilejson
    })
    this._map.addLayer({
      'id': String(layer.id),
      'type': 'fill',
      'source': String(layer.id),
      'source-layer': 'data_layer',
      'interactive': true,
      'paint': createPaintObject(layer),
      'filter': indicatorFilterToMapFilter(layer.filter)
    }, 'waterway-label')
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
    // TODO: make this a memoized selector
    editLayer: state.layers.indicators.find(layer => layer.editing),
    country: state.selection.country
  }
}

export default connect(mapStateToProps)(Map)
