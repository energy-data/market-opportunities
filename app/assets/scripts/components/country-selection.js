import React from 'react'
import { connect } from 'react-redux'

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
          <section className='country-selection'>
            <h1 className='country-selection__title'>Country Selection</h1>
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
          </section>
        )
      default:
        return <div className='empty-component'></div>
    }
  },

  _updateSelectedCountry: function (e, country) {
    e.preventDefault()
    this.props.dispatch(updateSelectedCountry(country))
    this.props.dispatch(updateStep('map'))
  }
})

/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(MultiStep)
