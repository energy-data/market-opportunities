import React from 'react'
import Login from './login'
import c from 'classnames'

const Header = React.createClass({

  propTypes: {},

  getInitialState: function () {
    return {
      openItem: 'none'
    }
  },

  documentListener: function (e) {
    //
    // I'm working on this. Please be patient.
    //

    // console.log('target', e.target)
    // let loginBlock = this.refs.nav.querySelector('[data-hook="nav-block:login"]')
    // let menuBlock = this.refs.nav.querySelector('[data-hook="nav-block:menu"]')

    // let theSelf = e.target;

    // do {
    //   if (theSelf && theSelf === ) {
    //     break;
    //   }
    //   theSelf = theSelf.parentNode;
    // } while (theSelf && theSelf.tagName !== 'BODY' && theSelf.tagName !== 'HTML');

    // if (theSelf !== this.refs.dropdown) {
    //   this.close();
    // }
  },

  onLoginToggleClick: function (e) {
    e.preventDefault()
    this.setState({openItem: this.state.openItem === 'login' ? 'none' : 'login'})
  },

  onMenuToggleClick: function (e) {
    e.preventDefault()
    this.setState({openItem: this.state.openItem === 'menu' ? 'none' : 'menu'})
  },

  componentDidMount: function () {
    document.addEventListener('click', this.documentListener)
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this.documentListener)
  },

  render: function () {
    return (
      <header className='page__header' role='banner'>
        <div className='inner'>
          <div className='page__headline'>
            <a href='/' title='Visit page'>
              <h1 className='page__title'>Off-Grid Market Opportunities</h1>
              <p className='page__subtitle'>Powered by <strong>Energy Platform</strong></p>
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
                  <li><a href='#' title='Visit page' className='browse-menu-item'><span>Home</span></a></li>
                  <li><a href='#' title='Visit page' className='browse-menu-item browse-menu-item--active'><span>Explore</span></a></li>
                  <li><a href='#' title='Visit page' className='browse-menu-item'><span>About</span></a></li>
                  <li><a href='#' title='Visit page' className='browse-menu-item browse-menu-item--external'><span>Energy Platform</span></a></li>
                </ul>
              </div>
            </div>
            <Login
            isOpen={this.state.openItem === 'login'}
            onLoginToggle={this.onLoginToggleClick} />
          </nav>
        </div>
      </header>
    )
  }
})

export default Header
