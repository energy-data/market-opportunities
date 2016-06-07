import React from 'react'

import Group from './group'
import Indicator from './indicator'

const PanelIndicatorList = React.createClass({

  propTypes: {
    layers: React.PropTypes.array.isRequired,
    startEditing: React.PropTypes.func,
    saveEdit: React.PropTypes.func,
    cancelEdit: React.PropTypes.func,
    toggleLayerVisibility: React.PropTypes.func,
    updateLayerFilter: React.PropTypes.func
  },

  render: function () {
    const layers = this.props.layers
    layers.sort((a, b) => a.group - b.group)

    let allListElements = []
    // add group dividers
    layers.forEach((layer, i) => {
      if (i === 0 || layers[i - 1].group !== layer.group) {
        allListElements.push(<Group key={layer.group} name={layer.group} />)
      }
      allListElements.push(<Indicator
        key={layer.id}
        layer={layer}
        startEditing={this.props.startEditing}
        saveEdit={this.props.saveEdit}
        cancelEdit={this.props.cancelEdit}
        toggleLayerVisibility={this.props.toggleLayerVisibility}
        updateLayerFilter={this.props.updateLayerFilter}
      />)
    })

    return (
      <div className='panel__body'>
        <div className='panel__body-inner'>
          {allListElements.map(el => {
            return el
          })}
        </div>
      </div>
    )
  }
})

export default PanelIndicatorList
