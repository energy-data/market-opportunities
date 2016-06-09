import React from 'react'
import Nouislider from 'react-nouislider'
import c from 'classnames'

import CheckboxGroup from './checkbox-group'

const Indicator = React.createClass({

  propTypes: {
    layer: React.PropTypes.object,
    startEditing: React.PropTypes.func,
    saveEdit: React.PropTypes.func,
    cancelEdit: React.PropTypes.func,
    toggleLayerVisibility: React.PropTypes.func,
    updateLayerFilter: React.PropTypes.func
  },

  render: function () {
    const { id, name, type, editing, options, filter } = this.props.layer
    const { updateLayerFilter } = this.props

    let Editor
    if (options.range) {
      Editor = <div className='slider-wrapper'><Nouislider
        range={{min: options.range[0], max: options.range[1]}}
        start={filter.range}
        step={10}
        connect
        pips={{mode: 'steps', density: 10}}
        onChange={(e) => updateLayerFilter(id, { range: e.map(a => Number(a)) })}
      /></div>
    } else if (options.values) {
      Editor = <CheckboxGroup
        values={options.values}
        selected={filter.values}
        layerId={id}
        updateLayerFilter={updateLayerFilter}
      />
    }

    return (
      <li className='layer-list__layer-wrapper'>
        <article className={c('layer', {'layer--expanded': editing})}>
          <header className='layer__header'>
            <span className='layer__legend-color' style={{background: type}}></span>
            <div className='layer__headline'>
              <h1 className='layer__title'>{name}</h1>
              <p className='layer__summary'>195 km2</p>
            </div>
            <div className='layer__actions'>
              <button type='button' onClick={this._handleEdit} className='button-edit-layer' title='Edit layer settings'><span>Edit</span></button>
              <label for='form-custom-switch-1a' className='form__option form__option--switch' title='Toggle layer on/off'>
                <input onChange={this._handleOnOff} type='checkbox' name='form-custom-checkbox' name='form-custom-switch-1a' id='form-custom-switch-1a' />
                <span className='form__option__text'>On/off</span>
                <span className='form__option__ui'></span>
              </label>
            </div>
          </header>
          <div className='layer__body'>
            <form className='form layer__controls'>
              {Editor}
              <div className='form__actions'>
                <button onClick={this._handleCancel} type='reset' className='button-cancel-edit' title='Close without saving changes'><span>Cancel</span></button>
                <button onClick={this._handleAccept} type='submit' className='button-save-edit' title='Save changes'><span>Save</span></button>
              </div>
            </form>
          </div>
        </article>
      </li>
    )
  },

  _handleOnOff: function () {
    this.props.toggleLayerVisibility(this.props.layer.id)
  },

  _handleEdit: function (e) {
    const { editing, id } = this.props.layer
    // TODO: should clicking edit again save or cancel?
    const { startEditing, cancelEdit } = this.props
    if (!editing) {
      startEditing(e, id)
    } else {
      cancelEdit(e, id)
    }
  },

  _handleCancel: function (e) {
    this.props.cancelEdit(e, this.props.layer.id)
  },

  _handleAccept: function (e) {
    this.props.saveEdit(e, this.props.layer.id)
  }
})

export default Indicator
