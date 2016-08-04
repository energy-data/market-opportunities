import React from 'react'
import c from 'classnames'

import Indicator from './indicator'

const Group = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    open: React.PropTypes.bool,
    layers: React.PropTypes.array,
    startEditing: React.PropTypes.func,
    saveEdit: React.PropTypes.func,
    cancelEdit: React.PropTypes.func,
    toggleLayerVisibility: React.PropTypes.func,
    updateLayerFilter: React.PropTypes.func,
    toggleOpenGroup: React.PropTypes.func
  },

  render: function () {
    const { name, layers, open } = this.props
    return (
      <section className={c('layer-group', {'layer-group--expanded': open})}>
        <header className='layer-group__header'>
          <a onClick={this._toggleOpenGroup} href='#' title='Expand/collapse group' className='layer-group__toggle'>
            <h1 className='layer-group__title'>{name}</h1>
          </a>
        </header>
        <div className='layer-group__body'>
          <ul className='layer-list'>
            {layers.map(layer => {
              return <Indicator
                key={layer.id}
                layer={layer}
                startEditing={this.props.startEditing}
                saveEdit={this.props.saveEdit}
                cancelEdit={this.props.cancelEdit}
                toggleLayerVisibility={this.props.toggleLayerVisibility}
                updateLayerFilter={this.props.updateLayerFilter}
              />
            })}
          </ul>
        </div>
      </section>
    )
  },

  _toggleOpenGroup: function (e) {
    this.props.toggleOpenGroup(e, this.props.name)
  }
})

export default Group
