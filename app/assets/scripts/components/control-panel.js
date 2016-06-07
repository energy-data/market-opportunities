import React from 'react'
import { connect } from 'react-redux'

import { updateVisibleLayers, startEditingLayer, stopEditingLayer,
  toggleLayerVisibility, updateLayerFilter, updateTempFilter } from '../actions'

import PanelTitle from './panel-title'
import PanelIndicatorList from './panel-indicator-list'
import PanelBaseLayerList from './panel-base-layer-list'
import PanelFooter from './panel-footer'

export const ControlPanel = React.createClass({

  propTypes: {
    layers: React.PropTypes.object,
    tempFilter: React.PropTypes.object,
    dispatch: React.PropTypes.func
  },

  render: function () {
    const { layers } = this.props

    const PanelLayerList = (layers.visible === 'indicators')
    ? <PanelIndicatorList
      layers={layers[layers.visible]}
      startEditing={this._startEditing}
      saveEdit={this._saveEdit}
      cancelEdit={this._cancelEdit}
      toggleLayerVisibility={this._toggleLayerVisibility}
      updateLayerFilter={this._updateLayerFilter}
    />
    : <PanelBaseLayerList
      layers={layers[layers.visible]}
      toggleLayerVisibility={this._toggleLayerVisibility}
    />

    return (
      <section className='panel' id='control-panel'>
        <PanelTitle
          title='Tanzania'
          subtitle='Solar for rural areas'
          updateVisibleLayers={this._updateVisibleLayers}
          visible={layers.visible}
        />
        { PanelLayerList }
        <PanelFooter />
      </section>
    )
  },

  _updateVisibleLayers: function (e, visible) {
    e.preventDefault()
    this.props.dispatch(updateVisibleLayers(visible))
  },

  _toggleLayerVisibility: function (e, id) {
    e.preventDefault()
    this.props.dispatch(toggleLayerVisibility(id))
  },

  _updateLayerFilter: function (id, filter) {
    this.props.dispatch(updateLayerFilter(id, filter))
  },

  _startEditing: function (e, id) {
    const { dispatch, layers } = this.props
    e.preventDefault()
    dispatch(startEditingLayer(id))
    dispatch(updateTempFilter(layers.indicators.find(l => l.id === id).filter))
  },

  _saveEdit: function (e, id) {
    e.preventDefault()
    this.props.dispatch(stopEditingLayer(id))
  },

  _cancelEdit: function (e, id) {
    const { dispatch, tempFilter } = this.props
    e.preventDefault()
    dispatch(stopEditingLayer(id))
    dispatch(updateLayerFilter(id, tempFilter.temp))
  }
})

function mapStateToProps (state) {
  return {
    layers: state.layers,
    tempFilter: state.tempFilter
  }
}

export default connect(mapStateToProps)(ControlPanel)
