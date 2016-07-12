import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

const About = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <div className='page page--article'>
        <Header />
        <main className='page__body' role='main'>
          <div className='inner'>
            <section className='layout'>
              <header className='layout__header'>
                <div className='inner'>
                  <div className='layout__headline'>
                    <h1 className='layout__title'>About</h1>
                    <div className='layout__introduction'>
                      <p>Learn more about the tool.</p>
                    </div>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <div className='inner'>
                  <div className='layout__prose-content prose prose--responsive'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dolor arcu, eleifend non egestas at, blandit eu enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer eget dolor viverra, fermentum dolor ac, pulvinar est. Vivamus vehicula, leo sed fringilla semper, sem odio dictum nibh, a faucibus augue mauris et mauris. Suspendisse sit amet pulvinar magna. Phasellus consectetur quam eu mi egestas ornare. Vivamus euismod ligula sem, et condimentum purus euismod quis. In hac habitasse platea dictumst.</p>
                    <p>Donec ac laoreet nisl, sed aliquet sem. Nullam et arcu consequat, ultrices purus sed, porttitor lectus. Maecenas vel nibh neque. Praesent auctor justo nulla, ac porta justo condimentum sed. Phasellus non sem maximus, molestie risus id, semper est. Duis arcu ante, consequat ut fermentum hendrerit, auctor quis ligula. Sed gravida nibh quis gravida vehicula. Nulla sit amet ex a enim pharetra vulputate non eu mi. Integer est tortor, pharetra quis nisi sed, semper hendrerit massa. Vivamus facilisis, mauris a cursus rutrum, enim nunc congue mi, a consectetur sem leo nec tellus. Fusce pharetra diam vitae venenatis accumsan. Nam viverra purus sem. Nunc quis odio nec diam mattis rutrum. Ut rhoncus venenatis nunc, eget malesuada lorem vulputate congue.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
})

export default About
