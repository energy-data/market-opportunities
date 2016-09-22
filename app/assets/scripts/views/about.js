import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

const About = React.createClass({

  propTypes: {},

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
                      <p>[...]</p>
                    </div>
                  </div>
                </div>
              </header>
              <div className='layout__body'>
                <div className='inner'>
                  <div className='layout__prose-content prose prose--responsive'>
                    <p>1.1. billion people still lack access to electricity across the world. Off-grid technologies and approaches are emerging as part of the solutions to serve the energy poor, but lack of data and information on the market potential remains a major constraint and impediment. As a result of these issues, IFC and the World Bank have developed this Off-Grid Market Opportunity Tool.</p>
                    <h2>How this tool can help</h2>
                    <ul>
                      <li>Private Sector - Narrow down potential areas of interest in new markets for off-grid companies</li>
                      <li>Government - Explore the potential role off-grid solutions could play in broader energy access strategies</li>
                      <li>Academia / Civil Society – Participate, contribute, inform global dialogue and local efforts on energy access</li>
                    </ul>
                    <hr />
                    <h2>How to use the tool</h2>
                    <ol>
                      <li>Select a country</li>
                      <li>Adjust data parameters based on specific business models and technologies</li>
                      <li>Switch base layers for enhanced visualization</li>
                      <li>Quickly estimate market potential based on market share and estimated revenue</li>
                      <li>Add your own complementary data to further refine results</li>
                    </ol>
                    <hr />
                    <h2 id='disclaimer'>Disclaimer</h2>
                    <p>This tool is not intended to provide an exhaustive or complete assessment of the off-grid market potential. Rather, it is intended for informational purposes only.</p>
                    <p>The tool relies primarily on open data, and additional data provided by users. As such, IFC does not guarantee the accuracy of the data but, rather, presents it in good faith. Any resulting interpretations, opinions and conclusions from the tool do not necessarily reflect the opinions of IFC or the World Bank Group, or the parties that they represent.</p>
                    <p>It is not recommended that any analyses resulting from the use of the tool serve as the sole basis of either commercial or policy decision-making. Rather, users are encouraged to consult relevant experts to further elaborate or confirm any initial observations resulting from the use of this tool.</p>
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
