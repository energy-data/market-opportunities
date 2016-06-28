import url from 'url'
import { postForm } from './ajax'
import fetchLayers from './fetch-layers'
import { requestLogin, successfulLogin, badLogin } from './actions'
import { badLoginCredentials, genericLoginError } from './terms'
import { APIBaseURL } from './config'

/**
 * async action creator for login/auth
 */

export default function login (username, password) {
  return (dispatch) => {
    dispatch(requestLogin())
    postForm({
      url: url.resolve(APIBaseURL, 'authkey'),
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
      dispatch(successfulLogin(result.apikey, result.user))

      // re-fetch layers so we get any private ones after logging in
      dispatch(fetchLayers())
    })
  }
}
