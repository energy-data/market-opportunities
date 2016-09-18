import React from 'react'
import { connect } from 'react-redux'

import { updateVisibleLayers, startEditingLayer, stopEditingLayer,
  toggleLayerVisibility, updateLayerFilter, updateTempFilter,
  toggleOpenGroup, updateStep } from '../actions'
import { countries } from '../../data/countries'

import PanelTitle from './panel-title'
import PanelIndicatorList from './panel-indicator-list'
import PanelBaseLayerList from './panel-base-layer-list'

export const ControlPanel = React.createClass({

  propTypes: {
    layers: React.PropTypes.object,
    tempFilter: React.PropTypes.object,
    groups: React.PropTypes.object,
    selection: React.PropTypes.object,
    dispatch: React.PropTypes.func
  },

  componentWillReceiveProps: function (nextProps) {
    // NOTE: this a test for having a new set of indicators so we can open the
    // first group
    if (nextProps.layers.indicators.length && nextProps.layers.indicators.length !== this.props.layers.indicators.length) {
      this.props.dispatch(toggleOpenGroup(nextProps.layers.indicators[0].group))
    }
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
          title={(countries[selection.country] || {}).name}
          subtitle={selection.scenario}
          updateVisibleLayers={this._updateVisibleLayers}
          visible={layers.visible}
          openSelection={this._openSelection}
        />
        { PanelLayerList }
        <footer className='panel__footer'></footer>
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
    const layer = layers.indicators.find(l => l.id === id)
    if (e) e.preventDefault()
    dispatch(startEditingLayer(id))
    // save temp filter
    dispatch(updateTempFilter(layer.filter))
  },

  _saveEdit: function (e, id) {
    e.preventDefault()
    this.props.dispatch(stopEditingLayer(id))
  },

  _cancelEdit: function (e, id) {
    const { dispatch, tempFilter } = this.props
    if (e) e.preventDefault()
    dispatch(updateLayerFilter(id, tempFilter.temp))
    dispatch(stopEditingLayer(id))
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
    selection: state.selection,
    prize: state.prize
  }
}

export default connect(mapStateToProps)(ControlPanel)
