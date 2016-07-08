import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'
import Map from '../components/map'
import ControlPanel from '../components/control-panel'
import ResultsFold from '../components/results-fold'
import MultiStep from '../components/multi-step'
import Loading from '../components/loading'

const Explore = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <div className='page page--explore'>
        <Header />
        <main className='page__body' role='main'>
          <div className='inner'>
            <section className='layout'>
              <header className='layout__header'>
                <div className='inner'>
                  <div className='layout__headline'>
                    <h1 className='layout__title'>Explore the data</h1>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <div className='inner'>
                  <MultiStep />
                  <ControlPanel getMapReference={this._getMapReference} />
                  <Map onCanvasReady={this._updateMapReference} />
                  <ResultsFold />
                  <Loading />
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    )
  },

  _updateMapReference: function (map) {
    this._mapReference = map
  },

  _getMapReference: function () {
    return this._mapReference
  }
})

export default Explore
