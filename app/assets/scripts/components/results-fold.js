import React from 'react'

export const ResultsFold = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <section className='fold' id='results-fold'>
        <header className='fold__header'>
          <div className='fold__headline'>
            <h1 className='fold__title'>Results</h1>
          </div>
        </header>
        <div className='fold__body'>
          <div className='fold__body-inner'>
            <dl className='results-details'>
              <dt>Population Density</dt>
              <dd>195 km2</dd>
              <dt>Mobile Penetration</dt>
              <dd>> 60%</dd>
              <dt>Malesuada porta</dt>
              <dd>Etiam porta</dd>
              <dt>Yet another term</dt>
              <dd>Fusce dapibus</dd>
            </dl>
          </div>
        </div>
      </section>
    )
  }
})

export default ResultsFold
