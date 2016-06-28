import fs from 'fs'
import path from 'path'
import test from 'ava'
import sinon from 'sinon'
import fetchLayers from '../app/assets/scripts/fetch-layers'
import { START_FETCHING_LAYERS, ERROR_FETCHING_LAYERS, SET_LAYERS } from '../app/assets/scripts/actions'
import { initial as userInitial } from '../app/assets/scripts/reducers/user'

import xhr from 'xhr'

let fakeXhr
test.before(t => {
  // note: not bothering to restore this after the test, because anyway
  // the "real" one doesn't exist in non-browser situation
  xhr.XMLHttpRequest = fakeXhr = sinon.useFakeXMLHttpRequest()
})

test('fetch layers', t => {
  let dispatch = sinon.spy()
  let getState = sinon.stub().returns({ user: userInitial })
  let requests = []
  fakeXhr.onCreate = requests.push.bind(requests)

  let fetchThunk = fetchLayers()
  fetchThunk(dispatch, getState)

  t.is(requests.length, 1)
  t.is(requests[0].method, 'GET')
  t.truthy(/organization_show/.test(requests[0].url), 'request organization metadata')
  t.truthy(/id=.+/.test(requests[0].url), 'param: include an organization id')
  t.truthy(/include_datasets=True/.test(requests[0].url), 'param: include datasets')

  let organizationShowResponse = fs.readFileSync(path.join(__dirname, 'fixtures/organization_show_response.json'), 'utf-8')
  requests[0].respond(200, {}, organizationShowResponse)

  t.deepEqual(dispatch.args, [
    [{ type: START_FETCHING_LAYERS }]
  ])

  organizationShowResponse = JSON.parse(organizationShowResponse).result
  t.truthy(organizationShowResponse.packages.length >= 2, 'test fixture includes at least two packages')
  t.is(requests.length, 1 + organizationShowResponse.packages.length, 'request packages')

  let packageShowResponse = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/package_show_response.json'), 'utf-8'))

  requests.slice(1).forEach((r, i) => {
    if (i === 0) {
      // for the first response, return a resource w/ none of its own metadata
      r.respond(200, {}, JSON.stringify({
        result: Object.assign({}, packageShowResponse.result, {
          resources: [{id: 'empty-resource', tilejson: 'foo'}]
        })
      }))
    } else {
      r.respond(200, {}, JSON.stringify(packageShowResponse))
    }
  })

  t.is(dispatch.args[1][0].type, SET_LAYERS, 'set layers')
  const layers = dispatch.args[1][0].layers
  t.truthy(layers.length >= 2, 'at least two layers')
  t.truthy(layers[1].name !== layers[1].datasetName, 'fixture includes non-default metadata')
  layers.forEach(layer => {
    t.truthy(layer.id)
    t.truthy(layer.hasOwnProperty('name'))
    t.truthy(layer.datasetName)
    t.truthy(layer.options)
    t.truthy(layer.group)
    t.truthy(layer.tilejson)
    t.truthy(layer.hasOwnProperty('source'))
  })
})

test('fetch layers: error in initial request', t => {
  let dispatch = sinon.spy()
  let getState = sinon.stub().returns({ user: userInitial })
  let requests = []
  fakeXhr.onCreate = requests.push.bind(requests)

  let fetchThunk = fetchLayers()
  fetchThunk(dispatch, getState)

  t.is(requests.length, 1)
  requests[0].respond(400, {}, 'CKAN sent an error')

  t.deepEqual(dispatch.args, [
    [{ type: START_FETCHING_LAYERS }],
    [{ type: ERROR_FETCHING_LAYERS, error: 'CKAN sent an error' }]
  ])
})

test('fetch layers: error in subsequent package request', t => {
  let dispatch = sinon.spy()
  let getState = sinon.stub().returns({ user: userInitial })
  let requests = []
  fakeXhr.onCreate = requests.push.bind(requests)

  let fetchThunk = fetchLayers()
  fetchThunk(dispatch, getState)

  t.is(requests.length, 1)
  let organizationShowResponse = fs.readFileSync(path.join(__dirname, 'fixtures/organization_show_response.json'), 'utf-8')
  requests[0].respond(200, {}, organizationShowResponse)

  requests[1].respond(200, {}, fs.readFileSync(path.join(__dirname, 'fixtures/package_show_response.json'), 'utf-8'))
  requests[2].respond(400, {}, 'CKAN errored on a resource')

  t.deepEqual(dispatch.args, [
    [{ type: START_FETCHING_LAYERS }],
    [{ type: ERROR_FETCHING_LAYERS, error: 'CKAN errored on a resource' }]
  ])
})

test('send auth creds if logged in', t => {
  let dispatch = sinon.spy()
  let getState = sinon.stub().returns({ user: { token: 'the-api-token' } })
  let requests = []
  fakeXhr.onCreate = requests.push.bind(requests)

  let fetchThunk = fetchLayers()
  fetchThunk(dispatch, getState)

  t.is(requests.length, 1)
  t.is(requests[0].method, 'GET')
  let organizationShowResponse = fs.readFileSync(path.join(__dirname, 'fixtures/organization_show_response.json'), 'utf-8')
  requests[0].respond(200, {}, organizationShowResponse)
  t.truthy(requests.length > 1)
  requests.forEach(req => {
    t.deepEqual(req.headers, { Authorization: 'the-api-token' })
  })
})

