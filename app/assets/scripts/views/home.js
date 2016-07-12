import React from 'react'

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
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in enim ut nunc iaculis gravida quis in ante. Ut eu turpis eget leo placerat consequat.</p>
                      <p><a href='/#/explore' title='Visit Explore page' className='button button--large button--base'><span>Start exploring</span></a></p>
                    </div>
                  </div>
                </div>
              </header>
              <div className='layout__body'>

                <section className='fold fold--dark' id='showcase-fold'>
                  <div className='inner'>
                    <div className='fold__media'>
                      <div className='media-container'>
                        <img src="http://placehold.it/1440x960" />
                      </div>
                    </div>
                    <div className='fold__copy'>
                      <header className='fold__header'>
                        <h1 className='fold__title'>Find areas of interest from anywhere</h1>
                      </header>
                      <div className='fold__body'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in enim ut nunc iaculis gravida quis in ante. Ut eu turpis eget leo placerat consequat. Phasellus condimentum id neque nec viverra.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className='fold fold--center' id='locations-fold'>
                  <div className='inner'>
                    <header className='fold__header'>
                      <h1 className='fold__title'>Current locations</h1>
                    </header>
                    <div className='fold__body'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in enim ut nunc iaculis gravida quis in ante. Ut eu turpis eget leo placerat consequat. Phasellus condimentum id neque nec viverra.</p>
                      <p><a href='/#/explore' title='Visit Explore page' className='button button--large button--primary'><span>Start exploring</span></a></p>
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
