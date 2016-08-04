import React from 'react'

export const PrizePanel = React.createClass({

  propTypes: {},

  render: function () {
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
                <tfoot>
                  <tr>
                    <th className='foot-term' scope='row' colSpan='3'>Size of the Prize</th>
                    <td className='foot-value'>$3,3M</td>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <th className='tier-value' scope='row'>Tier 1</th>
                    <td className='pop-value'>100,000</td>
                    <td className='revenue-value'>
                      <div className='form__group'>
                        <input className='form__control form__control--small' type='number' id='fa-party-number' name='party-qt' min='1' max='99' value='8' />
                      </div>
                    </td>
                    <td className='result-value'>800,000</td>
                  </tr>
                  <tr>
                    <th className='tier-value' scope='row'>Tier 2</th>
                    <td className='pop-value'>250,000</td>
                    <td className='revenue-value'>
                      <div className='form__group'>
                        <input className='form__control form__control--small' type='number' id='fa-party-number' name='party-qt' min='1' max='99' value='10' />
                      </div>
                    </td>
                    <td className='result-value'>2500,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className='panel__footer'></footer>
      </section>
    )
  }
})

export default PrizePanel
