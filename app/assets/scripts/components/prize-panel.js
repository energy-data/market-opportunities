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
      const hhCount = population / countries[country].avg_hh_size
      return (
        <section className='panel' id='prize-panel'>
          <header className='panel__header'>
            <div className='panel__headline'>
              <h1 className='panel__title'>Size of the Prize</h1>
            </div>
          </header>
          <div className='panel__body'>
            <div className='panel__body-inner'>

              <div className='table-wrapper'>
                <table className='table' id='prize-table'>
                  <thead>
                    <tr>
                      <th className='head-term' scope='row'>Population <small>Households</small></th>
                      <td className='head-value'>{shortenNumber(population)} <small>{shortenNumber(hhCount)}</small></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className='body-term' scope='row'>Market captured</th>
                      <td className='body-value'>
                        <div className='form__group'>
                          <div className='form__input-group form__input-group--small'>
                            <input className='form__control form__control--small' type='number' value={Math.round(marketCapture * 100)} onChange={this._setMarketCaptureRate} />
                            <div className='form__addon'><span className='form__addon-label'>%</span></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className='body-term' scope='row'>Avg. revenue per HH</th>
                      <td className='body-value'>
                        <div className='form__group'>
                          <div className='form__input-group form__input-group--small'>
                            <input className='form__control form__control--small' type='number' value={revenuePerHousehold} onChange={this._setRevenuePerHousehold} />
                            <div className='form__addon'><span className='form__addon-label'>$</span></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className='foot-term' scope='row'>Size of the Prize</th>
                      <td className='foot-value'>{shortenNumber(hhCount * revenuePerHousehold * marketCapture)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
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
              <h1 className='panel__title'>Size of the Prize</h1>
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
    const value = Math.min(Math.max(e.target.value, 0), 100)
    this.props.dispatch(setMarketCaptureRate(Number(value / 100)))
  },

  _setRevenuePerHousehold: function (e) {
    const value = Math.max(Number(e.target.value), 0)
    this.props.dispatch(setRevenuePerHousehold(value))
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
