import React from 'react'
import { connect } from 'react-redux'

import { updateVisibleLayers, startEditingLayer, stopEditingLayer,
  toggleLayerVisibility, updateLayerFilter, updateTempFilter,
  toggleOpenGroup, updateStep } from '../actions'

import PanelTitle from './panel-title'
import PanelIndicatorList from './panel-indicator-list'
import PanelBaseLayerList from './panel-base-layer-list'
import PanelFooter from './panel-footer'

export const ControlPanel = React.createClass({

  propTypes: {
    layers: React.PropTypes.object,
    tempFilter: React.PropTypes.object,
    groups: React.PropTypes.object,
    selection: React.PropTypes.object,
    dispatch: React.PropTypes.func
  },

  render: function () {
    const { layers, groups, selection } = this.props

    const PanelLayerList = (layers.visible === 'indicators')
    ? <PanelIndicatorList
      layers={layers[layers.visible]}
      openGroups={groups.open}
      startEditing={this._startEditing}
      saveEdit={this._saveEdit}
      cancelEdit={this._cancelEdit}
      toggleLayerVisibility={this._toggleLayerVisibility}
      updateLayerFilter={this._updateLayerFilter}
      toggleOpenGroup={this._toggleOpenGroup}
    />
    : <PanelBaseLayerList
      layers={layers[layers.visible]}
      toggleLayerVisibility={this._toggleLayerVisibility}
    />

    return (
      <section className='panel' id='control-panel'>
        <PanelTitle
          title={selection.country}
          subtitle={selection.scenario}
          updateVisibleLayers={this._updateVisibleLayers}
          visible={layers.visible}
          openSelection={this._openSelection}
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

  _toggleLayerVisibility: function (id) {
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
  },

  _toggleOpenGroup: function (e, group) {
    e.preventDefault()
    this.props.dispatch(toggleOpenGroup(group))
  },

  _openSelection: function () {
    this.props.dispatch(updateStep('country'))
  }
})
/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    layers: state.layers,
    tempFilter: state.tempFilter,
    groups: state.groups,
    selection: state.selection
  }
}

export default connect(mapStateToProps)(ControlPanel)
