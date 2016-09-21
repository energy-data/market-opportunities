import React from 'react'
import config from '../config'

const Footer = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <footer className='page__footer' role='contentinfo'>
        <div className='inner'>
          <div className='credits credits--internal'>
            <p className='attribution-wbg-ifc'><a href='http://www.ifc.org/' title='Visit page'><img alt='Logo' src={`${config.basePath}assets/graphics/content/wbg-ifc-logo-black.svg`} width='430' height='80' /> <span>An innovation by IFC - International Finance Corporation</span></a></p>
          </div>
          <div className='credits github-link'>
            <a href='http://github.com/energy-data/market-opportunities' target='_blank'>
              <span className='collecticon-github'></span>
            </a>
          </div>
          <div className='credits credits--external'>
            <p>Built by <a href='https://developmentseed.org' title='Visit Development Seed website'>Development Seed</a><br /> © 2016</p>
          </div>
        </div>
      </footer>
    )
  }
})

export default Footer
