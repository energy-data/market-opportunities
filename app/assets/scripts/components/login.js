import React from 'react'
import { connect } from 'react-redux'
import login from '../login'
import { logout } from '../actions'

export const Login = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    dispatch: React.PropTypes.func
  },

  _handleKeypress: function (e) {
    if (e.which === 13) {
      this._login()
    }
  },

  _login: function () {
    this.props.dispatch(login(this.refs.username.value, this.refs.password.value))
  },

  _logout: function () {
    this.props.dispatch(logout())
  },

  render: function () {
    let user = this.props.user
    if (user.status !== 'success') {
      return (
        <div className='login'>
          <input type='text' ref='username' onKeyDown={this._handleKeypress} />
          <input type='password' ref='password' onKeyDown={this._handleKeypress}/>
          {user.error ? <div className='login__error'>{user.error}</div> : ''}
        </div>
      )
    }

    return <div className='login login__current-user'>You are logged in<button className='login__logout' onClick={this._logout}>Logout</button></div>
  }
})

function mapStateToProps (state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Login)
