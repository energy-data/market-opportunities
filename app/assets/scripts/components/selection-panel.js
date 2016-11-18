import React from 'react'
import { connect } from 'react-redux'
import area from 'turf-area'
import ScrollArea from 'react-scrollbar/dist/no-css'

import { populationApi } from '../constants'
import { postForm } from '../ajax'
import { countries } from '../../data/countries'
import { shortenNumber, numberWithCommas } from '../utils'
import { setMarketCaptureRate, setRevenuePerHousehold,
  setPopulation, startLoading, stopLoading } from '../actions'

import SelectionFooter from './selection-footer'

export const SelectionPanel = React.createClass({

  propTypes: {
    intersect: React.PropTypes.object,
    population: React.PropTypes.number,
    revenuePerHousehold: React.PropTypes.number,
    marketCapture: React.PropTypes.number,
    country: React.PropTypes.string,
    layers: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    getMapReference: React.PropTypes.func
  },

  render: function () {
    const { population, revenuePerHousehold, marketCapture, country, intersect,
      layers, getMapReference } = this.props
    if (intersect) {
      const hhCount = population === '-' ? '-' : population / countries[country].avg_hh_size
      return (
        <section className='panel panel--secondary' id='selection-panel'>
          <header className='panel__header'>
            <div className='panel__headline'>
              <h1 className='panel__title' data-tooltip='View metrics for the selected map area'>Selection</h1>
              <p className='panel__subtitle'>Total area: {numberWithCommas(Math.round(area(intersect) / 1000000))} Km2</p>
            </div>
          </header>
          <ScrollArea className='panel__body'>
            <section className='revenue-trigger'>
              <button className='button button--secondary' onClick={this._calculateIntersectedPopulation}>Calculate Population</button>
            </section>
            <dl className='selection-details'>
              <dt>Population</dt>
              <dd>{shortenNumber(population, 2)}</dd>
              <dt>Households</dt>
              <dd>{shortenNumber(hhCount, 2)}</dd>
              <dt>Potential Revenue</dt>
              <dd><strong>{shortenNumber(hhCount === '-' ? '-' : hhCount * revenuePerHousehold * marketCapture, 2)}</strong></dd>
            </dl>

            <section className='revenue-calculator'>
              <h2 className='revenue-calculator__title' data-tooltip='Adjust user inputs to update the potential revenue estimate'>Calculate</h2>
              <form className='form'>
                <div className='form__group'>
                  <label className='form__label' htmlFor='market-captured'>Market Captured</label>
                  <div className='form__input-group form__input-group--small'>
                    <input className='form__control form__control--small' type='number' value={Math.round(marketCapture * 100)} onChange={this._setMarketCaptureRate} name='market-captured' id='market-captured' />
                    <div className='form__addon'><span className='form__addon-label'>%</span></div>
                  </div>
                </div>
                <div className='form__group'>
                  <label className='form__label' htmlFor='household-revenue'>Household Revenue</label>
                  <div className='form__input-group form__input-group--small'>
                    <input className='form__control form__control--small' type='number' value={revenuePerHousehold} onChange={this._setRevenuePerHousehold} name='household-revenue' id='household-revenue' />
                    <div className='form__addon'><span className='form__addon-label'>$</span></div>
                  </div>
                </div>
              </form>
            </section>
          </ScrollArea>
          <SelectionFooter
            geojson={layers.intersect}
            getMapReference={getMapReference}
            population={population}
            revenuePerHousehold={revenuePerHousehold}
            marketCapture={marketCapture}
            country={country}
            layers={layers}
          />
        </section>
      )
    } else {
      return (
        <section className='panel panel--secondary' id='selection-panel'>
          <header className='panel__header'>
            <div className='panel__headline'>
              <h1 className='panel__title' data-tooltip='View metrics for the selected map area'>Selection</h1>
              <p className='panel__subtitle'>Total area: 0 Km2</p>
            </div>
          </header>
          <div className='panel__body'>
            <div className='panel__body-inner'>
              <p>Please add a layer to generate revenue estimates.</p>
            </div>
          </div>
          <footer className='panel__footer'>
            <button className='button-export disabled' title='Export options'>Export</button>
          </footer>
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
  },

  _calculateIntersectedPopulation: function () {
    this.props.dispatch(startLoading())
    postForm({
      url: populationApi,
      body: JSON.stringify(this.props.layers.intersect),
      headers: {
        'Content-Type': 'application/json'
      }
    }, (err, body) => {
      if (err) throw err
      this.props.dispatch(stopLoading())
      this.props.dispatch(setPopulation(body))
    })
  }
})

/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    intersect: state.layers.intersect,
    population: state.prize.population,
    revenuePerHousehold: state.prize.revenuePerHousehold,
    marketCapture: state.prize.marketCapture,
    country: state.selection.country,
    layers: state.layers
  }
}

export default connect(mapStateToProps)(SelectionPanel)
