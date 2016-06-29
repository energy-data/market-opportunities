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
                <div className='inner'>
                  <div className='step-view__headline'>
                    <h2 className='step-view__title'>Choose a Country</h2>
                    <p className='step-view__subtitle'>Step 1 of 2</p>
                  </div>
                  <div className='step-view__meta-actions'>
                    <button onClick={this._handleCancel} className={c('button-cancel-step', {disabled: !selection.country || !selection.scenario})} type='button'><span>Cancel</span></button>
                    <button onClick={this._handleNext} className={c('button-save-step', {disabled: !selection.country})} type='button'><span>Continue</span></button>
                  </div>
                </div>
              </header>
              <div className='step-view__body'>
                <div className='inner'>
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
                  <div className='options-control'>
                    <h3 className='options-control__title'><span>Or</span></h3>
                    <div className='options_control__drop'>
                      <select>
                        <option value='More countries'>More countries</option>
                        <option value='Angola'>Angola</option>
                        <option value='Benin'>Benin</option>
                        <option value='Botswana'>Botswana</option>
                        <option value='Burkina Faso'>Burkina Faso</option>
                        <option value='Burundi'>Burundi</option>
                        <option value='Cameroon'>Cameroon</option>
                        <option value='Cabo Verde'>Cabo Verde</option>
                        <option value='Central African Republic'>Central African Republic</option>
                        <option value='Chad'>Chad</option>
                        <option value='Comoros'>Comoros</option>
                        <option value='Cote dIvoire'>Cote d&#8217;Ivoire</option>
                        <option value='Eritrea'>Eritrea</option>
                        <option value='Gabon'>Gabon</option>
                        <option value='Gambia'>Gambia</option>
                        <option value='Ghana'>Ghana</option>
                        <option value='Guinea'>Guinea</option>
                        <option value='Guinea-Bissau'>Guinea-Bissau</option>
                        <option value='Kenya'>Kenya</option>
                        <option value='Lesotho'>Lesotho</option>
                        <option value='Liberia'>Liberia</option>
                        <option value='Madagascar'>Madagascar</option>
                        <option value='Malawi'>Malawi</option>
                        <option value='Mali'>Mali</option>
                        <option value='Mauritania'>Mauritania</option>
                        <option value='Mauritius'>Mauritius</option>
                        <option value='Mozambique'>Mozambique</option>
                        <option value='Namibia'>Namibia</option>
                        <option value='Niger'>Niger</option>
                        <option value='Rwanda'>Rwanda</option>
                        <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                        <option value='Senegal'>Senegal</option>
                        <option value='Seychelles'>Seychelles</option>
                        <option value='Sierra Leone'>Sierra Leone</option>
                        <option value='Somalia'>Somalia</option>
                        <option value='South Africa'>South Africa</option>
                        <option value='South Sudan'>South Sudan</option>
                        <option value='Sudan'>Sudan</option>
                        <option value='Swaziland'>Swaziland</option>
                        <option value='Togo'>Togo</option>
                        <option value='Uganda'>Uganda</option>
                        <option value='Zimbabwe'>Zimbabwe</option>
                        <option value='Equatorial Guinea'>Equatorial Guinea</option>
                        <option value='Ethiopia'>Ethiopia</option>
                        <option value='Congo, Republic'>Congo, Republic</option>
                        <option value='Congo, Republic Democratic'>Congo, Republic Democratic</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )
      case 'scenario':
        return (
          <section className='multi-step'>
            <h1 className='multi-step__title'>Start</h1>
            <section className='step-view' id='multi-step-2'>
              <header className='step-view__header'>
                <div className='inner'>
                  <div className='step-view__headline'>
                    <h2 className='step-view__title'>Choose a Scenario</h2>
                    <p className='step-view__subtitle'>Step 2 of 2</p>
                  </div>
                  <div className='step-view__meta-actions'>
                    <button onClick={this._handleCancel} className={c('button-cancel-step', {disabled: !selection.scenario})} type='button'><span>Cancel</span></button>
                    <button onClick={this._handleNext} className={c('button-save-step', {disabled: !selection.scenario})} type='button'><span>Save</span></button>
                  </div>
                </div>
              </header>
              <div className='step-view__body'>
                <div className='inner'>
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
              </div>
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
