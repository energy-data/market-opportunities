import React from 'react'
import Login from './login'

const Header = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <header className='page__header' role='banner'>
        <div className='inner'>
          <div className='page__headline'>
            <h1 className='page__title'><img src='/assets/graphics/layout/brand-symbol.svg' width='512' height='512' alt='Logo symbol' className='mast-logo__image' />Off-Grid Market Opportunities</h1>
            <p className='page__subtitle'>Powered by <strong>Energy Platform</strong></p>
          </div>
          <nav className='page__prime-nav' role='navigation'>
            <h1 className='page__prime-nav-title'>Navigation</h1>
            <div className='nav-block nav-block--browse'>
              <h2 className='nav-block__title'>
                <a href='#browse-contents' title='Toggle menu'>
                  <span className='text'>Browse</span>
                </a>
              </h2>
              <div className='nav-block__menu-wrapper' id='browse-contents'>
                <ul className='nav-block__menu browse-menu'>
                  <li><a href='#' title='Visit page' className='browse-menu-item'><span>Home</span></a></li>
                  <li><a href='#' title='Visit page' className='browse-menu-item browse-menu-item--active'><span>Explore</span></a></li>
                  <li><a href='#' title='Visit page' className='browse-menu-item'><span>About</span></a></li>
                  <li><a href='#' title='Visit page' className='browse-menu-item browse-menu-item--external'><span>Energy Platform</span></a></li>
                </ul>
              </div>
            </div>
            <Login />
          </nav>
        </div>
      </header>
    )
  }
})

export default Header
