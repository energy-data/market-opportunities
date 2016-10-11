import React from 'react'
import url from 'url'
import Nouislider from 'react-nouislider'
import c from 'classnames'
import chroma from 'chroma-js'

import config from '../config'
import { prettifyString, stopsToNoUiSliderRange, filterSummary, pipFormatter,
 getLayerColor } from '../utils'
import CheckboxGroup from './checkbox-group'
import RadioGroup from './radio-group'
import { popLayer } from '../constants'

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
    const { id, name, description, datasetID, editing, options, filter, visible, error } = this.props.layer
    const { updateLayerFilter } = this.props

    let Editor
    switch (options.value.type) {
      case 'range':
        Editor = <div className='form__group'>
          <div className={c('form__slider', 'range-type')}>
            <Nouislider
              range={stopsToNoUiSliderRange(options.value.stops)}
              start={filter.range}
              connect
              snap
              pips={{mode: 'steps', density: 10, format: pipFormatter(options.value.format)}}
              onChange={(e) => updateLayerFilter(id, { range: e.map(a => Number(a)) })}
            />
            <div className='legend'>
            {options.value.stops.slice(0, -1).map((stop, j) => {
              const baseColor = getLayerColor(name)
              return <div className='legend-swath' key={stop} style={{
                backgroundColor: chroma(baseColor).darken(j - Math.floor(options.value.stops.length / 2)).hex(),
                width: `${(100 / (options.value.stops.length - 1)).toFixed(2)}%`
              }}></div>
            })}
            </div>
          </div>
        </div>
        break
      case 'categorical':
        Editor = <CheckboxGroup
          values={options.value.values}
          selected={filter.values}
          layerId={id}
          updateLayerFilter={updateLayerFilter}
        />
        break
      case 'categorical-unique':
        Editor = <RadioGroup
          values={options.value.values}
          selected={filter.values}
          layerId={id}
          updateLayerFilter={updateLayerFilter}
        />
        break
      case 'buffer':
        Editor = <div className='form__group'><div className='form__slider'><Nouislider
          range={stopsToNoUiSliderRange(options.value.range)}
          start={[filter.value]}
          pips={{mode: 'steps', density: 10, format: pipFormatter(options.value.format)}}
          onChange={(e) => updateLayerFilter(id, { value: Number(e[0]) })}
        /></div></div>
    }

    let Error
    if (error) {
      Error = (
        <section className='layer-block layer-error'>
          <h2 className='layer-block__title'>{error}</h2>
        </section>
        )
    } else {
      Error = <div className='empty-component'></div>
    }

    return (
      <li className='layer-list__layer-wrapper'>
        <article className={c('layer', {'layer--expanded': editing})}>
          <header className='layer__header'>
            <span className='layer__legend-color' style={{background: getLayerColor(name)}}></span>
            <div className='layer__headline'>
              <h1 className='layer__title'>{prettifyString(name)}</h1>
              <p className='layer__summary'>{filterSummary(options, filter) + (id === popLayer.id ? '  ppl/km2' : '')}</p>
            </div>
            <div className='layer__actions'>
              <button type='button' onClick={this._handleEdit} className={c('button-edit-layer', { disabled: !visible || editing })} title='Edit layer settings'><span>Edit</span></button>
              <label htmlFor={`form-custom-switch-${id}`} className='form__option form__option--switch' title='Toggle layer on/off'>
                <input
                  onChange={this._handleOnOff}
                  checked={visible || editing}
                  type='checkbox'
                  name='form-custom-checkbox'
                  name={`form-custom-switch-${id}`}
                  id={`form-custom-switch-${id}`}
                />
                <span className='form__option__text'>On/off</span>
                <span className='form__option__ui'></span>
              </label>
            </div>
          </header>
          <div className='layer__body'>
            <section className='layer-block layer-controls'>
              <h2 className='layer-block__title'>Edit</h2>
              <form className='form'>
                {Editor}
                <div className='form__actions'>
                  <button onClick={this._handleCancel} type='reset' className='button-cancel-edit' title='Close without saving changes'><span>Cancel</span></button>
                  <button onClick={this._handleAccept} type='submit' className='button-save-edit' title='Save changes'><span>Save</span></button>
                </div>
              </form>
            </section>
            { Error }
            <section className='layer-block layer-info'>
              <h2 className='layer-block__title layer-info__title'>Info</h2>
              <p className='layer-info__details'>{description} - <a href={url.resolve(config.dataHubURL, '/dataset/' + datasetID)} title='Visit data source URL' className='url' target="_blank">view the source data</a></p>
            </section>
          </div>
        </article>
      </li>
    )
  },

  _handleOnOff: function () {
    const { layer } = this.props
    // while editing, this should be akin to cancel
    if (layer.editing) {
      this._handleCancel(null)
    // if we don't have a geojson yet and are turning on, start editing
    } else if (!layer.geojson && !layer.visibility) {
      this._handleEdit(null, layer.id)
    } else {
      this.props.toggleLayerVisibility(layer.id)
    }
  },

  _handleEdit: function (e) {
    const { id } = this.props.layer
    // NOTE: this is currently disabled when editing
    const { startEditing } = this.props
    startEditing(e, id)
  },

  _handleCancel: function (e) {
    this.props.cancelEdit(e, this.props.layer.id)
  },

  _handleAccept: function (e) {
    const { layer } = this.props
    this.props.saveEdit(e, layer.id)
    // ensure that saved layers are on
    if (!layer.visible) {
      this.props.toggleLayerVisibility(layer.id)
    }
  }
})

export default Indicator
