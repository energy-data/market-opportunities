import React from 'react'
import { connect } from 'react-redux'

import { shortenNumber } from '../utils'
import { setTier1Price, setTier2Price } from '../actions'

export const PrizePanel = React.createClass({

  propTypes: {
    displayAll: React.PropTypes.bool,
    tier1pop: React.PropTypes.number,
    tier2pop: React.PropTypes.number,
    tier1price: React.PropTypes.number,
    tier2price: React.PropTypes.number,
    dispatch: React.PropTypes.func
  },

  render: function () {
    if (this.props.displayAll) {
      const tier1pop = (this.props.tier1pop)
      ? this.props.tier1pop
      : 0

      const tier2pop = (this.props.tier2pop)
      ? this.props.tier2pop
      : 0

      const tier1rev = (this.props.tier1pop)
      ? this.props.tier1price * tier1pop
      : 0

      const tier2rev = (this.props.tier2pop)
      ? this.props.tier2price * tier2pop
      : 0

      return (
        <section className='panel' id='prize-panel'>
          <header className='panel__header'>
            <div className='panel__headline'>
              <h1 className='panel__title' data-tooltip='Tier explanation'>Size of the Prize</h1>
            </div>
          </header>
          <div className='panel__body'>
            <div className='panel__body-inner'>
              <div className='table-wrapper'>
                <table className='table' id='prize-table'>
                  <thead>
                    <tr>
                      <th className='tier-term'><span>Tier</span></th>
                      <th className='pop-term'>Pop.</th>
                      <th className='revenue-term'>Revenue</th>
                      <th className='result-term'><span>Result</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className='tier-value' scope='row'>Tier 1</th>
                      <td className='pop-value'>{shortenNumber(tier1pop)}</td>
                      <td className='revenue-value'>
                        <div className='form__group'>
                          <input onChange={this._updateTier1Price} className='form__control form__control--small' type='number' id='fa-party-number-1' name='party-qt' min='1' max='99' value={this.props.tier1price} />
                        </div>
                      </td>
                      <td className='result-value'>{`$${shortenNumber(tier1rev)}`}</td>
                    </tr>
                    <tr>
                      <th className='tier-value' scope='row'>Tier 2</th>
                      <td className='pop-value'>{shortenNumber(tier2pop)}</td>
                      <td className='revenue-value'>
                        <div className='form__group'>
                          <input onChange={this._updateTier2Price} className='form__control form__control--small' type='number' id='fa-party-number-2' name='party-qt' min='1' max='99' value={this.props.tier2price} />
                        </div>
                      </td>
                      <td className='result-value'>{`$${shortenNumber(tier2rev)}`}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className='foot-term' scope='row' colSpan='3'>Size of the Prize</th>
                      <td className='foot-value'>{`$${shortenNumber(tier1rev + tier2rev)}`}</td>
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

  _updateTier1Price: function (e) {
    this.props.dispatch(setTier1Price(Number(e.target.value)))
  },

  _updateTier2Price: function (e) {
    this.props.dispatch(setTier2Price(Number(e.target.value)))
  }
})

/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    displayAll: state.layers.indicators
     .filter(layer => layer.visible && !layer.editing && layer.geojson)
     .length >= 2,
    tier1pop: state.prize.tier1pop,
    tier2pop: state.prize.tier2pop,
    tier1price: state.prize.tier1price,
    tier2price: state.prize.tier2price
  }
}

export default connect(mapStateToProps)(PrizePanel)
