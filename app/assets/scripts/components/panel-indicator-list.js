import React from 'react'
import ScrollArea from 'react-scrollbar/dist/no-css'

import Group from './group'

const PanelIndicatorList = React.createClass({

  propTypes: {
    layers: React.PropTypes.array.isRequired,
    openGroups: React.PropTypes.array,
    country: React.PropTypes.string,
    startEditing: React.PropTypes.func,
    saveEdit: React.PropTypes.func,
    cancelEdit: React.PropTypes.func,
    toggleLayerVisibility: React.PropTypes.func,
    updateLayerFilter: React.PropTypes.func,
    toggleOpenGroup: React.PropTypes.func
  },

  render: function () {
    const { layers, openGroups, country } = this.props
    const groups = {}
    // group the layers
    layers.filter(layer => {
      // if layers have a country option, filter by that
      return !layer.options.hasOwnProperty('countries') ||
        layer.options.countries.indexOf(country.toLowerCase()) > -1
    }).forEach(layer => {
      groups[layer.group]
      ? groups[layer.group].push(layer)
      : groups[layer.group] = [layer]
    })

    return (
      <ScrollArea className='panel__body'>
        <div className='panel__body-inner'>
          {Object.keys(groups).map(key => {
            return <Group
              key={key}
              layers={groups[key]}
              name={key}
              open={openGroups.indexOf(key) > -1}
              startEditing={this.props.startEditing}
              saveEdit={this.props.saveEdit}
              cancelEdit={this.props.cancelEdit}
              toggleLayerVisibility={this.props.toggleLayerVisibility}
              updateLayerFilter={this.props.updateLayerFilter}
              toggleOpenGroup={this.props.toggleOpenGroup}
              />
          })}
        </div>
      </ScrollArea>
    )
  }
})

export default PanelIndicatorList
