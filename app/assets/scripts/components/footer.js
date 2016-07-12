import React from 'react'

const Footer = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <footer className='page__footer' role='contentinfo'>
        <div className='inner'>
          <div className='credits credits--internal'>
            <p className="attribution-wbg-ifc"><a href="http://www.ifc.org/" title="Visit page"><img alt="Logo" src="/assets/graphics/content/wbg-ifc-logo-black.svg" width="430" height="80" /> <span>An innovation by IFC - International Finance Corporation</span></a></p>
          </div>
          <div className='credits credits--external'>
            <p>Build by <a href='https://developmentseed.org' title='Visit Development Seed website'>Development Seed</a><br /> © 2016</p>
          </div>
        </div>
      </footer>
    )
  }
})

export default Footer
