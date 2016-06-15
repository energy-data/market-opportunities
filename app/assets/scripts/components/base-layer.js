import React from 'react'

const BaseLayer = React.createClass({

  propTypes: {
    layer: React.PropTypes.object,
    toggleLayerVisibility: React.PropTypes.func
  },

  render: function () {
    const { name, visible } = this.props.layer
    return (
      <li className='layer-list__layer-wrapper'>
        <article className='layer layer--base'>
          <header className='layer__header'>
            <div className='layer__headline'>
              <h1 className='layer__title'>{name}</h1>
            </div>
            <div className='layer__actions'>
              <label for='form-custom-switch-1b' className='form__option form__option--switch' title='Toggle layer on/off'>
                <input
                  onChange={this._handleOnOff}
                  defaultChecked={visible}
                  type='checkbox'
                  name='form-custom-checkbox'
                  name='form-custom-switch-1b'
                  id='form-custom-switch-1b'
                  />
                <span className='form__option__text'>On/off</span>
                <span className='form__option__ui'></span>
              </label>
            </div>
          </header>
        </article>
      </li>
    )
  },

  _handleOnOff: function () {
    this.props.toggleLayerVisibility(this.props.layer.id)
  }
})

export default BaseLayer
