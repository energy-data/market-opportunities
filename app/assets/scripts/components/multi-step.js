import React from 'react'
import { connect } from 'react-redux'
import c from 'classnames'

import { updateStep, updateSelectedCountry, updateSelectedScenario } from '../actions'
import { countries, scenarios } from '../constants'
import Country from './country'
import Scenario from './scenario'

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
                <h2 className='step-view__title'>Choose a Country</h2>
                <p className='step-view__subtitle'>Step 1 of 2</p>
              </header>
              <div className='step-view__body'>
                <div className='step-options'>
                  <ol className='options-list country-list' role='menu'>
                    {countries.map(country => {
                      return <Country
                        key={country.name}
                        info={country}
                        selected={country.name === selection.country}
                        updateSelectedCountry={this._updateSelectedCountry}
                      />
                    })}
                  </ol>
                </div>
              </div>
              <footer className='step-view__footer'>
                <button onClick={this._handleCancel} className={c('button-cancel-step', {disabled: !selection.country || !selection.scenario})} type='button'><span>Cancel</span></button>
                <button onClick={this._handleNext} className={c('button-save-step', {disabled: !selection.country})} type='button'><span>Continue</span></button>
              </footer>
            </section>
          </section>
        )
      case 'scenario':
        return (
          <section className='multi-step'>
            <h1 className='multi-step__title'>Start</h1>
            <section className='step-view' id='multi-step-2'>
              <header className='step-view__header'>
                <h2 className='step-view__title'>Choose a Scenario</h2>
                <p className='step-view__subtitle'>Step 2 of 2</p>
              </header>
              <div className='step-view__body'>
                <div className='step-options'>
                  <ol className='options-list scenario-list' role='menu'>
                  {scenarios.map(scenario => {
                    return <Scenario
                      key={scenario.title}
                      info={scenario}
                      selected={scenario.title === selection.scenario}
                      updateSelectedScenario={this._updateSelectedScenario}
                    />
                  })}
                  </ol>
                </div>
              </div>
              <footer className='step-view__footer'>
                <button onClick={this._handleCancel} className={c('button-cancel-step', {disabled: !selection.scenario})} type='button'><span>Cancel</span></button>
                <button onClick={this._handleNext} className={c('button-save-step', {disabled: !selection.scenario})} type='button'><span>Save</span></button>
              </footer>
            </section>
          </section>
        )
      default:
        return <div className='empty-component'></div>
    }
  },

  _handleNext: function () {
    switch (this.props.selection.step) {
      case 'country':
        this.props.dispatch(updateStep('scenario'))
        break
      case 'scenario':
        this.props.dispatch(updateStep('map'))
        break
    }
  },

  _handleCancel: function () {
    this.props.dispatch(updateStep('map'))
  },

  _updateSelectedCountry: function (country) {
    this.props.dispatch(updateSelectedCountry(country))
  },

  _updateSelectedScenario: function (scenario) {
    this.props.dispatch(updateSelectedScenario(scenario))
  }
})

/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(MultiStep)
