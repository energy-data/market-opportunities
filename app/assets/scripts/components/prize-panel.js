import React from 'react'
import { connect } from 'react-redux'

import { countries } from '../../data/countries'
import { shortenNumber } from '../utils'
import { setMarketCaptureRate, setRevenuePerHousehold } from '../actions'

export const PrizePanel = React.createClass({

  propTypes: {
    displayAll: React.PropTypes.bool,
    population: React.PropTypes.number,
    revenuePerHousehold: React.PropTypes.number,
    marketCapture: React.PropTypes.number,
    country: React.PropTypes.string,
    dispatch: React.PropTypes.func
  },

  render: function () {
    const { population, revenuePerHousehold, marketCapture, country } = this.props
    if (this.props.displayAll) {
      return (
        <section className='panel' id='prize-panel'>
          <header className='panel__header'>
            <div className='panel__headline'>
              <h1 className='panel__title' data-tooltip='Tier explanation'>Size of the Prize</h1>
            </div>
          </header>
          <div className='panel__body'>
            <div className='panel__body-inner'>
              {shortenNumber(population)}
              <br /><input type='number' value={revenuePerHousehold} onChange={this._setRevenuePerHousehold} />
              <br /><input type='number' value={marketCapture * 100} onChange={this._setMarketCaptureRate} />%
              <br />{shortenNumber(population / countries[country].avg_hh_size * revenuePerHousehold * marketCapture)}
            </div>
          </div>
          <footer className='panel__footer'></footer>
        </section>
      )
    } else {
      return (
        <section className='panel' id='prize-panel'>
          <header className='panel__header'>
            <div className='panel__headline'>
              <h1 className='panel__title' data-tooltip='Tier explanation'>Size of the Prize</h1>
            </div>
          </header>
          <div className='panel__body'>
            <div className='panel__body-inner'>
              Please add at least 2 layers to generate revenue estimates
            </div>
          </div>
          <footer className='panel__footer'></footer>
        </section>
      )
    }
  },

  _setMarketCaptureRate: function (e) {
    this.props.dispatch(setMarketCaptureRate(Number(e.target.value / 100)))
  },

  _setRevenuePerHousehold: function (e) {
    this.props.dispatch(setRevenuePerHousehold(Number(e.target.value)))
  }
})

/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    displayAll: state.layers.indicators
     .filter(layer => layer.visible && !layer.editing && layer.geojson)
     .length >= 2,
    population: state.prize.population,
    revenuePerHousehold: state.prize.revenuePerHousehold,
    marketCapture: state.prize.marketCapture,
    country: state.selection.country
  }
}

export default connect(mapStateToProps)(PrizePanel)
