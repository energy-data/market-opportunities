import xhr from 'xhr'

/**
 * @param {string|object} urlOrOpts Either a url or an options object as accepted by request / xhr.
 * @param {Function} callback Called with (error, body) where body is the parsed JSON result
 * @private
 */
export function postForm (urlOrOpts, callback) {
  let opts = typeof urlOrOpts === 'object' ? urlOrOpts : { url: urlOrOpts }
  xhr.post(opts, function (err, resp, body) {
    if (err) { return callback({error: err}) }

    try {
      body = JSON.parse(body)
      if (body.error) {
        console.warn('API/server error')
        return callback(body)
      }
      if (resp.statusCode < 200 || resp.statusCode >= 400) {
        console.warn('API/server error')
        return callback({
          statusCode: resp.statusCode,
          error: body
        })
      }
    } catch (e) {
      console.warn('Error parsing API response')
      return callback({
        statusCode: resp.statusCode,
        error: 'Error parsing API response',
        body: body
      })
    }

    return callback(null, body)
  })
}
