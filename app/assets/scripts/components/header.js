import React from 'react'
import Login from './login'
import c from 'classnames'
import { Link, IndexLink } from 'react-router'

const Header = React.createClass({

  propTypes: {},

  getInitialState: function () {
    return {
      openItem: 'none'
    }
  },

  documentListener: function (e) {
    if (e.preventClose !== true && this.state.openItem !== 'none') {
      this.setState({openItem: 'none'})
    }
  },

  onNavBlockClick: function (e) {
    // When clicking a nav block, add a property to the event indicating that
    // the block shouldn't be toggled on body click.
    e.preventClose = true
  },

  onLoginToggleClick: function (e) {
    e.preventDefault()
    // Access native event so it propagates upward.
    e.nativeEvent.preventClose = true
    this.setState({openItem: this.state.openItem === 'login' ? 'none' : 'login'})
  },

  onMenuToggleClick: function (e) {
    e.preventDefault()
    // Access native event so it propagates upward.
    e.nativeEvent.preventClose = true
    this.setState({openItem: this.state.openItem === 'menu' ? 'none' : 'menu'})
  },

  componentDidMount: function () {
    document.addEventListener('click', this.documentListener)
    this.refs.nav.querySelector('[data-hook="nav-block:menu"]').addEventListener('click', this.onNavBlockClick)
    this.refs.nav.querySelector('[data-hook="nav-block:login"]').addEventListener('click', this.onNavBlockClick)
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this.documentListener)
    this.refs.nav.querySelector('[data-hook="nav-block:menu"]').removeEventListener('click', this.onNavBlockClick)
    this.refs.nav.querySelector('[data-hook="nav-block:login"]').removeEventListener('click', this.onNavBlockClick)
  },

  render: function () {
    return (
      <header className='page__header' role='banner'>
        <div className='inner'>
          <div className='page__headline'>
            <a href='/' title='Visit page'>
              <h1 className='page__title'>
                Off-Grid Market Opportunities
                <small className='site-beta-tag'>beta</small>
              </h1>
              <p className='page__subtitle'>Powered by <strong>energydata.info</strong></p>
            </a>
          </div>
          <nav className='page__prime-nav' role='navigation' ref='nav'>
            <h1 className='page__prime-nav-title'>Navigation</h1>
            <div className={c('nav-block nav-block--browse', {'nav-block--active': this.state.openItem === 'menu'})}>
              <h2 className='nav-block__title'>
                <a href='#browse-contents' title='Toggle menu' onClick={this.onMenuToggleClick}>
                  <span className='text'>Browse</span>
                </a>
              </h2>
              <div className='nav-block__menu-wrapper' id='browse-contents' data-hook='nav-block:menu'>
                <ul className='nav-block__menu browse-menu'>
                  <li><IndexLink to='/' title='Visit page' className='browse-menu-item' activeClassName='browse-menu-item--active'><span>Home</span></IndexLink></li>
                  <li><Link to='/explore' title='Visit page' className='browse-menu-item' activeClassName='browse-menu-item--active'><span>Explore</span></Link></li>
                  <li><Link to='/about' title='Visit page' className='browse-menu-item' activeClassName='browse-menu-item--active'><span>About</span></Link></li>
                  <li><a href='#' title='Visit page' className='browse-menu-item browse-menu-item--external'><span>energydata.info</span></a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    )
  }
})

export default Header
