import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import fc from 'turf-featurecollection'
import union from 'turf-union'
import buffer from 'turf-buffer'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q'

import Popup from './popup'
import { mapStyle, intersectPaint, roadLayers } from '../constants'
import { inFirstArrayNotSecond, indicatorFilterToMapFilter, intersectLayers,
  createDataPaintObject, createOutlinePaintObject, createTempPaintStyle } from '../utils'
import { updateLayerGeoJSON, setMapIntersect } from '../actions'
import { countryBounds } from '../../data/bounds'

export const Map = React.createClass({

  propTypes: {
    layers: React.PropTypes.object,
    editLayer: React.PropTypes.object,
    country: React.PropTypes.string,
    iso: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    onCanvasReady: React.PropTypes.func
  },

  componentDidMount: function () {
    const map = this._map = new mapboxgl.Map({
      container: 'map',
      style: mapStyle,
      preserveDrawingBuffer: true
    })
    this.props.onCanvasReady(map)
    map.on('click', this._handleMapClick)
  },

  componentWillReceiveProps: function (nextProps) {
    const oldVisibleLayers = this.props.layers.indicators
      .filter(layer => layer.visible && !layer.editing && layer.geojson)
    const newVisibleLayers = nextProps.layers.indicators
      .filter(layer => layer.visible && !layer.editing && layer.geojson)

    // update visible layer outlines on the map
    // new layers that weren't in the old get added
    inFirstArrayNotSecond(newVisibleLayers, oldVisibleLayers, a => a.id)
      .forEach(layer => this._addLayerOutline(layer))
    // old layers that aren't in the new get removed
    inFirstArrayNotSecond(oldVisibleLayers, newVisibleLayers, a => a.id)
      .forEach(layer => this._removeLayerOutline(layer))

    // we only show one layer data for the singular editing layer
    if (this.props.editLayer && !nextProps.editLayer) {
      this._removeLayerData(this.props.editLayer)
    } else if (!this.props.editLayer && nextProps.editLayer) {
      this._addLayerData(nextProps.editLayer)
    }

    // if we have an editing layer, make updates for new filter options
    if (this.props.editLayer && nextProps.editLayer) {
      const oldFilter = this.props.editLayer && this.props.editLayer.filter
      const newFilter = nextProps.editLayer && nextProps.editLayer.filter
      if (!_.isEqual(oldFilter, newFilter) && newFilter) {
        this._updateMapFilter(nextProps)
      }
    }

    // if we have a newly selected country, zoom to it
    if (nextProps.country !== this.props.country) {
      this._map.fitBounds(
        countryBounds.find(c => c.properties.name === nextProps.country).bbox,
        // TODO: eliminate magic number, it's half the width of the control panel
        { padding: 30, offset: [160, 0] }
      )
    }

    // if we cross the "2 visible layer outlines" threshold, add/remove the
    // intersect accordingly
    // if we change number of visible layer outlines, update the intersect
    // this assumes we can't swap visible layer outlines without first
    // adding/removing
    if (newVisibleLayers.length >= 2 && oldVisibleLayers.length < 2) {
      this._addIntersectedArea(newVisibleLayers)
    } else if (newVisibleLayers.length < 2 && oldVisibleLayers.length >= 2) {
      this._removeIntersectedArea()
    // TODO: fix intersect update logic, also needs to account for same length, new filter
    } else if ((newVisibleLayers.length !== oldVisibleLayers.length) &&
      newVisibleLayers.length >= 2) {
      this._updateIntersectedArea(newVisibleLayers)
    }

    // Toggles basemap roads based on props
    const oldRoadVisibility = this.props.layers.base.find(baseLayer => {
      return baseLayer.id === 'mb-road-layers'
    }).visible
    const newRoadVisibility = nextProps.layers.base.find(baseLayer => {
      return baseLayer.id === 'mb-road-layers'
    }).visible

    if (oldRoadVisibility && !newRoadVisibility) {
      this._hideRoads()
    } else if (!oldRoadVisibility && newRoadVisibility) {
      this._showRoads()
    }
  },

  render: function () {
    return <div id='map' className='map'></div>
  },

  _addLayerOutline: function (layer) {
    this._map.addSource(`${String(layer.id)}-outline`, {
      type: 'geojson',
      data: layer.geojson
    })
    this._map.addLayer({
      'id': `${String(layer.id)}-outline`,
      'type': 'line',
      'source': `${String(layer.id)}-outline`,
      'interactive': true,
      'paint': createOutlinePaintObject(layer)
    }, 'waterway-label')
  },

  _removeLayerOutline: function (layer) {
    const map = this._map
    if (map.getSource(`${String(layer.id)}-outline`)) {
      map.removeSource(`${String(layer.id)}-outline`)
      map.removeLayer(`${String(layer.id)}-outline`)
    }
  },

  _addLayerData: function (layer) {
    if (layer.options.geometry.type === 'fill') {
      this._map.addSource(`${String(layer.id)}-data`, {
        type: 'vector',
        url: layer.tilejson
      })
      this._map.addLayer({
        'id': `${String(layer.id)}-data`,
        'type': 'fill',
        'source': `${String(layer.id)}-data`,
        'source-layer': 'data_layer',
        'interactive': true,
        'maxzoom': 18,
        'paint': createDataPaintObject(layer),
        'filter': indicatorFilterToMapFilter(layer.filter, this.props.iso)
      }, 'waterway-label')
    } else {
      const sourceName = `${String(layer.id)}-source`
      // for non fill layers we add the source and construct the data
      this._map.addSource(sourceName, {
        type: 'vector',
        url: layer.tilejson
      })
      // listen for the source being loaded, then calculate the data layer
      this._map.on('render', () => {
        if (this._map.getSource(sourceName).loaded()) {
          this._map.off('render')
          const features = this._map.querySourceFeatures(sourceName, {
            sourceLayer: 'data_layer',
            filter: indicatorFilterToMapFilter(layer.filter, this.props.iso)
          })
          const buffered = buffer(fc(features), layer.filter.value.toFixed(0), 'kilometers')
          this._map.addSource(`${String(layer.id)}-data`, {
            type: 'geojson',
            data: buffered
          })
          this._map.addLayer({
            'id': `${String(layer.id)}-data`,
            'type': 'fill',
            'source': `${String(layer.id)}-data`,
            'interactive': true,
            'maxzoom': 18,
            'paint': createDataPaintObject(layer)
          }, 'waterway-label')
        }
      })
      // force source loading with temp layer
      this._map.addLayer({
        'id': 'temp',
        'type': layer.options.geometry.type,
        'source': sourceName,
        'source-layer': 'data_layer',
        'interactive': true,
        'maxzoom': 18,
        'paint': createTempPaintStyle(layer),
        'filter': indicatorFilterToMapFilter(layer.filter, this.props.iso)
      }, 'waterway-label')
    }
  },

  _removeLayerData: function (layer) {
    // TODO: call this conditionally, we shouldn't do it when removing the data
    // for a cancelEdit
    this._createLayerGeoJSON(layer)
    const map = this._map
    if (map.getSource(`${String(layer.id)}-data`)) {
      map.removeSource(`${String(layer.id)}-data`)
      map.removeLayer(`${String(layer.id)}-data`)
    }
    if (map.getSource(`${String(layer.id)}-source`)) {
      map.removeLayer('temp')
      map.removeSource(`${String(layer.id)}-source`)
    }
  },

  _addIntersectedArea: function (layers) {
    const data = intersectLayers(layers)
    if (data) {
      this._map.addSource('intersect', {
        type: 'geojson',
        data
      })
      this._map.addLayer({
        'id': 'intersect',
        'type': 'fill',
        'source': 'intersect',
        'interactive': true,
        'paint': intersectPaint
      }, 'waterway-label')
    }
    this.props.dispatch(setMapIntersect(data))
  },

  _removeIntersectedArea: function () {
    const map = this._map
    if (map.getSource('intersect')) {
      map.removeSource('intersect')
      map.removeLayer('intersect')
      this.props.dispatch(setMapIntersect(null))
    }
  },

  _updateIntersectedArea: function (layers) {
    const data = intersectLayers(layers)
    if (data) {
      this._map.getSource('intersect').setData(data)
    }
  },

  _createLayerGeoJSON: function (layer) {
    // query all source features matching the current filters and merge
    // them into a single feature
    // circle and line layers already have the filters applied to the data layer
    // (and no source layer since it is a geojson layer)
    const queryOptions = (layer.options.geometry.type === 'fill')
    ? { sourceLayer: 'data_layer', filter: indicatorFilterToMapFilter(layer.filter, this.props.iso) }
    : {}
    const features = this._map.querySourceFeatures(`${String(layer.id)}-data`, queryOptions)
    if (features.length) {
      const geo = features.map(a => {
        return buffer(a, 0)
      }).reduce((a, b) => {
        return union(a, b)
      })
      this.props.dispatch(updateLayerGeoJSON(layer.id, geo))
    }
  },

  _handleMapClick: function (e) {
    const { editLayer } = this.props
    if (editLayer) {
      const mapProperty = editLayer.options.value.property
      const rendered = this._map.queryRenderedFeatures(e.point, {
        layers: [`${String(editLayer.id)}-data`]
      })
      if (rendered.length) {
        const containerDivElement = document.createElement('div')
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(containerDivElement)
          .addTo(this._map)

        ReactDOM.render(<Popup
          values={rendered.map(r => r.properties[mapProperty])}
          mapProperty={mapProperty}
        />, containerDivElement)
      }
    }
  },

  _hideRoads: function () {
    roadLayers.forEach(roadLayer => {
      this._map.setLayoutProperty(roadLayer, 'visibility', 'none')
    })
  },

  _showRoads: function () {
    roadLayers.forEach(roadLayer => {
      this._map.setLayoutProperty(roadLayer, 'visibility', 'visible')
    })
  },

  _updateMapFilter: function (props) {
    if (props.editLayer.options.geometry.type === 'fill') {
      this._map.setFilter(`${String(props.editLayer.id)}-data`,
        indicatorFilterToMapFilter(props.editLayer.filter, props.iso))
    } else {
      const features = this._map.querySourceFeatures(`${String(props.editLayer.id)}-source`, {
        sourceLayer: 'data_layer',
        filter: indicatorFilterToMapFilter(props.editLayer.filter, this.props.iso)
      })
      const buffered = buffer(fc(features), props.editLayer.filter.value.toFixed(0), 'kilometers')
      this._map.getSource(`${String(props.editLayer.id)}-data`).setData(buffered)
    }
  }
})
/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    layers: state.layers,
    // TODO: make this a memoized selector
    editLayer: state.layers.indicators.find(layer => layer.editing),
    country: state.selection.country,
    // TODO: this can be an object property lookup once we have a better country object
    iso: (countryBounds.find(c => c.properties.name === state.selection.country) || {
      properties: { 'iso_a3': 'none' }
    })['properties']['iso_a3'].toLowerCase()
  }
}

export default connect(mapStateToProps)(Map)
