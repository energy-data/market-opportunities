import React from 'react'
import c from 'classnames'

const BaseLayer = React.createClass({

  propTypes: {
    layer: React.PropTypes.object,
    toggleLayerVisibility: React.PropTypes.func
  },

  render: function () {
    const { name, type } = this.props.layer
    return (
      <li className={c('base-layer', type)}>
        <div>
          <h3>{name}</h3>
          <h5>Subtitle</h5>
          <button onClick={this._handleOnOff} className='button on-off'>on/off</button>
        </div>
      </li>
    )
  },

  _handleOnOff: function (e) {
    this.props.toggleLayerVisibility(e, this.props.layer.id)
  }
})

export default BaseLayer
