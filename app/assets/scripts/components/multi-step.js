import React from 'react'
import { connect } from 'react-redux'
import c from 'classnames'

import { updateStep, updateSelectedCountry } from '../actions'
import { includedCountries } from '../constants'
import { countries } from '../../data/countries'
import Country from './country'

export const MultiStep = React.createClass({

  propTypes: {
    selection: React.PropTypes.object,
    dispatch: React.PropTypes.func
  },

  render: function () {
    const { selection } = this.props
    switch (selection.step) {
      case 'country':
        return (
          <section className='multi-step'>
            <h1 className='multi-step__title'>Start</h1>
            <section className='step-view' id='multi-step-1'>
              <header className='step-view__header'>
                <div className='inner'>
                  <div className='step-view__headline'>
                    <h2 className='step-view__title'>Choose a Country</h2>
                  </div>
                  <div className='step-view__meta-actions'>
                    <button onClick={this._handleCancel} className={c('button-cancel-step', {disabled: !selection.country})} type='button'><span>Cancel</span></button>
                    <button onClick={this._handleNext} className={c('button-save-step', {disabled: !selection.country})} type='button'><span>Save</span></button>
                  </div>
                </div>
              </header>
              <div className='step-view__body'>
                <div className='inner'>
                  <div className='step-options'>
                    <ol className='options-list country-list' role='menu'>
                      {includedCountries.map(country => {
                        return <Country
                          key={country}
                          id={country}
                          info={countries[country]}
                          selected={country === selection.country}
                          updateSelectedCountry={this._updateSelectedCountry}
                        />
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )
      default:
        return <div className='empty-component'></div>
    }
  },

  _handleNext: function () {
    this.props.dispatch(updateStep('map'))
  },

  _handleCancel: function () {
    this.props.dispatch(updateStep('map'))
  },

  _updateSelectedCountry: function (e, country) {
    e.preventDefault()
    this.props.dispatch(updateSelectedCountry(country))
  }
})

/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(MultiStep)
