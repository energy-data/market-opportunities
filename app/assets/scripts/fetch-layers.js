import url from 'url'
import qs from 'querystring'
import queue from 'queue-async'
import defaultsDeep from 'lodash.defaultsdeep'
import { startFetchingLayers, errorFetchingLayers, setLayers } from './actions'
import { getJSON } from './ajax'
import { APIBaseURL, dataHubOrganization } from './config'
import { pick } from './utils'

const metadataKeys = [
  'name',
  'description',
  'license_id',
  'license_title',
  'license_url',
  'source',
  'url',
  'tilejson',
  'datasetName'
]

export default function fetchLayers () { return fetchLayersThunk }

function fetchLayersThunk (dispatch, getState) {
  dispatch(startFetchingLayers())

  // headers common to all requests we're making
  const requestHeaders = {}
  const token = getState().user.token
  if (token) {
    requestHeaders['Authorization'] = token
  }

  getResources(function (err, resources) {
    if (err) {
      return dispatch(errorFetchingLayers(err.body || err.error || err))
    }

    const indicators = resources.map(function (resource) {
      const indicator = Object.assign(pick(resource, ['id'].concat(metadataKeys)))
      const tags = resource.extras || []

      try {
        indicator.options = JSON.parse(tags.find(kv => kv.key === 'demand-tool-indicator-options').value)
      } catch (e) {
        console.warn('Could not parse options for indicator ' + indicator.name, resource)
        return null
      }

      indicator.group = tags.find(kv => kv.key === 'demand-tool-group').value
      return indicator
    })
    .filter(Boolean)

    dispatch(setLayers(indicators))
  })

  function getOrganizationResources (organizationMetadata, callback) {
    var q = queue()
    organizationMetadata.result.packages.forEach(function (datasetMetadata) {
      const endpoint = 'api/3/action/package_show'
      const params = qs.stringify({ id: datasetMetadata.id })
      q.defer(function (done) {
        getJSON({
          url: url.resolve(APIBaseURL, endpoint) + '?' + params,
          headers: requestHeaders
        }, done)
      })
    })

    q.awaitAll(function (err, datasets) {
      if (err) { return callback(err) }
      // flatten the list of datasource resources lists, and copy dataset-level
      // metadata down to each resource
      const resources = []
      datasets.forEach(function (item) {
        const dataset = item.result
        dataset.resources.forEach(function (resource) {
          resource.extras = (resource.extras || []).concat(dataset.extras)
          resource.source = dataset.url
          resource.datasetName = dataset.name
          // use dataset-wide metadata as defaults
          defaultsDeep(resource, pick(dataset, metadataKeys))
          resources.push(resource)
        })
      })
      callback(null, resources)
    })
  }

  function getResources (callback) {
    const endpoint = 'api/3/action/organization_show'
    const params = qs.stringify({ id: dataHubOrganization, include_datasets: 'True' })
    getJSON({
      url: url.resolve(APIBaseURL, endpoint) + '?' + params,
      headers: requestHeaders
    }, function (err, organizationMetadata) {
      if (err) { return callback(err) }
      getOrganizationResources(organizationMetadata, callback)
    })
  }
}

