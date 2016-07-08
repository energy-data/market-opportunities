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
                    <h1 className='layout__title'>Welcome</h1>
                  </div>
                </div>
              </header>
              <div className='layout__body'>

                <section className='fold fold--dark fold--dark-alt fold--mosaic'>
                  <div className='fold__tile fold__tile--copy'>
                    <header className='fold__header'>
                      <h1 className='fold__title'>Discover Off-Grid Energy Opportunities</h1>
                    </header>
                    <div className='fold__body'>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in enim ut nunc iaculis gravida quis in ante. Ut eu turpis eget leo placerat consequat. Phasellus condimentum id neque nec viverra.</p>
                      <p><a href='explore' title='Visit Explore page' className='button button--large button--primary'><span>Start exploring</span></a></p>
                    </div>
                  </div>
                  <div className='fold__tile fold__tile--media'>
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
