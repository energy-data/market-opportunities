import React from 'react'
import c from 'classnames'
import Nouislider from 'react-nouislider'

import { toggleArrayElement } from '../utils'

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
      Editor = <div className='checkbox-wrapper'>
      {options.values.map(value => {
        return <label key={value} for={value}>
          {value}
          <input
            type='checkbox'
            id={value}
            checked={filter.values.indexOf(value) > -1}
            onChange={(e) => updateLayerFilter(id, { values: toggleArrayElement(filter.values, e.target.id) })}
            />
        </label>
      })}
      </div>
    }

    return (
      <li className={c('indicator', type)}>
        <div className='indicator-main' style={{borderLeft: `2px solid ${type}`}}>
          <h3>{name}</h3>
          <h5>Subtitle</h5>
          <button onClick={this._handleOnOff} className='button on-off'>on/off</button>
          <button onClick={this._handleEdit} className='button edit'>edit</button>
        </div>
        <div style={{display: (editing ? 'block' : 'none')}}>
          <div className='indicator-editing'>
            <h3>Edit</h3>
            <button onClick={this._handleCancel} className='button collecticon-xmark cancel'></button>
            <button onClick={this._handleAccept} className='button collecticon-tick accept'></button>
          </div>
          {Editor}
        </div>
      </li>
    )
  },

  _handleOnOff: function (e) {
    this.props.toggleLayerVisibility(e, this.props.layer.id)
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
