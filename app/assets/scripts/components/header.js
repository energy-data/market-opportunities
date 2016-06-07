import React from 'react'

const Header = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <header className='page__header' role='banner'>
        <div className='inner'>
          <div className='page__headline'>
            <h1 className='page__title'><img src='/assets/graphics/layout/brand-symbol.svg' width='512' height='512' alt='Logo symbol' className='mast-logo__image' />DESCO Demand Tool</h1>
            <p className='page__subtitle'>Powered by <strong>Energy Data Platform</strong></p>
          </div>
          <nav className='page__prime-nav' role='navigation'>
            <h2 className='toggle-menu'><a href='#global-menu' title='Show/hide menu' data-hook='global-menu:trigger'><span>Browse</span></a></h2>
            <div className='menu-wrapper' data-hook='global-menu:wrapper'>
              <ul className='global-menu' id='global-menu'>
                <li><a href='#' title='Visit page' className='global-menu-item'><span>Home</span></a></li>
                <li><a href='#' title='Visit page' className='global-menu-item global-menu-item--active'><span>Explore</span></a></li>
                <li><a href='#' title='Visit page' className='global-menu-item'><span>About</span></a></li>
                <li><a href='#' title='Visit page' className='global-menu-item external'><span>Data Platform</span></a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    )
  }
})

export default Header
