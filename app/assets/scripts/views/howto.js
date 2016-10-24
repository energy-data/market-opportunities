import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


import Header from '../components/header'
import Footer from '../components/footer'
import config from '../config'

const About = React.createClass({

  propTypes: {
    hash: React.PropTypes.string
  },

  componentDidMount: function () {
    if (this.props.hash) {
      setTimeout(() => {
        window.scrollTo(0, document.querySelector(this.props.hash).getBoundingClientRect().top)
      }, 20)
    }
  },

  render: function () {
    return (
      <div className='page page--article page--howto'>
        <Header />
        <main className='page__body' role='main'>
          <div className='inner'>
            <section className='layout'>
              <header className='layout__header'>
                <div className='inner'>
                  <div className='layout__headline'>
                    <h1 className='layout__title'>How to use the tool</h1>
                    <div className='layout__introduction'>
                      <p>Learn more about how to use the Offgrid Market Opportunity Tool</p>
                    </div>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <section className='fold fold--copy-left fold--copy-vmiddle' id='how1-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>1. Select a country</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>Go to the <Link to='/explore' title='Visit Explore page'>explore page</Link> and find the country of your choice. After selecting the country, click Save to continue.</p>
                      </div>
                    </div>
                    <div className='fold__media'>
                      <figure className='media-content'>
                        <div className='media-item media-item--browser'>
                          <img src={`${config.basePath}assets/graphics/content/how1-country.png`} alt='Fold image' />
                        </div>
                      </figure>
                    </div>
                  </div>
                </section>
                <section className='fold fold--copy-right fold--copy-vmiddle' id='how2-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>2. Add indicators</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>Find market opportunities that are tailored towards your specific business model and technologies. Search for the indicators that matter to you and <strong>hit Save</strong> to add them to the map.</p>
                      </div>
                    </div>
                    <div className='fold__media'>
                      <figure className='media-content'>
                        <div className='media-item media-item--browser'>
                          <img src={`${config.basePath}assets/graphics/content/how2-indicator.png`} alt='Fold image' />
                        </div>
                      </figure>
                    </div>
                  </div>
                </section>
                <section className='fold fold--copy-left fold--copy-vmiddle' id='how3-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>3. Estimate market potential</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>Based on your indicators, the tool will estimate the number of households in your selected area. This allows you to quickly estimate market potential based on market share and estimated revenue.</p>
                        <p>Both <i>Market Captured</i> and <i>Household Revenue</i> can be customized to adjust the potential.</p>
                      </div>
                    </div>
                    <div className='fold__media'>
                      <figure className='media-content'>
                        <div className='media-item media-item--browser'>
                          <img src={`${config.basePath}assets/graphics/content/how3-potential.png`} alt='Fold image' />
                        </div>
                      </figure>
                    </div>
                  </div>
                </section>
                <section className='fold fold--copy-right fold--copy-vmiddle' id='how4-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>4. Export your results</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>Export the result to PDF to share it with other people, or in GeoJSON format to further analyze it in your favorite geospatial tool.</p>
                      </div>
                    </div>
                    <div className='fold__media'>
                      <figure className='media-content'>
                        <div className='media-item media-item--browser'>
                          <img src={`${config.basePath}assets/graphics/content/how4-export.png`} alt='Fold image' />
                        </div>
                      </figure>
                    </div>
                  </div>
                </section>
                <section className='fold fold--primary fold--copy-center'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>How to add data</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>If you have a data source that would make a good addition to the tool, please get in touch with <a href="mailto:energydata@worldbankgroup.org">our team</a>. All of the source data is hosted on the <a href="https://energydata.info/organization/offgrid-market-opportunities" target="_blank">Energy Data platform</a>.</p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className='fold fold--copy-center'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>How to contribute code</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>The codebase of this tool is publicly available through our <a href="http://github.com/energy-data/market-opportunities">Github account</a>. Feel free to open issues or propose changes to our codebase by issueing a Pull Request.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    hash: state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.hash
  }
}

export default connect(mapStateToProps)(About)
