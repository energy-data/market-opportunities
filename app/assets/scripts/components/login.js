import React from 'react'
import { connect } from 'react-redux'
import login from '../login'

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

  render: function () {
    let user = this.props.user
    if (user.status !== 'success') {
      return (
        <div>
          <input ref='username' type='text' onChange={this._updateUsername} onKeyDown={this._handleKeypress} />
          <input ref='password' type='password' onChange={this._updatePassword} onKeyDown={this._handleKeypress}/>
          {user.error ? <div class='login--error'>{user.error}</div> : ''}
        </div>
      )
    }

    return <div>You are logged in</div>
  }
})

function mapStateToProps (state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Login)
