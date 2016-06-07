import React from 'react'

export const ResultsPanel = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <section className='panel' id='panel-results'>
        <header className='panel__header'>
          <div className='panel__headline'>
            <h1 className='panel__title'>Results</h1>
          </div>
        </header>
        <div className='panel__body'>
          <div className='panel__body-inner'>
            <p>This is the panel body.</p>
          </div>
        </div>
        <footer className='panel__footer'></footer>
      </section>
    )
  }
})

export default ResultsPanel
