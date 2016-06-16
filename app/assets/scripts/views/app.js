import React from 'react'

import Header from '../components/header'
import Map from '../components/map'
import ControlPanel from '../components/control-panel'
import ResultsFold from '../components/results-fold'
import MultiStep from '../components/multi-step'

const App = React.createClass({

  render: function () {
    return (
      <div className='full-app'>
        <Header />
        <main className='page__body' role='main'>
          <div className='inner'>
            <section className='layout' id='layout-explore'>
              <header className='layout__header'>
                <div className='inner'>
                  <div className='layout__headline'>
                    <h1 className='layout__title'>Explore the data</h1>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <div className='inner'>
                  <ControlPanel />
                  <Map />
                  <ResultsFold />
                  <MultiStep />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    )
  },

  propTypes: {}
})

export default App
