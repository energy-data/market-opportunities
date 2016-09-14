import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import fc from 'turf-featurecollection'
import union from 'turf-union'
import buffer from 'turf-buffer'
import intersect from 'turf-intersect'
import area from 'turf-area'
import flatten from 'geojson-flatten'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q'

import Popup from './popup'
import { mapStyle, intersectPaint, roadLayers, popLayer,
  controlPanelWidth } from '../constants'
import { inFirstArrayNotSecond, indicatorFilterToMapFilter, intersectLayers,
  createDataPaintObject, createOutlinePaintObject,
  createTempPaintStyle } from '../utils'
import { updateLayerGeoJSON, setMapIntersect, setPopulation, setLayers,
  startLoading, stopLoading, updateLayerError, toggleLayerVisibility,
  startEditingLayer } from '../actions'
import { countries } from '../../data/countries'

export const Map = React.createClass({

  propTypes: {
    layers: React.PropTypes.object,
    editLayer: React.PropTypes.object,
    country: React.PropTypes.string,
    tempFilter: React.PropTypes.object,
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
    // always keep population data handy
    map.on('load', () => {
      map.addSource('pop', {
        type: 'vector',
        url: popLayer.tilejson
      })
      this._map.addLayer({
        'id': 'hidden-pop',
        'type': 'fill',
        'source': 'pop',
        'source-layer': 'data_layer',
        'interactive': true,
        'maxzoom': 18,
        'paint': {
          'fill-opacity': 0.01
        }
      }, 'landuse')
      this._hideRoads()
    })
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

    // new layers that were also in old, check for changed geojson and update
    // outlines and intersect accordingly
    const changedGeo = newVisibleLayers.filter(layer => {
      return oldVisibleLayers.map(a => a.id).indexOf(layer.id) > -1
    }).filter(layer => {
      return !_.isEqual(layer.geojson,
        oldVisibleLayers.find(a => a.id === layer.id).geojson)
    })
    if (changedGeo.length) {
      this._updateIntersectedArea(newVisibleLayers)
      changedGeo.forEach(layer => this._updateLayerOutline(layer))
    }

    // we only show one layer data for the singular editing layer
    if (this.props.editLayer && !nextProps.editLayer) {
      const layerToRemove = this.props.editLayer
      // NOTE: to ensure that we only create a new layer GeoJSON when the user
      // has saved their selection, we check the temp filter against the filter
      // in the new version of the editLayer (it was editLayer but now isn't
      // editing)
      // we also create a geojson using the default selection if one doesn't
      // exist EVEN IF the user cancels (we can't distinguish)
      const newVersionOfLayerToRemove = nextProps.layers.indicators
        .find(layer => layer.id === layerToRemove.id)
      if (this.props.tempFilter &&
        (!_.isEqual(this.props.tempFilter.temp, newVersionOfLayerToRemove.filter) ||
          !newVersionOfLayerToRemove.geojson)) {
        this.props.dispatch(startLoading())
        setTimeout(() => {
          try {
            this._createLayerGeoJSON(layerToRemove)
            this._removeLayerData(layerToRemove.id)
          } catch (e) {
            console.warn(e)
            this.props.dispatch(updateLayerError(layerToRemove.id,
              'there was a problem calculating this layer, please try again with new filters'))
            setTimeout(() => {
              this.props.dispatch(updateLayerError(layerToRemove.id, ''))
            }, 10000)
            // if there was an error, remove the data, re-add it to initialize
            // properly, toggle the visiblity (to off) and stop the loading
            this._removeLayerData(layerToRemove.id)
            this.props.dispatch(startEditingLayer(layerToRemove.id))
            this.props.dispatch(toggleLayerVisibility(layerToRemove.id))
            this.props.dispatch(stopLoading())
          }
        // NOTE: this amount of time is required to not interrupt the css
        // transition on the loading indicator
        }, 300)
      } else {
        this._removeLayerData(layerToRemove.id)
      }
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
        countries[nextProps.country].bbox,
        { padding: 30, offset: [controlPanelWidth / 2, 0] }
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
    } else if ((newVisibleLayers.length !== oldVisibleLayers.length) &&
      newVisibleLayers.length >= 2 && !nextProps.editLayer) {
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

    // if we have a new intersected area, let's calculate the intersected population
    if (!_.isEqual(nextProps.layers.intersect, this.props.layers.intersect) &&
      nextProps.layers.intersect && !nextProps.editLayer) {
      this.props.dispatch(startLoading())
      setTimeout(() => {
        try {
          this._calculateIntersectedPopulation(nextProps)
        } catch (e) {
          console.warn(e)
          this.props.dispatch(stopLoading())
        }
      // NOTE: this amount of time is required to not interrupt the css
      // transition on the loading indicator
      }, 300)
    }

    // if we have a new country and it isn't our first, reset our layers
    if (this.props.country && nextProps.country && this.props.country !== nextProps.country) {
      this.props.dispatch(setLayers(nextProps.layers.indicators.map(layer => {
        return Object.assign({}, _.omit(layer, ['editing', 'visible', 'geojson']), {})
      })))
    }

    // Toggle basemap if satellite is on/off
    const oldSatVisibility = this.props.layers.base.find(baseLayer => {
      return baseLayer.id === 'mb-satellite'
    }).visible
    const newSatVisibility = nextProps.layers.base.find(baseLayer => {
      return baseLayer.id === 'mb-satellite'
    }).visible

    if (oldSatVisibility && !newSatVisibility) {
      this._map.removeSource('satellite')
      this._map.removeLayer('satellite')
    } else if (!oldSatVisibility && newSatVisibility) {
      this._map.addSource('satellite', {
        type: 'raster',
        url: 'mapbox://mapbox.satellite'
      })
      this._map.addLayer({
        id: 'satellite',
        type: 'raster',
        source: 'satellite'
      }, 'road-pedestrian-case')
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

  _updateLayerOutline: function (layer) {
    this._map.getSource(`${String(layer.id)}-outline`).setData(layer.geojson)
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
        'filter': indicatorFilterToMapFilter(layer.filter, this.props.country.toLowerCase())
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
            filter: indicatorFilterToMapFilter(layer.filter, this.props.country.toLowerCase())
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
        'filter': indicatorFilterToMapFilter(layer.filter, this.props.country.toLowerCase())
      }, 'waterway-label')
    }
  },

  _removeLayerData: function (id) {
    const map = this._map
    if (map.getSource(`${String(id)}-data`)) {
      map.removeSource(`${String(id)}-data`)
      map.removeLayer(`${String(id)}-data`)
    }
    if (map.getSource(`${String(id)}-source`)) {
      map.removeLayer('temp')
      map.removeSource(`${String(id)}-source`)
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
    this.props.dispatch(setMapIntersect(data))
  },

  _createLayerGeoJSON: function (layer) {
    // query all source features matching the current filters and merge
    // them into a single feature
    // circle and line layers already have the filters applied to the data layer
    // (and no source layer since it is a geojson layer)
    const queryOptions = (layer.options.geometry.type === 'fill')
    ? { sourceLayer: 'data_layer', filter: indicatorFilterToMapFilter(layer.filter, this.props.country.toLowerCase()) }
    : {}
    const features = this._map.querySourceFeatures(`${String(layer.id)}-data`, queryOptions)
    if (features.length) {
      const geo = features.map(a => {
        return buffer(a, 0)
      }).reduce((a, b) => {
        return union(a, b)
      })
      this.props.dispatch(stopLoading())
      this.props.dispatch(updateLayerGeoJSON(layer.id, geo))
    } else {
      this.props.dispatch(stopLoading())
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
        indicatorFilterToMapFilter(props.editLayer.filter, props.country.toLowerCase()))
    } else {
      const sourceName = `${String(props.editLayer.id)}-source`
      if (this._map.getSource(sourceName).loaded()) {
        this._map.off('render')
        const features = this._map.querySourceFeatures(sourceName, {
          sourceLayer: 'data_layer',
          filter: indicatorFilterToMapFilter(props.editLayer.filter, props.country.toLowerCase())
        })
        const buffered = buffer(fc(features), props.editLayer.filter.value.toFixed(0), 'kilometers')
        this._map.getSource(`${String(props.editLayer.id)}-data`).setData(buffered)
      } else {
        this._map.on('render', () => {
          this._updateMapFilter(props)
        })
      }
    }
  },

  _calculateIntersectedPopulation: function (props) {
    const popFeatures = this._map.querySourceFeatures('pop', {
      sourceLayer: 'data_layer',
      filter: ['==', 'iso', props.country.toLowerCase()]
    })
    let flattenedFeatures = []
    popFeatures.filter(a => a.geometry.type === 'MultiPolygon').forEach(multi => {
      const flattened = flatten(multi)
      flattenedFeatures = flattenedFeatures.concat(flattened)
    })
    const population = popFeatures
      .filter(a => a.geometry.type === 'Polygon')
      .concat(flattenedFeatures)
      .reduce((a, b) => {
        const subPopulation = props.layers.intersect.geometry.coordinates.reduce((c, d) => {
          let dFeature = {
            type: 'Feature',
            properties: {},
            geometry: {
              coordinates: d,
              type: 'Polygon'
            }
          }
          let clip = intersect(dFeature, {
            type: 'Feature',
            properties: {},
            geometry: b.geometry
          })
          if (clip) {
            return c + area(clip) * b.properties.avg
          } else {
            return c
          }
        }, 0)
        return a + subPopulation
      }, 0)
    this.props.dispatch(stopLoading())
    this.props.dispatch(setPopulation(population))
  }
})
/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    layers: state.layers,
    editLayer: state.layers.indicators.find(layer => layer.editing),
    country: state.selection.country,
    tempFilter: state.tempFilter
  }
}

export default connect(mapStateToProps)(Map)
