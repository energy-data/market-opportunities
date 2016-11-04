import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Header from '../components/header'
import Footer from '../components/footer'
import Map from '../components/map'
import ControlPanel from '../components/control-panel'
import SelectionPanel from '../components/selection-panel'
import CountrySelection from '../components/country-selection'
import Nocando from '../components/nocando'
import Loading from '../components/loading'

const Explore = React.createClass({

  propTypes: {
    selection: React.PropTypes.object
  },

  render: function () {
    let klass = classnames(
      'page',
      'page--explore',
      {'page--app': this.props.selection.step !== 'country'}
    )

    return (
      <div className={klass}>
        <Header />
        <main className='page__body' role='main'>
          <div className='inner'>
            <section className='layout'>
              <header className='layout__header'>
                <div className='inner'>
                  <div className='layout__headline'>
                    <h1 className='layout__title'>Choose a country</h1>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <div className='inner'>
                  <CountrySelection />
                  <ControlPanel />
                  <Map onCanvasReady={this._updateMapReference} />
                  <SelectionPanel getMapReference={this._getMapReference} />
                  <Loading />
                  <Nocando />
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

/* istanbul ignore next */
function mapStateToProps (state) {
  return {
    selection: state.selection
  }
}

export default connect(mapStateToProps)(Explore)
