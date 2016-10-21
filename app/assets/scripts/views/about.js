import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/header'
import Footer from '../components/footer'

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
      <div className='page page--article page--about'>
        <Header />
        <main className='page__body' role='main'>
          <div className='inner'>
            <section className='layout'>
              <header className='layout__header'>
                <div className='inner'>
                  <div className='layout__headline'>
                    <h1 className='layout__title'>About</h1>
                    <div className='layout__introduction'>
                      <p>The Offgrid Market Opportunity Tool has been developed by the IFC.</p>
                    </div>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <div className='inner'>
                  <div className='layout__prose-content prose prose--responsive'>
                    <h2>IFC</h2>
                    <p>The International Finance Corporation, a member of the World Bank Group, is the largest global development institution focused exclusively on the private sector in developing countries.</p>
                    <p>IFC utilizes and leverages dedicated products and services—as well as products and services of other institutions in the World Bank Group—to provide development solutions customized to meet clients’ needs. IFC applies its financial resources, technical expertise, global experience, and innovative thinking to help partners overcome financial, operational, and political challenges.</p>
                    <h2>Disclaimer</h2>
                    <p>This tool is not intended to provide an exhaustive assessment of the off-grid market potential. Rather, it is intended for informational purposes only.</p>
                    <p>The tool relies primarily on open data, and additional data provided by users. As such, IFC does not guarantee the accuracy of the data but, rather, presents it in good faith. Any resulting interpretations, opinions and conclusions from the tool do not necessarily reflect the opinions of IFC or the World Bank Group, or the parties that they represent.</p>
                    <p>It is not recommended that any analyses resulting from the use of the tool serve as the sole basis for either commercial or policy decision-making. Rather, users are encouraged to consult relevant experts to further elaborate or confirm any initial observations resulting from the use of this tool.</p>
                    <h2>Contact</h2>
                    <p>For questions and comments about this tool, please contact <a href="mailto:energydata@worldbankgroup.org">our team</a>.</p>
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

function mapStateToProps (state) {
  return {
    hash: state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.hash
  }
}

export default connect(mapStateToProps)(About)
