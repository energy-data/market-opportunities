import React from 'react'
import { Link } from 'react-router'

import Header from '../components/header'
import Footer from '../components/footer'

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
                    <h1 className='layout__title'>Discover Off-Grid Energy Opportunities</h1>
                    <div className='layout__introduction'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in enim ut nunc iaculis gravida quis in ante. Ut eu turpis eget leo placerat consequat lorem ipsum.</p>
                      <p><Link to='/explore' title='Visit Explore page' className='button button--xlarge button--base'><span>Start exploring</span></Link></p>
                    </div>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <section className='fold fold--base fold--copy-right' id='showcase-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>Find Areas of Interest</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in enim ut nunc iaculis gravida quis in ante. Ut eu turpis eget leo placerat consequat. Phasellus condimentum id neque nec viverra.</p>
                        <ul className='features-list'>
                          <li>Feature lorem ipsum.</li>
                          <li>Feature dolor sit amet.</li>
                          <li>Feature iaculis gravida.</li>
                        </ul>
                      </div>
                    </div>
                    <div className='fold__media fold__media--desktop'>
                      <figure className='media-item'>
                        <div className='media-frame'>
                          <img src='/assets/graphics/content/tool-screenshot-ogmo.jpg' alt='Fold image' width='1920' height='960' />
                        </div>
                      </figure>
                    </div>
                  </div>
                </section>
                <section className='fold fold--copy-center' id='locations-fold'>
                  <div className='inner'>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>About the Data</h1>
                      </header>
                      <div className='fold__body prose prose--responsive'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in enim ut nunc iaculis gravida quis in ante. Ut eu turpis eget leo placerat consequat. Phasellus condimentum id neque nec viverra.</p>
                        <ul className='stats-list'>
                          <li><strong className='value'>20K</strong> <span className='term'>Lorem ipsum</span></li>
                          <li><strong className='value'>56</strong> <span className='term'>Countries</span></li>
                          <li><strong className='value'>327</strong> <span className='term'>Dolor sit</span></li>
                        </ul>
                        <p><Link to='/about' title='Visit About page' className='button button--large button--primary'><span>Learn more</span></Link></p>
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
