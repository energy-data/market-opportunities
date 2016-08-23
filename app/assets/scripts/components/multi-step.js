import React from 'react'
import { connect } from 'react-redux'
import c from 'classnames'

import { updateStep, updateSelectedCountry } from '../actions'
import { highlightedCountries } from '../constants'
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
                      {highlightedCountries.map(country => {
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
                  <div className='options-control'>
                    <h3 className='options-control__title'><span>Or</span></h3>
                    <div className='options_control__drop'>
                      <select onChange={this._updateSelectedCountryFromDropdown}>
                        <option value=''>More countries</option>
                        <option value='AGO'>Angola</option>
                        <option value='BEN'>Benin</option>
                        <option value='BWA'>Botswana</option>
                        <option value='BFA'>Burkina Faso</option>
                        <option value='BDI'>Burundi</option>
                        <option value='CMR'>Cameroon</option>
                        <option value='CPV'>Cabo Verde</option>
                        <option value='CAF'>Central African Republic</option>
                        <option value='TCD'>Chad</option>
                        <option value='COM'>Comoros</option>
                        <option value='CIV'>Cote d&#8217;Ivoire</option>
                        <option value='ERI'>Eritrea</option>
                        <option value='GAB'>Gabon</option>
                        <option value='GMB'>Gambia</option>
                        <option value='GHA'>Ghana</option>
                        <option value='GIN'>Guinea</option>
                        <option value='GNB'>Guinea-Bissau</option>
                        <option value='KEN'>Kenya</option>
                        <option value='LSO'>Lesotho</option>
                        <option value='LBR'>Liberia</option>
                        <option value='MDG'>Madagascar</option>
                        <option value='MWI'>Malawi</option>
                        <option value='MLI'>Mali</option>
                        <option value='MRT'>Mauritania</option>
                        <option value='MUS'>Mauritius</option>
                        <option value='MOZ'>Mozambique</option>
                        <option value='NAM'>Namibia</option>
                        <option value='NER'>Niger</option>
                        <option value='RWA'>Rwanda</option>
                        <option value='STP'>Sao Tome and Principe</option>
                        <option value='SEN'>Senegal</option>
                        <option value='SYC'>Seychelles</option>
                        <option value='SLA'>Sierra Leone</option>
                        <option value='SOM'>Somalia</option>
                        <option value='ZAF'>South Africa</option>
                        <option value='SSD'>South Sudan</option>
                        <option value='SDN'>Sudan</option>
                        <option value='SWZ'>Swaziland</option>
                        <option value='TGO'>Togo</option>
                        <option value='UGA'>Uganda</option>
                        <option value='ZWE'>Zimbabwe</option>
                        <option value='GNQ'>Equatorial Guinea</option>
                        <option value='ETH'>Ethiopia</option>
                        <option value='COG'>Congo, Republic</option>
                        <option value='COD'>Congo, Republic Democratic</option>
                      </select>
                    </div>
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
  },

  _updateSelectedCountryFromDropdown: function (e) {
    this._updateSelectedCountry(e, e.target.value)
  }
})

/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(MultiStep)
