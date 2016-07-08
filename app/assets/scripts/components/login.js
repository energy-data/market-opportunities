import React from 'react'
import { connect } from 'react-redux'
import c from 'classnames'
import url from 'url'

import login from '../login'
import { logout } from '../actions'
import { dataHubURL } from '../config'

export const Login = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    onLoginToggle: React.PropTypes.func,
    isOpen: React.PropTypes.bool,
    dispatch: React.PropTypes.func
  },

  _handleKeypress: function (e) {
    if (e.which === 13) {
      this._login()
    }
  },

  _handleSubmitClick: function (e) {
    e.preventDefault()
    this._login()
  },

  _login: function () {
    this.props.dispatch(login(this.refs.username.value, this.refs.password.value))
  },

  _logout: function () {
    this.props.dispatch(logout())
  },

  render: function () {
    const user = this.props.user
    if (user.status !== 'success') {
      return (
        <div className={c('nav-block', 'nav-block--account', { 'nav-block--active': this.props.isOpen })}>
          <h2 className='nav-block__title'>
            <a onClick={this.props.onLoginToggle} href='#' title='Toggle menu'>
              <span className='text'>Account</span>
              <span className='image'><img alt='User avatar' src='/assets/graphics/layout/avatar-placeholder.svg' width='128' height='128' /></span>
            </a>
          </h2>
          <div className='nav-block__menu-wrapper' id='account-contents' data-hook='nav-block:login'>
            <div className='account-content account-content--presigned'>
              <h6 className='account-content__title'>
                <span className='account-content__title-text'>Sign in</span>
              </h6>
              <form className='form'>
                <div className='form__group'>
                  <label className='form__label' for='input-username'>Username</label>
                  <input type='text' className='form__control form__control--medium' id='input-username' placeholder='Username' ref='username' onKeyDown={this._handleKeypress} />
                </div>
                <div className='form__group'>
                  <label className='form__label' for='input-password'>Password</label>
                  <input type='password' className='form__control form__control--medium' id='input-password' placeholder='Password' ref='password' onKeyDown={this._handleKeypress} />
                </div>
                <div className='form__actions'>
                  <button className='button-account-signin' type='submit' onClick={this._handleSubmitClick}><span>Sign in</span></button>
                </div>
              </form>

              {user.error ? (
                <div className='alert alert--danger account--error' role='alert'>
                  <button className='alert__button-dismiss' title='Dismiss alert'><span>Dismiss</span></button>
                  <p>{user.error}</p>
                </div>
              ) : null}

              <ul className='drop__menu' role='menu'>
                <li><a href='#' title='View more' className='drop__menu-item'>Don&#8217;t have an account or forgot your password?</a></li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={c('nav-block', 'nav-block--account', 'nav-block--signedin', { 'nav-block--active': this.props.isOpen })}>
          <h2 className='nav-block__title'>
            <a onClick={this.props.onLoginToggle} href='#' title='Toggle menu'>
              <span className='text'>Account</span>
              <span className='image'><img alt='User avatar' src='assets/graphics/layout/avatar-placeholder.svg' width='128' height='128' /></span>
            </a>
          </h2>
          <div className='nav-block__menu-wrapper' id='account-contents' data-hook='nav-block:login'>
            <div className='account-content account-content--postsigned'>
              <h6 className='account-content__title'>
                <a href='#' title='View account' className='account-content__title-link'>
                  <span className='account-content__title-text'>Signed in as <em>{user.user}</em></span>
                </a>
              </h6>
              <ul className='drop__menu' role='menu'>
                <li><a href={url.resolve(dataHubURL, `user/edit/${user.user}`)} target='_blank' title='View settings' className='drop__menu-item'>Settings</a></li>
                <li><a href='#' title='Sign out' className='drop__menu-item signout-link' onClick={this._logout}>Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  }
})

function mapStateToProps (state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Login)
