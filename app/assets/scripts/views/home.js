import React from 'react'
import { Link } from 'react-router'

import Header from '../components/header'
import Footer from '../components/footer'
import config from '../config'

const Home = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <div className='page page--home'>
        <Header />
        <main className='page__body' role='main'>
          <div className='inner'>
            <section className='layout'>
              <header className='layout__header'>
                <div className='inner'>
                  <div className='layout__headline'>
                    <h1 className='layout__title'>Discover Off-Grid Energy Market Opportunities</h1>
                    <div className='layout__introduction'>
                      <p>[INSERT ONE SENTENCE TEASER]</p>
                      <p><Link to='/explore' title='Visit Explore page' className='cta-button-explore'><span>Start exploring</span></Link></p>
                    </div>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <section className='fold fold--copy-left' id='why-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>Why this tool</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>1.1. billion people around the world still lack access to electricity. Off-grid technologies and approaches are emerging as part of the solution to close the energy access gap, but lack of information on the nature of the market remains a major constraint to serving the energy poor. IFC and the World Bank have developed this Off-Grid Market Opportunity Tool with a view to helping to address this issue.</p>
                        <p><Link to='/about' title='Visit About page' className='cta-button-learn'><span>About the tool</span></Link></p>
                      </div>
                    </div>
                    <div className='fold__media'>
                      <figure className='media-content'>
                        <div className='media-item media-item--browser'>
                          <img src={`${config.basePath}assets/graphics/content/tool-screenshot.png`} alt='Fold image' width='2512' height='1396' />
                        </div>
                      </figure>
                    </div>
                  </div>
                </section>
                <section className='fold fold--primary fold--copy-center' id='what-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>What this tool offers</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <ul className='highlight-list'>
                          <li className='highlight-list__item-wrapper'>
                            <div className='highlight-list__item h-view'>Quickly generate a high-level view of the off-grid market opportunity.</div>
                          </li>
                          <li className='highlight-list__item-wrapper'>
                            <div className='highlight-list__item h-access'>Access underlying open data from energydata.info and leverage the tool with your own data.</div>
                          </li>
                          <li className='highlight-list__item-wrapper'>
                            <div className='highlight-list__item h-contribute'>This tool is developed in the open. Contribute to the tool or data on <Link to='http://github.com/energy-data/market-opportunities'>Github</Link>.</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                <section className='fold fold--copy-center' id='about-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>About the Data</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>The tool is powered using best available and mainly open data. There are various levels of accuracy, depending on the source.</p>
                        <p><Link to='/about#disclaimer' title='Visit About page' className='cta-button-learn'><span>Data disclaimer</span></Link></p>
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

export default Home
