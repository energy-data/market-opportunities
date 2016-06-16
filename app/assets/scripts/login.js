import { requestLogin, successfulLogin, badLogin } from './actions'
import { postForm } from './ajax'
import { badLoginCredentials, genericLoginError } from './terms'

/**
 * async action creator for login/auth
 */

export default function login (username, password) {
  return (dispatch) => {
    dispatch(requestLogin())
    postForm({
      url: 'http://ec2-23-20-208-183.compute-1.amazonaws.com/authkey',
      body: `username=${username}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }, function (err, result) {
      if (err) {
        if (err.statusCode === 403) {
          err = badLoginCredentials
        } else {
          err = genericLoginError
        }
        return dispatch(badLogin(err))
      }

      dispatch(successfulLogin(result.token))
    })
  }
}
